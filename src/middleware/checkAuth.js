const { USER } = require("../config/errorType");
const jwt = require("jsonwebtoken");
const { composeReturnInfo, handleRoleMenuResult } = require("../utils/handleDataResult");
const { LOGIN_KEY } = require("../config/config");
const roleService = require("../service/roleService");

// 检测用户是否携带token，保存个人信息至ctx
async function checkAuth(ctx, next) {
  let token = ctx.request.headers.authorization;
  if (!token) {
    ctx.body = composeReturnInfo(USER.NO_TOKEN);
    return;
  }
  token = token.split(" ")[1];

  if (token == "undefined") {
    ctx.body = composeReturnInfo(USER.NO_TOKEN);
    return;
  }
  try {
    const userInfo = jwt.verify(token, LOGIN_KEY);
    if (!userInfo) {
      ctx.body = composeReturnInfo(USER.VERIFY_TOKEN);
      return;
    }
    ctx.userInfo = userInfo; // 保存个人信息至ctx
    await next();
  } catch (error) {
    console.log("check:", error);
    ctx.body = composeReturnInfo(USER.VERIFY_TOKEN);
    return;
  }
}

// 判断是否携带token，如果携带解析出用户信息保存至ctx
async function addInfoByAuth(ctx, next) {
  let token = ctx.request.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    if (token !== "undefined") {
      try {
        const userInfo = jwt.verify(token, LOGIN_KEY);
        ctx.userInfo = userInfo; // 保存至ctx
      } catch (error) {
        console.log("check:", error);
      }
    }
  }
  await next();
}

// 检查用户角色是否具有该功能权限
async function checkUserRolePower(ctx, next) {
  const roleId = ctx.userInfo.role.roleId;
  const perm = ctx.query.perm;
  // 不传入标识直接取消操作
  if (!perm) {
    ctx.body = composeReturnInfo(USER.ERROR_ROLE);
    return;
  }
  const res = handleRoleMenuResult(await roleService.findAdminRoleMenu(Number(roleId)));
  // 拿到所有功能权限列表
  const btnRole = res.filter((item) => item.menuType === "B").map((item) => item.perms);

  // 判断登录角色是否有该权限
  if (!btnRole.includes(perm)) {
    ctx.body = composeReturnInfo(USER.ERROR_ROLE);
    return;
  }
  console.log("pass");
  await next();
}

// 判断用户是否加入空间
async function checkUserInSpace(ctx, next) {
  const userInfo = ctx.userInfo;
  if (userInfo.space) {
    await next();
  } else {
    ctx.body = composeReturnInfo(USER.VERIFY_SPACE);
    return;
  }
}

// 判断用户是否能够分享代码权限：主要区分管理员和其他用户
async function checkUserShareCode(ctx, next) {
  const roleId = ctx.userInfo.role.roleId;
  const res = handleRoleMenuResult(await roleService.findAdminRoleMenu(Number(roleId)));

  // 判断用户是否有分享权限
  const isShare = res.filter((item) => item.id == 1).length;
  if (!isShare) {
    ctx.body = composeReturnInfo(USER.ERROR_ROLE);
    return;
  }
  await next();
}

// 判断用户是否为admin
async function judgeIsAdmin(ctx, next) {
  const userInfo = ctx.userInfo;
  const roleId = userInfo.role.roleId;
  // 管理员可能分配的权限
  const blackList = [3, 4, 6, 7, 8, 9, 10, 11];
  const res = handleRoleMenuResult(await roleService.findAdminRoleMenu(Number(roleId)));
  for (let i = 0; i < res.length; i++) {
    if (blackList.includes(res[i].id)) {
      console.log("check:", res[i]);
      ctx.body = composeReturnInfo(USER.IS_ADMIN);
      return;
    }
  }
  await next();
}

module.exports = {
  checkAuth,
  addInfoByAuth,
  checkUserRolePower,
  checkUserInSpace,
  checkUserShareCode,
  judgeIsAdmin,
};
