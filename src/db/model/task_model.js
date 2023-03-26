const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const spaceModel = require("./space_model");
const taskModel = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    introduce: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    spaceId: { type: DataTypes.INTEGER },
  },
  {
    tableName: "task",
  }
);

taskModel.belongsTo(spaceModel, {
  foreignKey: "spaceId",
});

module.exports = taskModel;
