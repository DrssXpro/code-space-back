const { Op } = require("sequelize");
const { userModel, roleModel, spaceModel, codeModel } = require("../db");

class UserSerivce {
  // 用户注册
  async userRegister({ name, password, email }) {
    return await userModel.create({ name, password, email, roleId: 3 });
  }
  // 管理员：直接添加用户
  async addUserByAdmin(data) {
    return await userModel.create(data);
  }

  // 管理员：获取用户列表
  async getUserListByAdmin({ limit, offset, kw, email }) {
    const kwRules = kw ? { name: { [Op.like]: `%${kw}%` } } : {};
    const emailRules = email ? { email } : {};
    return await userModel.findAndCountAll({
      include: {
        model: roleModel,
        attributes: [
          ["name", "roleName"],
          ["id", "roleId"],
        ],
      },
      attributes: ["id", "name", "avatar", "email", "status", "spaceId", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      raw: true,
      where: { ...kwRules, ...emailRules },
    });
  }

  // 获取指定空间的用户列表
  async getUserListBySpace(id, { limit, offset }) {
    return await userModel.findAndCountAll({
      include: {
        model: roleModel,
        attributes: [
          ["name", "roleName"],
          ["id", "roleId"],
        ],
      },
      attributes: ["id", "name", "avatar", "email", "status", "spaceId", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      where: {
        spaceId: id,
      },
    });
  }
  // 管理员：直接删除用户
  async deleteUserByAdmin(id) {
    return await userModel.destroy({ where: { id } });
  }
  // 管理员：直接修改用户
  async updateUserByAdmin(id, data) {
    data.avatar || delete data.avatar; // 关于默认头像的判断
    return await userModel.update(data, { where: { id } });
  }

  // 更新自己的用户信息
  async updateUserByMe(id, data) {
    return await userModel.update(data, { where: { id } });
  }

  // 用户登录：查询该用户是否存在
  async findUser({ name }) {
    return await userModel.findOne({
      include: {
        model: roleModel,
        attributes: [["name", "roleName"], ["id", "roleId"], "roleChar"],
      },
      attributes: [
        "id",
        "name",
        "nickName",
        "avatar",
        "email",
        "status",
        "spaceId",
        "password",
        "createdAt",
        "updatedAt",
      ],
      where: {
        name,
      },
    });
  }

  // 获取个人详细信息
  async getUserInfo(id) {
    return await userModel.findOne({
      include: {
        model: roleModel,
        attributes: [["name", "roleName"], ["id", "roleId"], "roleChar"],
      },
      attributes: [
        "id",
        "name",
        "avatar",
        "email",
        "nickName",
        "status",
        "spaceId",
        "password",
        "createdAt",
        "updatedAt",
      ],
      where: {
        id,
      },
    });
  }

  // 创建空间后个人信息记录space,邀请码加入正确后记录
  async updateUserSpace(userId, spaceId) {
    return await userModel.update({ spaceId }, { where: { id: userId } });
  }

  // 重置密码
  async resetUserPwd(name, password) {
    return await userModel.update({ password }, { where: { name } });
  }
}

module.exports = new UserSerivce();
