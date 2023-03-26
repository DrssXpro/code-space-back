const { USER } = require("../config/errorType");
const { Op } = require("sequelize");
const { userModel, spaceModel } = require("../db");
const userSerivce = require("../service/userSerivce");
const { composeReturnInfo } = require("../utils/handleDataResult");
const { encryptedPassword } = require("../utils/passwordMd5");

// 检验管理员端添加用户参数
async function checkAddUser(ctx, next) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  const { name, password, email, roleId, status } = ctx.request.body;
  if (!name || !password || !email || !roleId || ![0, 1].includes(status)) {
    ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    return;
  }
  if (!reg.test(email)) {
    ctx.body = composeReturnInfo(USER.EMAIL_ERROR);
    return;
  }
  // 查看用户名和邮箱是否重复
  const user = await userModel.findOne({
    where: {
      [Op.or]: [{ name }, { email }],
    },
  });

  if (user) {
    ctx.body = composeReturnInfo(USER.INFO_REPEAT);
    return;
  }
  await next();
}

// 检验管理员端修改用户参数
async function checkUpdateUserByAdmin(ctx, next) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  const { name, email, roleId, isDefault } = ctx.request.body;
  const id = ctx.params.id;
  if (!id || !name || !email || !roleId || typeof isDefault !== "boolean") {
    ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    return;
  }
  if (!reg.test(email)) {
    ctx.body = composeReturnInfo(USER.EMAIL_ERROR);
    return;
  }
  // 查看用户名和邮箱是否重复
  const user = await userModel.findOne({
    where: {
      [Op.or]: [{ name }, { email }],
      id: {
        [Op.not]: id,
      },
    },
  });

  if (user) {
    ctx.body = composeReturnInfo(USER.INFO_REPEAT);
    return;
  }

  await next();
}

// 检查用户更新自己的信息
async function checkUpdateUserByMe(ctx, next) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  const { name, email, nickName, isDefault, avatar } = ctx.request.body;
  const id = ctx.params.id;
  if (!id || !name || !email || typeof isDefault !== "boolean" || !avatar) {
    ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    return;
  }

  if (ctx.userInfo.id != id) {
    ctx.body = composeReturnInfo(USER.UPADTE_AUTH);
    return;
  }
  if (name.length < 3 || name.length > 20) {
    ctx.body = composeReturnInfo(USER.NAME_LENGTH);
    return;
  }

  if (nickName && (nickName.length < 3 || nickName.length > 20)) {
    ctx.body = composeReturnInfo(USER.NAME_LENGTH);
    return;
  }
  if (!reg.test(email)) {
    ctx.body = composeReturnInfo(USER.EMAIL_ERROR);
    return;
  }

  // 查看用户名和邮箱是否重复
  const user = await userModel.findOne({
    where: {
      [Op.or]: [{ name }, { email }],
      id: {
        [Op.not]: id,
      },
    },
  });

  if (user) {
    ctx.body = composeReturnInfo(USER.INFO_REPEAT);
    return;
  }

  ctx.request.body.isDefault = Boolean(ctx.request.body.isDefault) ? 1 : 0; // 传递过来为 false true字符串，需手动修改
  await next();
}

// 检验用户登录参数验证
async function checkUserLogin(ctx, next) {
  const { username, password } = ctx.request.body;
  // 参数校验
  if (!username || !password) {
    ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    return;
  }
  // 账号校验
  if (username.length < 4 || username.length > 15) {
    ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    return;
  }
  // 密码校验
  if (password.length < 6 || password.length > 15) {
    ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    return;
  }
  const user = await userSerivce.findUser({ name: username });
  // 用户是否存在
  if (!user) {
    ctx.body = composeReturnInfo(USER.USER_NOTFOUND);
    return;
  }
  // 用户密码是否错误
  if (user.password !== encryptedPassword(password)) {
    ctx.body = composeReturnInfo(USER.ERROR_PASSWORD);
    return;
  }
  let space = undefined;

  // 用户如果已有空间
  if (user.spaceId) {
    const spaceDetail = await spaceModel.findOne({ where: { id: user.spaceId } });
    space = {
      spaceName: spaceDetail.name,
      spaceId: user.spaceId,
    };
  }
  ctx.userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    nickName: user.nickName,
    role: {
      roleId: user.role.dataValues.roleId,
      roleName: user.role.dataValues.roleName,
      roleChar: user.role.dataValues.roleChar,
    },
    space,
  };
  await next();
}

// 用户注册参数校验
async function checkUserRegister(ctx, next) {
  const { username, email, password } = ctx.request.body;
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!username || !email || !password) {
    ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    return;
  }
  if (username.length < 6 || username.length > 15) {
    ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    return;
  }
  if (password.length < 6 || password.length > 15) {
    ctx.body = composeReturnInfo(USER.ERROR_PARAM);
    return;
  }
  if (!reg.test(email)) {
    ctx.body = composeReturnInfo(USER.EMAIL_ERROR);
    return;
  }
  // 用户名是否重复
  const user1 = await userModel.findOne({ where: { name: username } });
  if (user1) {
    ctx.body = composeReturnInfo(USER.NAME_REPEAT);
    return;
  }
  // 用户邮箱是否重复
  const user2 = await userModel.findOne({ where: { email } });
  if (user2) {
    ctx.body = composeReturnInfo(USER.EMAIL_REPEAT);
    return;
  }
  ctx.request.body.nickName = username;
  await next();
}

module.exports = {
  checkAddUser,
  checkUpdateUserByAdmin,
  checkUpdateUserByMe,
  checkUserLogin,
  checkUserRegister,
};
