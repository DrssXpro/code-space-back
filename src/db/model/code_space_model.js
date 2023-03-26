const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const spaceModel = require("./space_model");
const taskModel = require("./task_model");
const userModel = require("./user_model");

const codeSpaceModel = sequelize.define(
  "codespace",
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
    // 0 正常 1 优秀
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    authorId: {
      type: DataTypes.UUID,
    },
    taskId: {
      type: DataTypes.INTEGER,
    },
    spaceId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "codeSpace",
  }
);

codeSpaceModel.belongsTo(userModel, {
  foreignKey: "authorId",
});
codeSpaceModel.belongsTo(taskModel, {
  foreignKey: "taskId",
});
codeSpaceModel.belongsTo(spaceModel, {
  foreignKey: "spaceId",
});

module.exports = codeSpaceModel;
