const sequelize = require("../config/db");
const menu = require("./addMenu");
const { role, roleMenu } = require("./addRole");
const menuModel = require("./model/menu_model");
const roleModel = require("./model/role_model");
// 创建表结构
async function syncDBStruct() {
  await sequelize.sync({ force: true });
  console.log("所有模型均已成功同步.");
}

// 添加所有菜单权限
async function addMenu() {
  for (let i = 0; i < menu.length; i++) {
    await menuModel.create(menu[i]);
  }
}

// 创建角色并绑定权限
async function addRole() {
  const menuList = roleMenu.map((item) => item.menuId);
  for (let i = 0; i < role.length; i++) {
    const r = await roleModel.create(role[i]);
    const menus = await menuModel.findAll({ where: { id: menuList } });
    await r.setMenus(menus);
  }
}

module.exports = {
  syncDBStruct,
  addMenu,
  addRole,
};
