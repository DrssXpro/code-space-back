const { Op } = require("sequelize");
const { spaceModel, taskModel, userModel, codeSpaceModel, roleModel } = require("../db");

class SpaceService {
  // 增加空间
  async addSpaceInfo(data) {
    return await spaceModel.create(data);
  }

  // 更新空间信息
  async updateSpaceInfo(spaceId, data) {
    return await spaceModel.update(data, { where: { id: spaceId } });
  }

  // 获取空间列表
  async getSpaceList(payload) {
    const { limit, offset, kw } = payload;
    const searchRules = kw ? { name: { [Op.like]: `%${kw}%` } } : {};
    return await spaceModel.findAndCountAll({
      include: {
        model: userModel,
        attributes: [
          ["id", "authorId"],
          ["name", "authorName"],
          ["avatar", "authorAvatar"],
        ],
      },
      attributes: ["id", "name", "introduce", "avatar", "createdAt", "updatedAt"],
      limit,
      offset,
      raw: true,
      where: searchRules,
    });
  }

  // 获取空间用户列表
  async getSpaceUserList(payload) {
    const { limit, offset, spaceId, nameKw, nickKw } = payload;
    const searchName = nameKw ? { name: { [Op.like]: `%${nameKw}%` } } : {};
    const searchNick = nickKw ? { nickName: { [Op.like]: `%${nickKw}%` } } : {};
    return await userModel.findAndCountAll({
      include: {
        model: roleModel,
        attributes: [
          ["name", "roleName"],
          ["id", "roleId"],
        ],
      },
      attributes: ["id", "name", "nickName", "email", "avatar", "createdAt", "updatedAt"],
      limit,
      offset,
      where: {
        spaceId,
        ...searchName,
        ...searchNick,
      },
      raw: true,
    });
  }

  // 管理员：删除空间
  async deleteSpace(spaceId) {
    // 更改该空间所有用户的空间id为空
    await userModel.update({ spaceId: null }, { where: { spaceId } });
    // 更改该空间除空间主以外：变为普通用户
    await userModel.update({ roleId: 3 }, { where: { spaceId, roleId: { [Op.not]: 2 } } });
    // 删除该空间创建所有角色
    await roleModel.destroy({ where: { spaceId } });
    // 删除该空间信息：作为外键的code和task连带删除
    return await spaceModel.destroy({ where: { id: spaceId } });
  }

  // 获取空间详情内容
  async getSpaceDetail(spaceId) {
    const taskCount = await taskModel.count({ where: { spaceId } });
    const userCount = await userModel.count({ where: { spaceId } });
    const codeCount = await codeSpaceModel.count({ where: { spaceId } });
    const spaceDetail = await spaceModel.findOne({
      include: {
        model: userModel,
        attributes: [
          ["id", "authorId"],
          ["name", "authorName"],
          ["avatar", "authorAvatar"],
        ],
      },
      where: { id: spaceId },
      attributes: ["id", "name", "introduce", "avatar", "inviteCode", "createdAt", "updatedAt"],
    });
    return {
      taskCount,
      userCount,
      codeCount,
      spaceDetail,
    };
  }

  // 用户退出空间
  async exitSpaceByOwn(payload) {
    const { spaceId, roleId, userId } = payload;

    // 修改用户信息：改为无空间
    roleId !== 2 && (await userModel.update({ spaceId: null }, { where: { id: userId } }));

    // 将该空间内提交的代码全部删除
    roleId !== 2 && (await codeSpaceModel.destroy({ where: { authorId: userId, spaceId } }));

    // 如果不是普通用户的话需要将该用户改为 3 普通用户
    roleId !== 2 && (await userModel.update({ roleId: 3 }, { where: { id: userId } }));

    // 将空间内除空间主外的其他人角色全部改为 3 普通用户
    roleId == 2 && (await userModel.update({ roleId: 3 }, { where: { spaceId, roleId: { [Op.not]: 2 } } }));

    // 空间主同时需要将所有用户信息改为无空间
    roleId == 2 && (await userModel.update({ spaceId: null }, { where: { spaceId } }));

    // 将该空间的所有角色删除
    roleId == 2 && (await roleModel.destroy({ where: { spaceId } }));

    // 将该空间的代码删除
    roleId == 2 && (await codeSpaceModel.destroy({ where: { spaceId } }));

    // 将该空间的任务删除
    roleId == 2 && (await taskModel.destroy({ where: { spaceId } }));

    // 最后将该空间删除
    roleId == 2 && (await spaceModel.destroy({ where: { id: spaceId } }));

    return "success";
  }

  // 空间主：踢出用户
  async kickSpaceUser(payload) {
    const { kickId, spaceId } = payload;

    // 修改用户信息：改为无空间，同时为普通角色
    await userModel.update({ spaceId: null, roleId: 3 }, { where: { id: kickId } });
    // 将该用户在空间内提交的代码全部删除
    await codeSpaceModel.destroy({ where: { authorId: kickId, spaceId } });

    return "success";
  }

  // 空间主：编辑用户
  async editSpaceUser(payload) {
    const { roleId, nickName, userId } = payload;
    await userModel.update({ roleId, nickName }, { where: { id: userId } });
    return "success";
  }

  // 空间主：邀请用户
  async invitePeopleBySpace(payload) {
    const { name, spaceId } = payload;
    return await userModel.update({ spaceId }, { where: { name } });
  }

  // 获取空间邀请码
  async getSpaceInviteCode(spaceId) {
    return await spaceModel.findOne({ attributes: ["id", "inviteCode"], where: { id: spaceId } });
  }

  // 获取空间对应的人数
  async getSpacePeopleCount(spaceId) {
    return await userModel.count({ where: { spaceId } });
  }

  // 获取空间对应的代码数
  async getSpaceCodeCount(spaceId) {
    return await codeSpaceModel.count({
      where: { spaceId },
    });
  }

  // 获取空间对应的任务数
  async getSpaceTaskCount(spaceId) {
    return await taskModel.count({
      where: {
        spaceId,
      },
    });
  }
}

module.exports = new SpaceService();
