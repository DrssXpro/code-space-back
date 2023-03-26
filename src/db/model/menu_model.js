const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const menuModel = sequelize.define(
  "menu",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // 菜单名称
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    // 父菜单id
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 菜单icon
    menuIcon: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    // 菜单排序
    orderNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 菜单路由路径
    routePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 菜单组件路径
    comPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 菜单类型：目录、单项、按钮权限: M D B
    menuType: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    // 菜单权限标识：system:role:add 类型
    perms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 菜单状态
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    tableName: "menu",
  }
);

module.exports = menuModel;
