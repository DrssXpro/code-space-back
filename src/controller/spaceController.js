const { SPACE } = require("../config/errorType");
const fs = require("fs");
const uuid = require("uuid");
const uploadToQiNiu = require("../utils/qiniuUpload");
const { ORIGIN } = require("../config/config");
const spaceService = require("../service/spaceSerivce");
const userSerivce = require("../service/userSerivce");
const { composeReturnInfo, handleSpaceListResult } = require("../utils/handleDataResult");
class SpaceController {
  async addSpaceInfo(ctx, next) {
    let { spacename, spaceintroduce, inviteCode, avatar, isDefault } = ctx.request.body;
    const id = ctx.params.id;
    avatar = isDefault ? "https://pic.fasyncsy.com.cn/avatar/defaultSpace.jpg" : avatar;
    const res = await spaceService.addSpaceInfo({
      name: spacename,
      introduce: spaceintroduce,
      authorId: id,
      inviteCode,
      avatar,
    });

    const spaceId = res.id;
    await userSerivce.updateUserSpace(id, spaceId);
    ctx.body = composeReturnInfo(SPACE.SUCCESS_CREATE, res);
  }

  async updateSpaceInfo(ctx, next) {
    let { spacename, spaceintroduce, inviteCode, avatar, isDefault } = ctx.request.body;
    avatar = isDefault ? "http://pic.fasyncsy.com.cn/avatar/defaultSpace.jpg" : avatar;
    const spaceId = ctx.params.id;
    const res = await spaceService.updateSpaceInfo(spaceId, {
      name: spacename,
      introduce: spaceintroduce,
      inviteCode,
      avatar,
    });
    ctx.body = composeReturnInfo(SPACE.SUCCESS_UPDATE);
  }

  async deleteSpace(ctx, next) {
    const spaceId = ctx.params.id;
    const res = await spaceService.deleteSpace(spaceId);
    ctx.body = composeReturnInfo(SPACE.SUCCESS_DELETE);
  }

  async getSpaceList(ctx, next) {
    let { limit, offset, kw } = ctx.request.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    if (kw && kw.lenth > 20) {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    const res = await spaceService.getSpaceList({ limit, offset, kw });
    const result = await handleSpaceListResult(JSON.parse(JSON.stringify(res.rows)));
    ctx.body = composeReturnInfo(SPACE.SUCCESS_GET, { count: res.count, rows: result });
  }

  async getSpaceUserList(ctx, next) {
    let { limit, offset, nameKw, nickKw } = ctx.request.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    if ((nameKw && nameKw.length > 20) || (nickKw && nickKw.length > 20)) {
      ctx.body = composeReturnInfo(SPACE.ERROR_PARAM);
      return;
    }

    const spaceId = ctx.userInfo.space.spaceId;
    const res = await spaceService.getSpaceUserList({ limit, offset, spaceId, nameKw, nickKw });
    ctx.body = composeReturnInfo(SPACE.SUCCESS_GET, res);
  }

  async getSpaceDetail(ctx, next) {
    const spaceId = ctx.params.id;
    const res = await spaceService.getSpaceDetail(spaceId);
    ctx.body = composeReturnInfo(SPACE.SUCCESS_GET, res);
  }

  async exitSpaceByOwn(ctx, next) {
    const userInfo = ctx.userInfo;
    if (!userInfo.space) {
      ctx.body = composeReturnInfo(SPACE.ROLE_NOTALLOW);
      return;
    }
    const userId = userInfo.id;
    const spaceId = userInfo.space.spaceId;
    const roleId = userInfo.role.roleId;
    await spaceService.exitSpaceByOwn({ userId, spaceId, roleId });
    ctx.body = composeReturnInfo(SPACE.SUCCESS_EXIT);
  }

  async kickSpaceUser(ctx, next) {
    const kickId = ctx.params.id;
    const spaceId = ctx.userInfo.space.spaceId;
    await spaceService.kickSpaceUser({ kickId, spaceId });
    ctx.body = composeReturnInfo(SPACE.SUCCESS_KICK);
  }

  async editSpaceUser(ctx, next) {
    const { nickName, roleId } = ctx.request.body;
    const userId = ctx.params.id;
    await spaceService.editSpaceUser({ nickName, roleId, userId });
    ctx.body = composeReturnInfo(SPACE.SUCCESS_UPDATE);
  }

  async invitePeopleBySpace(ctx, next) {
    const spaceId = ctx.userInfo.space.spaceId;
    const { name } = ctx.request.body;
    await spaceService.invitePeopleBySpace({ spaceId, name });
    ctx.body = composeReturnInfo(SPACE.SUCCESS_INVITE);
  }

  async judgeSpaceInviteCode(ctx, next) {
    const { inviteCode } = ctx.request.body;
    const spaceId = ctx.params.id;
    const res = await spaceService.getSpaceInviteCode(spaceId);
    const userId = ctx.userInfo.id;
    const spaceInfo = ctx.userInfo.space;
    if (spaceInfo && spaceInfo.spaceId == spaceId) {
      ctx.body = composeReturnInfo(SPACE.SPACE_ALREADY_EXIST);
      return;
    }
    if (!res) {
      ctx.body = composeReturnInfo(SPACE.SPACE_NOT_FOUND);
      return;
    }
    if (inviteCode == res.inviteCode) {
      await userSerivce.updateUserSpace(userId, spaceId);
      ctx.body = composeReturnInfo(SPACE.SUCCESS_JOIN);
    } else {
      ctx.body = composeReturnInfo(SPACE.INVITE_ERROR);
    }
  }

  async uploadSpaceAvatar(ctx, next) {
    // 拿到前端传入的图片文件
    const file = ctx.req.file;
    console.log(file);
    if (file) {
      if (file.size / 1024 / 1024 > 2) {
        ctx.body = composeReturnInfo(SPACE.ERROR_SIZE);
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
        console.log("check:success", res);
        fileId = ORIGIN + "space/" + fileId;
        ctx.body = composeReturnInfo(SPACE.SUCCESS_UPLOAD, fileId);
      }
    } else {
      ctx.body = composeReturnInfo(SPACE.ERROR_UPLOAD);
    }
  }
}

module.exports = new SpaceController();
