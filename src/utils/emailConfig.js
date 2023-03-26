const nodeEmail = require("nodemailer");
const config = require("../config/config");

async function sendEmailToUser(email) {
  // 生成随机六位数验证码
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10);
  }

  // 邮箱配置信息
  const emailconfig = {
    service: "QQ",
    auth: {
      // 发件人邮箱账号
      user: config.EMIAL,
      //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
      pass: config.EMIAL_CODE,
    },
  };

  // 发送邮件内容信息
  const emailDetail = {
    from: "_Async__<1827951482@qq.com>",
    subject: "重置账号密码",
    to: email,
    html: ` 
      <p>您好！感谢您使用Code Space网站，请用下面的验证码来重置密码</p>
      <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
      <p>如果不是您本人操作，请无视此邮件！</p>
  `,
  };
  // 创建SMTP客户端配置对象
  const transporter = nodeEmail.createTransport(emailconfig);

  return new Promise((resolve, reject) => {
    // 发送邮件
    transporter.sendMail(emailDetail, function (err, info) {
      if (err) reject(err);
      transporter.close();
      resolve(code);
    });
  });
}

module.exports = sendEmailToUser;
