const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const userModel = require("./user_model");

const spaceModel = sequelize.define(
  "space",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    introduce: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "https://pic.fasyncsy.com.cn/avatar/defaultSpace.jpg",
    },
    inviteCode: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    authorId: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "space",
  }
);

spaceModel.belongsTo(userModel, {
  foreignKey: "authorId",
});

module.exports = spaceModel;
