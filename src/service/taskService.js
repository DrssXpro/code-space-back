const { Op } = require("sequelize");
const { taskModel } = require("../db");

class TaskService {
  // 创建任务
  async addTask(data) {
    return await taskModel.create(data);
  }

  // 获取任务列表
  async getTaskList({ limit, offset, spaceId, kw }) {
    const kwRules = kw ? { name: { [Op.like]: `%${kw}%` } } : {};
    return await taskModel.findAndCountAll({
      limit,
      offset,
      where: {
        spaceId,
        ...kwRules,
      },
    });
  }

  // 获取最新任务
  async getNewTask(spaceId) {
    return await taskModel.findAll({
      where: {
        spaceId,
      },
      limit: 1,
      order: [["createdAt", "DESC"]],
    });
  }

  // 更新任务
  async updateTaskList(id, data) {
    return await taskModel.update(data, {
      where: { id },
    });
  }

  // 删除任务
  async deleteTask(id) {
    return await taskModel.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = new TaskService();
