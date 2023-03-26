const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const emailCodeModel = sequelize.define(
  "emailCode",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //  邮箱验证码
    code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    // 邮箱
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 0:已发出验证码  1:邮箱已验证
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    // 记录发送时间，一定时间内不能重新发送新验证码
    lastTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "emailcode",
  }
);

module.exports = emailCodeModel;
