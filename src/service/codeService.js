const { Op } = require("sequelize");
const { codeModel, codeSpaceModel, userModel, taskModel, commentModel, collectionModel, spaceModel } = require("../db");
class CodeService {
  // 主页端获取代码列表
  async getCodeList(payload) {
    const { limit, offset, sort, lan } = payload;

    const mapSort = {
      1: [["createdAt", "DESC"]],
      2: [["views", "DESC"]],
      3: [["liked", "DESC"]],
    };
    const lanRules = lan ? (lan == "All" ? {} : { lan }) : {};
    const sortRules = sort ? mapSort[sort] : [];
    return await codeModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: [
            ["name", "authorName"],
            ["avatar", "authorAvatar"],
            ["id", "authorId"],
          ],
        },
      ],
      attributes: [
        "id",
        "liked",
        "title",
        "preview",
        "lan",
        "status",
        "isPwd",
        "line",
        "views",
        "createdAt",
        "updatedAt",
      ],
      limit,
      offset,
      where: {
        status: 1,
        ...lanRules,
      },
      order: sortRules,
    });
  }

  // 主页获取最新分享
  async getNewCodeList() {
    return await codeModel.findAndCountAll({
      attributes: ["id", "liked", "title", "preview", "lan", "status", "line", "views", "createdAt", "updatedAt"],
      limit: 5,
      offset: 0,
      where: {
        status: 1,
      },
      order: [["createdAt", "DESC"]],
    });
  }

  // 获取优秀代码列表
  async getGreatCodeList(spaceId) {
    return await codeSpaceModel.findAndCountAll({
      attributes: ["id", "liked", "title", "preview", "lan", "status", "line", "views", "createdAt", "updatedAt"],
      limit: 5,
      offset: 0,
      where: {
        status: 2,
        spaceId,
      },
      order: [["createdAt", "DESC"]],
    });
  }

  // 获取作者分享的代码列表
  async getAuthorCodeList(userId) {
    return await codeModel.findAndCountAll({
      attributes: ["id", "liked", "title", "preview", "lan", "status", "line", "views", "createdAt", "updatedAt"],
      limit: 3,
      offset: 0,
      where: {
        status: 1,
        authorId: userId,
      },
      order: [["createdAt", "DESC"]],
    });
  }

  // 搜索页面获取代码列表
  async getSearchCodeList({ limit, offset, kw, sort, lan, isPwd }) {
    // 排序
    const mapSort = {
      1: [],
      2: [["createdAt", "DESC"]],
      3: [["views", "DESC"]],
    };
    const sortRules = sort ? mapSort[sort] : [];
    const kwRules = kw ? { title: { [Op.like]: `%${kw}%` } } : {};
    const isPwdRules = isPwd == "true" ? { isPwd: 1 } : {};
    const lanRules = lan ? { lan: { [Op.or]: lan } } : {};
    return await codeModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: [
            ["name", "authorName"],
            ["avatar", "authorAvatar"],
            ["id", "authorId"],
          ],
        },
      ],
      attributes: [
        "id",
        "liked",
        "title",
        "preview",
        "lan",
        "status",
        "isPwd",
        "line",
        "views",
        "createdAt",
        "updatedAt",
      ],
      limit,
      offset,
      where: {
        status: 1,
        ...kwRules,
        ...isPwdRules,
        ...lanRules,
      },
      order: sortRules,
    });
  }

  // 管理员：获取代码列表
  async getCodeListByAdmin(payload) {
    const { limit, offset, kw, lan } = payload;
    const kwRules = kw ? { title: { [Op.like]: `%${kw}%` } } : {};
    const lanRules = lan ? { lan } : {};
    return await codeModel.findAndCountAll({
      include: {
        model: userModel,
        attributes: [
          ["name", "authorName"],
          ["avatar", "authorAvatar"],
          ["id", "authorId"],
        ],
      },
      attributes: [
        "id",
        "title",
        "liked",
        "preview",
        "content",
        "lan",
        "status",
        "isPwd",
        "line",
        "views",
        "createdAt",
        "updatedAt",
      ],
      limit,
      offset,
      raw: true,
      where: { ...kwRules, ...lanRules },
    });
  }

  // 空间获取代码列表
  async getCodeListBySpace(spaceId, payload) {
    const { limit, offset, kw, lan, sort, task, status } = payload;

    const mapSort = {
      1: [],
      2: [["createdAt", "DESC"]],
      3: [["views", "DESC"]],
    };
    const sortRules = sort ? mapSort[sort] : [];
    const kwRules = kw ? { title: { [Op.like]: `%${kw}%` } } : {};
    const lanRules = lan ? { lan: { [Op.or]: lan } } : {};
    const taskRules = task ? { taskId: task } : {};
    const statusRules = status == 2 ? { status } : {};
    return await codeSpaceModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: ["nickName", ["avatar", "authorAvatar"], ["id", "authorId"]],
        },
        {
          model: taskModel,
          attributes: [
            ["id", "taskId"],
            ["name", "taskName"],
          ],
        },
      ],
      attributes: [
        "id",
        "title",
        "preview",
        "content",
        "lan",
        "status",
        "line",
        "views",
        "liked",
        "createdAt",
        "updatedAt",
      ],
      limit,
      offset,
      where: {
        spaceId,
        ...kwRules,
        ...lanRules,
        ...taskRules,
        ...statusRules,
      },
      order: sortRules,
    });
  }

  // 空间主：获取代码列表
  async getCodeListBySpaceMaster(spaceId, payload) {
    const { limit, offset, kw, lan, task } = payload;
    const kwRules = kw ? { title: { [Op.like]: `%${kw}%` } } : {};
    const lanRules = lan ? { lan } : {};
    const taskRules = task ? { taskId: Number(task) } : {};
    return await codeSpaceModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: [
            ["id", "authorId"],
            ["avatar", "authorAvatar"],
            ["name", "authorName"],
          ],
        },
        {
          model: taskModel,
          attributes: [
            ["id", "taskId"],
            ["name", "taskName"],
          ],
        },
      ],
      attributes: ["id", "title", "preview", "content", "lan", "status", "createdAt", "updatedAt"],
      limit,
      offset,
      where: { spaceId, ...kwRules, ...lanRules, ...taskRules },
      raw: true,
    });
  }

  // 获取个人代码信息
  async getCodeListByOwn(userId, payload) {
    const { limit, offset, kw, lan } = payload;
    const searchRules = lan
      ? {
          authorId: userId,
          title: { [Op.like]: `%${kw}%` },
          lan,
        }
      : { authorId: userId, title: { [Op.like]: `%${kw}%` } };
    console.log(searchRules);
    return await codeModel.findAndCountAll({
      attributes: [
        "id",
        "title",
        "liked",
        "preview",
        "content",
        "lan",
        "status",
        "isPwd",
        "views",
        "createdAt",
        "updatedAt",
      ],
      limit,
      offset,
      where: searchRules,
    });
  }

  // 查看指定代码详情
  async getCodeDetail(codeId) {
    return await codeModel.findOne({
      include: {
        model: userModel,
        attributes: [
          ["name", "authorName"],
          ["avatar", "authorAvatar"],
          ["id", "authorId"],
        ],
      },
      attributes: [
        "id",
        "title",
        "liked",
        "content",
        "lan",
        "status",
        "line",
        "isPwd",
        "views",
        "createdAt",
        "updatedAt",
      ],
      where: {
        id: codeId,
      },
    });
  }

  // 查看空间指定代码详情
  async getSpaceCodeDetail(spaceId, codeId) {
    return await codeSpaceModel.findOne({
      include: [
        {
          model: spaceModel,
          attributes: [
            ["name", "spaceName"],
            ["id", "spaceId"],
          ],
        },
        {
          model: userModel,
          attributes: [
            ["name", "authorName"],
            ["avatar", "authorAvatar"],
            ["id", "authorId"],
          ],
        },
      ],
      attributes: ["id", "title", "liked", "content", "lan", "status", "line", "views", "createdAt", "updatedAt"],
      where: {
        id: codeId,
        spaceId,
      },
    });
  }

  // 管理员：更新代码信息
  async updateCodeByAdmin(codeId, data) {
    return await codeModel.update(data, { where: { id: codeId } });
  }

  // 空间主：更新代码信息
  async updateCodeBySpaceMaster(codeId, data) {
    return await codeSpaceModel.update(data, { where: { id: codeId } });
  }

  // 更新代码信息
  async updateCodeOnOwn(codeId, data) {
    return await codeModel.update(data, { where: { id: codeId } });
  }

  // 收藏 / 取消收藏 代码
  async collectCode(userId, codeId) {
    const res = await collectionModel.findOne({ where: { userId, codeId } });
    !res
      ? await collectionModel.create({ userId, codeId })
      : await collectionModel.destroy({ where: { userId, codeId } });
    return !res ? "collect" : "cancel";
  }

  // 获取我的收藏code
  async getMyCOllectCode(userId) {
    return await collectionModel.findAll({
      attributes: ["codeId"],
      where: {
        userId,
      },
    });
  }

  // 获取收藏代码列表
  async getCollectList({ limit, offset, codeIds }) {
    return await codeModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: [
            ["name", "authorName"],
            ["avatar", "authorAvatar"],
            ["id", "authorId"],
          ],
        },
      ],
      attributes: [
        "id",
        "liked",
        "title",
        "preview",
        "lan",
        "line",
        "status",
        "isPwd",
        "views",
        "createdAt",
        "updatedAt",
      ],
      limit,
      offset,
      where: {
        id: codeIds,
      },
    });
  }

  // 广场分享代码
  async addCodeBySquare(data) {
    return await codeModel.create(data);
  }

  // 空间内发布代码
  async addCodeBySpace(data) {
    return await codeSpaceModel.create(data);
  }

  // 广场代码增加浏览量
  async addCodeViewBySquare(codeId) {
    return await codeModel.increment({ views: 1 }, { where: { id: codeId } });
  }
  // 广场代码增加点赞量
  async addCodeLikeBySquare(codeId) {
    return await codeModel.increment({ liked: 1 }, { where: { id: codeId } });
  }

  // 空间代码增加浏览量
  async addCodeViewBySpace(codeId) {
    return await codeSpaceModel.increment({ views: 1 }, { where: { id: codeId } });
  }
  // 空间代码增加点赞量
  async addCodeLikeBySpace(codeId) {
    return await codeSpaceModel.increment({ liked: 1 }, { where: { id: codeId } });
  }

  // 获取指定代码的评论量
  async getCurrentCodeCommentCount(codeId) {
    return await commentModel.count({ where: { codeId } });
  }

  // 获取指定代码的收藏量
  async getCurrentCodeCollectionCount(codeId) {
    return await collectionModel.count({ where: { codeId } });
  }

  // 判断代码是否加密
  async getCodeIsPwd(codeId) {
    return await codeModel.findOne({ attributes: ["pwd", "authorId"], where: { id: codeId } });
  }

  // 获取加密代码的密码
  async getCodePwd(codeId) {
    return await codeModel.findOne({ attributes: ["id", "pwd"], where: { id: codeId } });
  }

  // 获取加密代码的部分信息：解密界面获取
  async getEncryptCode(codeId) {
    return await codeModel.findOne({
      include: {
        model: userModel,
        attributes: [
          ["name", "authorName"],
          ["avatar", "authorAvatar"],
          ["id", "authorId"],
        ],
      },
      attributes: ["id", "title", "isPwd", "createdAt", "updatedAt"],
      where: {
        id: codeId,
      },
    });
  }

  // 删除code
  async deleteCodeInSquare(codeId) {
    return await codeModel.destroy({ where: { id: codeId } });
  }

  // 删除空间代码
  async deleteCodeInSpace(codeId) {
    return await codeSpaceModel.destroy({ where: { id: codeId } });
  }
}

module.exports = new CodeService();
