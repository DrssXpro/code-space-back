const { SPACE } = require("../config/errorType");
const { userModel, roleModel } = require("../db");
const { composeReturnInfo } = require("../utils/handleDataResult");

// 创建空间时校验参数
async function checkAddSpace(ctx, next) {
  const userId = ctx.params.id;
  const { spacename, spaceintroduce, inviteCode } = ctx.request.body;
  if (!userId) {
    ctx.body = composeReturnInfo(SPACE.ERROR_PARAM);
    return;
  }

  if (!spacename || !spaceintroduce || !inviteCode) {
    ctx.body = composeReturnInfo(SPACE.ERROR_PARAM);
    return;
  }
  const userInfo = await userModel.findOne({ where: { id: userId } });
  // 判断用户是否存在
  if (!userInfo) {
    ctx.body = composeReturnInfo(SPACE.USER_NOTFOUND);
    return;
  }

  // 判断用户是否已有空间
  if (ctx.userInfo.space) {
    ctx.body = composeReturnInfo(SPACE.SPACE_EXIST);
    return;
  }
  // 判断用户是否是空间主这个角色
  if (userInfo.roleId !== 2) {
    ctx.body = composeReturnInfo(SPACE.ROLE_NOTALLOW);
    return;
  }
  await next();
}

// 判断用户是否有进入空间的权限
async function checkUserInSpace(ctx, next) {
  const userInfo = ctx.userInfo;
  if (!userInfo.space) {
    ctx.body = composeReturnInfo(SPACE.NO_SPACE);
    return;
  }
  const spaceId = ctx.params.id;
  const user = await userModel.findOne({ where: { id: userInfo.id, spaceId } });
  if (!user) {
    ctx.body = composeReturnInfo(SPACE.NO_SPACE);
    return;
  }
  ctx.body = composeReturnInfo(SPACE.SUCCESS_IN);
}

// 检测用户是否可以修改空间信息
async function checkSpaceUpdate(ctx, next) {
  const userInfo = ctx.userInfo; // 拿到ctx个人信息
  const spaceId = ctx.params.id; // 传来的空间信息
  const { spacename, spaceintroduce, inviteCode } = ctx.request.body;
  if (userInfo.role.roleId != 2 || !userInfo.space || userInfo.space.spaceId != spaceId) {
    console.log(spaceId, userInfo.space);
    ctx.body = composeReturnInfo(SPACE.ROLE_NOTALLOW);
    return;
  }

  if (!spacename || !spaceintroduce || !inviteCode) {
    ctx.body = composeReturnInfo(SPACE.ERROR_PARAM);
    return;
  }
  await next();
}

// 获取空间详情校验
async function checkGetSpaceDetail(ctx, next) {
  const spaceId = ctx.params.id;

  if (!spaceId) {
    ctx.body = composeReturnInfo(SPACE.ERROR_PARAM);
    return;
  }

  if (!ctx.userInfo.space) {
    ctx.body = composeReturnInfo(SPACE.ROLE_NOTALLOW);
    return;
  }
  if (spaceId != ctx.userInfo.space.spaceId) {
    ctx.body = composeReturnInfo(SPACE.ROLE_NOTALLOW);
    return;
  }

  await next();
}

// 踢出用户校验
async function checkKickUser(ctx, next) {
  const userId = ctx.userInfo.id;
  const kickId = ctx.params.id;
  // 判断登录的用户是否是空间主
  if (!ctx.userInfo.space || ctx.userInfo.role.roleId !== 2) {
    ctx.body = composeReturnInfo(SPACE.ROLE_NOTALLOW);
    return;
  }
  // 判断踢出人员
  if (kickId == ctx.userInfo.id) {
    ctx.body = composeReturnInfo(SPACE.ERROR_KICK);
    return;
  }
  // 空间主查询数据库比对
  const spaceMaster = await userModel.findOne({ where: { id: userId } });
  if (spaceMaster.spaceId != ctx.userInfo.space.spaceId) {
    ctx.body = composeReturnInfo(SPACE.ROLE_NOTALLOW);
    return;
  }

  await next();
}

// 检查邀请用户参数
async function checkInviteUser(ctx, next) {
  const { name } = ctx.request.body;
  if (!name) {
    ctx.body = composeReturnInfo(SPACE.ERROR_PARAM);
    return;
  }
  if (name.length < 3 || name.length > 20) {
    ctx.body = composeReturnInfo(SPACE.NAME_LENGTH);
    return;
  }
  const user = await userModel.findOne({ where: { name } });
  if (!user) {
    ctx.body = composeReturnInfo(SPACE.USER_NOTFOUND);
    return;
  }

  if (user.spaceId) {
    ctx.body = composeReturnInfo(SPACE.SPACE_EXIST);
    return;
  }

  await next();
}

// 检查空间主编辑用户
async function checkEditSpaceUser(ctx, next) {
  const userId = ctx.params.id;
  const { nickName, roleId } = ctx.request.body;
  if (userId == "undefined" || !nickName || !roleId) {
    ctx.body = composeReturnInfo(SPACE.ERROR_PARAM);
    return;
  }
  if (nickName.length < 2 || nickName > 20) {
    ctx.body = composeReturnInfo(SPACE.NAME_LENGTH);
    return;
  }

  // 如果设置的不是普通角色，则需要查询一下角色表验证
  if (roleId !== 3) {
    const spaceId = ctx.userInfo.space.spaceId;
    const role = await roleModel.findOne({ where: { spaceId, id: roleId } });
    if (!role) {
      ctx.body = composeReturnInfo(SPACE.ERROR_ROLE);
      return;
    }
  }
  await next();
}

module.exports = {
  checkAddSpace,
  checkSpaceUpdate,
  checkGetSpaceDetail,
  checkKickUser,
  checkInviteUser,
  checkEditSpaceUser,
  checkUserInSpace,
};
