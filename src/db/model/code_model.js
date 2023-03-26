const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const userModel = require("./user_model");

const codeModel = sequelize.define(
  "code",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preview: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    line: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    liked: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // 1 公开 0 私有
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    // 1 加密 0 不加密
    isPwd: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    // 代码加密密码
    pwd: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "code",
  }
);

codeModel.belongsTo(userModel, {
  foreignKey: "authorId",
});

module.exports = codeModel;
