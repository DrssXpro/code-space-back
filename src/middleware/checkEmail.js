const { EMAIL } = require("../config/errorType");
const { userModel, emailCodeModel } = require("../db");
const { composeReturnInfo } = require("../utils/handleDataResult");

// 发送验证码检验
async function checkEmailRepeat(ctx, next) {
  const { email, name } = ctx.request.body;
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  // 邮箱格式是否正确
  if (!reg.test(email)) {
    ctx.body = composeReturnInfo(EMAIL.ERROR_FORMAT);
    return;
  }

  // 邮箱和用户是否匹配
  const user = await userModel.findOne({ where: { email, name } });
  if (!user) {
    ctx.body = composeReturnInfo(EMAIL.ERROR_EMAIL);
    return;
  }

  // 验证是否频繁请求验证码
  const emailInfo = await emailCodeModel.findOne({ where: { email } });
  if (emailInfo) {
    const now = Date.now();
    const last = new Date(emailInfo.lastTime).getTime();
    if (now - last <= 1000 * 60) {
      ctx.body = composeReturnInfo(EMAIL.ERROR_TIME);
      return;
    }
  }

  await next();
}

// 检验邮箱验证参数
async function checkEmailVerify(ctx, next) {
  const { email, code, password, name } = ctx.request.body;
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!email || !code || !password || !name) {
    ctx.body = composeReturnInfo(EMAIL.ERROR_PARAM);
    return;
  } else if (code.length !== 6) {
    ctx.body = composeReturnInfo(EMAIL.CODE_PARAM);
    return;
  } else if (!reg.test(email)) {
    ctx.body = composeReturnInfo(EMAIL.ERROR_FORMAT);
    return;
  }
  await next();
}

module.exports = {
  checkEmailRepeat,
  checkEmailVerify,
};
