const { EMAIL } = require("../config/errorType");
const emailService = require("../service/emailService");
const userSerivce = require("../service/userSerivce");
const { composeReturnInfo } = require("../utils/handleDataResult");
const { encryptedPassword } = require("../utils/passwordMd5");

class EmailController {
  async sendEmailCode(ctx, next) {
    const { email } = ctx.request.body;
    const now = new Date();
    const res = await emailService.sendEmailCode({ email, now });
    ctx.body = composeReturnInfo(EMAIL.SUCCESS_SEND);
  }

  async verifyEmailCode(ctx, next) {
    const { email, code, password, name } = ctx.request.body;
    // 验证码是否正确
    const res = await emailService.verifiyEmailCode({ email, code });
    if (!res) {
      ctx.body = composeReturnInfo(EMAIL.ERROR_CODE);
      return;
    }
    // 重置密码
    await emailService.destoryEmailCode(email);
    await userSerivce.resetUserPwd(name, encryptedPassword(password));
    ctx.body = composeReturnInfo(EMAIL.SUCCESS_VERIFY);
  }
}

module.exports = new EmailController();
