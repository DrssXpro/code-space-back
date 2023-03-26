const { Op } = require("sequelize");
const { roleModel, menuModel, userModel } = require("../db");

class RoleService {
  // 管理员：添加角色
  async addRole({ name, introduce, status, roleChar, menuList }) {
    const role = await roleModel.create({ name, introduce, roleChar, status });
    const menus = await menuModel.findAll({ where: { id: menuList } });
    await role.setMenus(menus);
    return "success";
  }
  // 空间主：添加角色
  async addRoleBySpace(spaceId, { name, introduce, status, roleChar, menuList }) {
    const role = await roleModel.create({ name, introduce, roleChar, status, spaceId });
    const menus = await menuModel.findAll({ where: { id: menuList } });
    await role.setMenus(menus);
    return "success";
  }

  // 管理员：获取角色列表
  async getRoleListByAdmin(payload) {
    const { limit, offset, kw, status } = payload;
    // 搜索条件
    const searchRules = status ? { name: { [Op.like]: `%${kw}%` }, status } : { name: { [Op.like]: `${kw}%` } };
    return roleModel.findAndCountAll({ limit, offset, where: { isDelete: 0, spaceId: null, ...searchRules } });
  }

  // 空间主：获取角色列表
  async getRoleListBySpace(id, payload) {
    const { limit, offset, kw, status } = payload;
    // 搜索条件
    const searchRules = status ? { name: { [Op.like]: `%${kw}%` }, status } : { name: { [Op.like]: `${kw}%` } };
    return roleModel.findAndCountAll({ limit, offset, where: { isDelete: 0, spaceId: id, ...searchRules } });
  }

  // 查找角色对应权限
  async findAdminRoleMenu(rid) {
    return await roleModel.findAll({
      include: {
        model: menuModel,
      },
      where: {
        id: rid,
      },
    });
  }

  // 更新角色信息
  async updateRole({ name, introduce, roleChar, status, menuList, rid }) {
    const menus = await menuModel.findAll({ where: { id: menuList } }); // 查询菜单列表
    const role = await roleModel.findByPk(rid); // 查看需要修改的role
    await role.update({ name, introduce, roleChar, status }); // 修改信息
    await role.setMenus(menus); // 设置关联表
    return "success";
  }

  // 更新角色状态
  async updateRoleStatus({ rid, status }) {
    return await roleModel.update({ status }, { where: { id: rid } });
  }

  // 删除指定角色：逻辑删除
  async deleteRole(rid) {
    // 将原来的角色改为普通用户
    await userModel.update({ roleId: 3 }, { where: { roleId: rid } });
    return await roleModel.update({ isDelete: 1 }, { where: { id: rid } });
  }
}

module.exports = new RoleService();
