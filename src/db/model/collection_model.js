const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const codeModel = require("./code_model");
const userModel = require("./user_model");

// 收藏模型
const collectionModel = sequelize.define(
  "collection",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
    },

    codeId: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "collection",
  }
);
// 建立外键
collectionModel.belongsTo(userModel, {
  foreignKey: "userId",
});
collectionModel.belongsTo(codeModel, {
  foreignKey: "codeId",
});

module.exports = collectionModel;
