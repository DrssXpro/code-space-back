const { ROLE } = require("../config/errorType");
const { composeReturnInfo } = require("../utils/handleDataResult");

// 检查添加权限
async function checkRoleAdd(ctx, next) {
  const { name, introduce, roleChar, menuList, status } = ctx.request.body;
  if (!name || !introduce || !roleChar || !menuList || ![0, 1].includes(status)) {
    ctx.body = composeReturnInfo(ROLE.ERROR_PARAM);
    return;
  } else if (
    name.length < 1 ||
    name.length > 20 ||
    introduce.length < 4 ||
    introduce.length > 30 ||
    roleChar.length < 2 ||
    roleChar.length > 20
  ) {
    ctx.body = composeReturnInfo(ROLE.ERROR_LENGTH);
    return;
  } else if (!(menuList instanceof Array)) {
    ctx.body = composeReturnInfo(ROLE.ERROR_MENU);
    return;
  }
  await next();
}

// 禁止删除或编辑：超级管理员、普通用户、空间主三个角色
async function checkRoleDeleteOrUpdate(ctx, next) {
  const id = Number(ctx.params.id);
  if ([1, 2, 3].includes(id)) {
    ctx.body = composeReturnInfo(ROLE.CANT_DELETE);
    return;
  }
  await next();
}

module.exports = {
  checkRoleAdd,
  checkRoleDeleteOrUpdate,
};
