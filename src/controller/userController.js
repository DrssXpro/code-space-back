const jwt = require("jsonwebtoken");
const fs = require("fs");
const uuid = require("uuid");
const { LOGIN_KEY, ORIGIN } = require("../config/config");
const { USER } = require("../config/errorType");
const { spaceModel } = require("../db");
const userSerivce = require("../service/userSerivce");
const { composeReturnInfo, handleAdminUserListResult } = require("../utils/handleDataResult");
const { encryptedPassword } = require("../utils/passwordMd5");
const uploadToQiNiu = require("../utils/qiniuUpload");
const deleteQiNiuFile = require("../utils/qiniuDelete");

class UserController {
  async userLogin(ctx, next) {
    const token = jwt.sign(ctx.userInfo, LOGIN_KEY, { expiresIn: "24h" });
    ctx.body = composeReturnInfo(USER.SUCCESS_LOGIN, {
      ...ctx.userInfo,
      token,
    });
  }

  async userRegister(ctx, next) {
    const { username, nickName, email, password } = ctx.request.body;
    const res = await userSerivce.userRegister({
      name: username,
      email,
      password: encryptedPassword(password),
      roleId: 3,
      nickName,
    });
    ctx.body = composeReturnInfo(USER.SUCCESS_REGISTER);
  }

  async getUserInfo(ctx, next) {
    const id = ctx.params.id;
    const res = await userSerivce.getUserInfo(id);
    if (!res) {
      ctx.body = composeReturnInfo(USER.INFO_NOTFOND);
      return;
    }
    if (res.spaceId) {
      const spaceDetail = await spaceModel.findOne({ where: { id: res.spaceId } });
      const info = JSON.parse(JSON.stringify(res));
      info.space = {
        spaceId: res.spaceId,
        spaceName: spaceDetail.name,
      };
      delete info.spaceId;
      // 刷新获取用户信息：将token也进行刷新
      const token = jwt.sign(info, LOGIN_KEY, { expiresIn: "24h" });
      ctx.body = composeReturnInfo(USER.SUCCESS_GET, { userInfo: info, token });
    } else {
      const token = jwt.sign(JSON.parse(JSON.stringify(res)), LOGIN_KEY, { expiresIn: "24h" });
      ctx.body = composeReturnInfo(USER.SUCCESS_GET, { userInfo: res, token });
    }
  }

  async addUserByAdmin(ctx, next) {
    const { name, password, email, status } = ctx.request.body;
    const res = await userSerivce.addUserByAdmin({
      name,
      password: encryptedPassword(password),
      email,
      status,
      roleId: 3,
    });
    ctx.body = composeReturnInfo(USER.SUCCESS_CREATE);
  }

  async getUserListByAdmin(ctx, next) {
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let { limit, offset, kw, email } = ctx.request.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    if ((kw && kw.length > 20) || (email && !reg.test(email))) {
      ctx.body = composeReturnInfo(SPACE.ERROR_PARAM);
      return;
    }
    const res = await userSerivce.getUserListByAdmin({ limit, offset, kw, email });
    const result = await handleAdminUserListResult(JSON.parse(JSON.stringify(res.rows)));
    ctx.body = composeReturnInfo(USER.SUCCESS_GET, { count: res.count, rows: result });
  }

  async updateUserByAdmin(ctx, next) {
    let { name, email, roleId, isDefault, status, avatar } = ctx.request.body;
    const id = ctx.params.id;
    avatar = isDefault ? "https://pic.fasyncsy.com.cn/avatar/default.jpg" : avatar;
    await userSerivce.updateUserByAdmin(id, { name, email, roleId, status, avatar });
    ctx.body = composeReturnInfo(USER.SUCCESS_UPDATE);
  }

  async updateUserByMe(ctx, next) {
    let { name, email, nickName, avatar, isDefault } = ctx.request.body;
    const id = ctx.params.id;
    avatar = isDefault ? "https://pic.fasyncsy.com.cn/avatar/default.jpg" : avatar;
    const res = await userSerivce.updateUserByMe(id, { name, email, nickName, avatar });
    ctx.body = composeReturnInfo(USER.SUCCESS_UPDATE);
  }

  async deleteUserByAdmin(ctx, next) {
    const id = ctx.params.id;
    if (!id) {
      ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    } else {
      const res = await userSerivce.deleteUserByAdmin(id);
      ctx.body = composeReturnInfo(USER.SUCCESS_DELETE);
    }
  }

  async userAvatarUpload(ctx, next) {
    // 拿到前端传入的图片文件
    const file = ctx.req.file;

    if (file) {
      if (file.size / 1024 / 1024 > 2) {
        ctx.body = composeReturnInfo(USER.ERROR_SIZE);
        return;
      }
      let fileId = uuid.v4().replace(/\-/g, ""); // UUID生成文件唯一名称
      const res = await uploadToQiNiu(file.destination + "/" + file.filename, file.fieldname + "/" + fileId);
      let path = __dirname.replace("src\\controller", "publicPic");
      // 将文件上传至服务器的文件删除
      fs.readdirSync(path).forEach((f) => {
        if (f === file.filename) {
          fs.unlink(path + "\\" + f, (err) => {
            if (err) throw err;
          });
        }
      });
      if (res) {
        fileId = ORIGIN + "avatar/" + fileId;
        ctx.body = composeReturnInfo(USER.SUCCESS_UPLOAD, fileId);
      }
    } else {
      ctx.body = composeReturnInfo(USER.ERROR_UPLOAD);
    }
  }

  async getSpaceUserList(ctx, next) {}
}

module.exports = new UserController();
