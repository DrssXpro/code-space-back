const Router = require("koa-router");
const emailController = require("../controller/emailController");
const { checkEmailRepeat, checkEmailVerify } = require("../middleware/checkEmail");
const emailRouter = new Router({
  prefix: "/api",
});

emailRouter.post("/email/sendCode", checkEmailRepeat, emailController.sendEmailCode);
emailRouter.post("/email/verifyCode", checkEmailVerify, emailController.verifyEmailCode);
module.exports = emailRouter;
