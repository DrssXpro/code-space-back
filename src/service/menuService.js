const { Op } = require("sequelize");
const { menuModel } = require("../db");

class MenuService {
  // 获取所有菜单信息
  async getMenuList({ kw, type }) {
    const kwRules = kw ? { name: { [Op.like]: `%${kw}%` } } : {};
    const typeRules = type ? { menuType: type } : {};
    return await menuModel.findAndCountAll({ where: { ...kwRules, ...typeRules } });
  }

  // 空间主：获取菜单信息（所有信息进行过滤）
  async getMenuListBySpace() {
    return await menuModel.findAll();
  }

  // 添加菜单
  async addMenu(data) {
    return await menuModel.create(data);
  }

  // 更新菜单
  async updateMenu(id, data) {
    return await menuModel.update(data, { where: { id } });
  }

  // 删除指定菜单
  async deleteMenu(id) {
    return await menuModel.destroy({ where: { id } });
  }
}

module.exports = new MenuService();
