const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const userModel = require("./user_model");
const codeModel = require("./code_model");
const commentModel = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // 评论内容
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // 根评论id
    rootId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 父评论id
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 点赞数
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // 评论状态
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    tableName: "comment",
  }
);

commentModel.belongsTo(userModel);
commentModel.belongsTo(codeModel);


module.exports = commentModel;
