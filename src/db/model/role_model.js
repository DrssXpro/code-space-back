const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const roleModel = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    introduce: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    roleChar: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    isDelete: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    spaceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "role",
  }
);

module.exports = roleModel;
