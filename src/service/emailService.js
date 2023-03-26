const { emailCodeModel } = require("../db");
const sendEmailToUser = require("../utils/emailConfig");
class EmailService {
  async sendEmailCode({ email, now }) {
    const code = await sendEmailToUser(email);
    const res = await emailCodeModel.create({ email, code, status: 0, lastTime: now });
  }

  async verifiyEmailCode({ email, name, code }) {
    return await emailCodeModel.findOne({ where: { code, email } });
  }

  async destoryEmailCode(email) {
    return await emailCodeModel.destroy({ where: { email } });
  }
}

module.exports = new EmailService();
