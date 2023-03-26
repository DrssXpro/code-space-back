const config = require("../config/config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  username: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  dialect: "mysql",
});

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((e) => {
    console.error("Unable to connect to the database:", e);
  });

module.exports = sequelize;
