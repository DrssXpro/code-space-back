const app = require("./app");
const config = require("./config/config");
const { syncDBStruct, addMenu, addRole } = require("./db/syncDB");

//启动3000端口服务：接口模块
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功!`);
  // syncDBStruct(); // 同步所有模型 创建表结构
  // addMenu();
  // addRole();
});
