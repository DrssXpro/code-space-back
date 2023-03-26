const { MENU } = require("../config/errorType");
const { composeReturnInfo } = require("../utils/handleDataResult");

// 策略模式校验表单传递参数
const menuStrategy = {
  M: handleCheckDirectory,
  D: handleCheckMenu,
  B: handleCheckBtn,
};

async function handleCheckMenuPass(ctx, next) {
  const { menuType } = ctx.request.body;
  console.log(ctx.request.body);
  if (!menuType || (menuType !== "D" && menuType !== "B" && menuType !== "M")) {
    ctx.body = composeReturnInfo(MENU.ERROR_PARAM);
    return;
  }
  menuStrategy[menuType](ctx) && (await next());
}

// check菜单参数
function handleCheckMenu(ctx) {
  const { name, parentId, menuIcon, orderNum, routePath, comPath, perms, status, menuType } = ctx.request.body;
  if (
    !name ||
    !menuIcon ||
    !parentId ||
    !orderNum ||
    !routePath ||
    !comPath ||
    !perms ||
    (status !== 0 && status !== 1)
  ) {
    ctx.body = composeReturnInfo(MENU.ERROR_PARAM);
    return false;
  }
  // 需改写body参数，只传入需要修改的字段
  ctx.request.body = { name, parentId, menuIcon, orderNum, routePath, comPath, perms, status, menuType };
  return true;
}

// check目录参数
function handleCheckDirectory(ctx) {
  const { name, menuIcon, orderNum, status, menuType } = ctx.request.body;
  if (!name || !menuIcon || !orderNum || (status !== 0 && status !== 1)) {
    ctx.body = composeReturnInfo(MENU.ERROR_PARAM);
    return false;
  }
  // 需改写body参数，只传入需要修改的字段
  ctx.request.body = { name, menuIcon, orderNum, status, menuType };
  return true;
}

// check按钮权限参数
function handleCheckBtn(ctx) {
  const { name, parentId, orderNum, perms, status, menuType } = ctx.request.body;
  if (!name || !parentId || !orderNum || !perms || (status !== 0 && status !== 1)) {
    ctx.body = composeReturnInfo(MENU.ERROR_PARAM);
    return false;
  }
  // 需改写body参数，只传入需要修改的字段
  ctx.request.body = { name, parentId, orderNum, perms, status, menuType };
  return true;
}

module.exports = {
  handleCheckMenuPass,
};
