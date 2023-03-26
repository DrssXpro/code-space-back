const { TASK } = require("../config/errorType");
const { composeReturnInfo } = require("../utils/handleDataResult");

// 创建任务时检测参数
async function checkAddTask(ctx, next) {
  const { name, introduce } = ctx.request.body;
  const userInfo = ctx.userInfo;
  if (!name || !introduce || (name.length < 4 && name.length > 20) || (introduce.length < 6 && introduce.length > 80)) {
    ctx.body = composeReturnInfo(TASK.ERROR_PARAM);
    return;
  }
  if (!userInfo.space) {
    ctx.body = composeReturnInfo(TASK.ERROR_SPACE);
    return;
  }

  await next();
}

// 检查是否能删除
async function checkDeleteTask(ctx, next) {
  const userInfo = ctx.userInfo;
  const taskId = ctx.params.id;
  if (!taskId) {
    ctx.body = composeReturnInfo(TASK.ERROR_PARAM);
    returnl;
  }
  if (!userInfo.space) {
    ctx.body = composeReturnInfo(TASK.ERROR_SPACE);
    return;
  }

  await next();
}

// 检查更新任务参数
async function checkUpdateTask(ctx, next) {
  const { name, introduce } = ctx.request.body;
  const taskId = ctx.params.id;
  if (
    !taskId ||
    !name ||
    !introduce ||
    (name.length < 4 && name.length > 20) ||
    (introduce.length < 6 && introduce.length > 80)
  ) {
    ctx.body = composeReturnInfo(TASK.ERROR_PARAM);
    return;
  }
  await next();
}

module.exports = {
  checkAddTask,
  checkDeleteTask,
  checkUpdateTask,
};
