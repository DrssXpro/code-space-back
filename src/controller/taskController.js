const { TASK } = require("../config/errorType");
const taskService = require("../service/taskService");
const { handleTaskListResult, composeReturnInfo } = require("../utils/handleDataResult");

class TaskController {
  async addTask(ctx, next) {
    const { name, introduce, extime } = ctx.request.body;
    const spaceId = ctx.userInfo.space.spaceId;
    const res = await taskService.addTask({ name, introduce, extime, spaceId });
    ctx.body = composeReturnInfo(TASK.SUCCESS_CREATE);
  }

  async getTaskList(ctx, next) {
    let { limit, offset, spaceId, kw } = ctx.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    if (kw && kw.length > 20) {
      ctx.body = composeReturnInfo(TASK.ERROR_PARAM);
      return;
    }
    console.log(ctx.query);
    const res = await taskService.getTaskList({ limit, offset, spaceId, kw });
    console.log(res);
    const result = await handleTaskListResult(JSON.parse(JSON.stringify(res.rows)));
    ctx.body = composeReturnInfo(TASK.SUCCESS_GET, { count: res.count, rows: result });
  }

  async getNewTask(ctx, next) {
    const spaceId = ctx.userInfo.space.spaceId;
    const res = await taskService.getNewTask(spaceId);
    ctx.body = composeReturnInfo(TASK.SUCCESS_GET, res);
  }

  async deleteTask(ctx, next) {
    const id = ctx.params.id;
    await taskService.deleteTask(id);
    ctx.body = composeReturnInfo(TASK.SUCCESS_DELETE);
  }

  async updateTask(ctx, next) {
    const id = ctx.params.id;
    const { name, introduce, extime } = ctx.request.body;
    await taskService.updateTaskList(id, { name, introduce, extime });
    ctx.body = composeReturnInfo(TASK.SUCCESS_UPDATE);
  }
}

module.exports = new TaskController();
