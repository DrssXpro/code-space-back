const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const roleModel = require("./role_model");

const userModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nickName: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(50),
      defaultValue: "https://pic.fasyncsy.com.cn/avatar/default.jpg",
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    roleId: {
      type: DataTypes.INTEGER,
    },
    spaceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "user",
  }
);

userModel.belongsTo(roleModel, {
  foreignKey: "roleId",
});

module.exports = userModel;
