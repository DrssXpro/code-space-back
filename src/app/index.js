const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const useRoutes = require("../router/index");
const app = new Koa();

// 使用koa2-cors插件解决跨域问题
app.use(
  cors({
    origin: function (ctx) {
      return "*"; // 允许来自所有域名请求
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization", "Token"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
    allowHeaders: ["Content-Type", "Content-Length", "X-Requested-With", "Authorization", "Accept"],
  })
);
app.use(bodyParser()); //解析JSON数据中间件
useRoutes(app); //动态加载所有路由

module.exports = app;
