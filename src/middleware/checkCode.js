const { CODE } = require("../config/errorType");
const { composeReturnInfo } = require("../utils/handleDataResult");
const { LANGUAGE } = require("../config/config");
const { encryptedPassword } = require("../utils/passwordMd5");
const codeService = require("../service/codeService");
const { codeModel, taskModel, userModel, codeSpaceModel } = require("../db");

// 检查广场代码上传
async function checkCodeAddBySquare(ctx, next) {
  const { title, lan, content, isPwd, pwd, status } = ctx.request.body;
  console.log(ctx.request.body);
  if (!title || !lan || !content || ![false, true].includes(isPwd) || ![0, 1].includes(status)) {
    ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
    return;
  }
  if ((isPwd && !pwd) || (isPwd && !pwd.length) || (isPwd && pwd.length < 3 && pwd.length > 15)) {
    ctx.body = composeReturnInfo(CODE.ERROR_PWD);
    return;
  }
  if (!LANGUAGE.includes(lan)) {
    ctx.body = composeReturnInfo(CODE.ERROR_LAN);
    return;
  }
  if (content.length < 10 || content.length > 1000) {
    ctx.body = composeReturnInfo(CODE.CODE_LENGTH);
    return;
  }
  if (title.length < 2 || title.length > 30) {
    ctx.body = composeReturnInfo(CODE.TITLE_LENGTH);
    return;
  }
  // 如果设置密码：则需要对密码进行加密
  if (isPwd && pwd.length) {
    ctx.request.body.pwd = encryptedPassword(pwd);
  }
  const authorId = ctx.userInfo.id;
  const codeLength = content.length;
  const lines = content.split("\n").length;
  console.log("checklines:", lines);
  const preview = content.substr(0, Math.floor(codeLength * 0.2));
  ctx.request.body.authorId = authorId; // 设置作者id
  ctx.request.body.preview = preview; // 设置代码预览部分（隐藏全部内容）
  ctx.request.body.line = lines; // 统计代码行数
  await next();
}

// 检查空间内发布代码
async function checkCodeAddBySpace(ctx, next) {
  const { title, lan, content, taskId } = ctx.request.body;
  const userInfo = ctx.userInfo;
  if (!title || !lan || !content || !taskId) {
    ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
    return;
  }
  if (!LANGUAGE.includes(lan)) {
    ctx.body = composeReturnInfo(CODE.ERROR_LAN);
    return;
  }
  if (content.length < 10 || content.length > 1000) {
    ctx.body = composeReturnInfo(CODE.CODE_LENGTH);
    return;
  }
  if (title.length < 2 || title.length > 30) {
    ctx.body = composeReturnInfo(CODE.TITLE_LENGTH);
    return;
  }
  if (!userInfo.space) {
    ctx.body = composeReturnInfo(CODE.CODE_NO_POWER);
    return;
  }

  // 判断加入空间的参数是否正确
  const user = await userModel.findOne({ where: { id: userInfo.id } });
  if (user.spaceId != userInfo.space.spaceId) {
    ctx.body = composeReturnInfo(CODE.CODE_NO_POWER);
    return;
  }

  // 判断任务是否存在
  const task = await taskModel.findOne({ where: { id: taskId, spaceId: user.spaceId } });
  if (!task) {
    ctx.body = composeReturnInfo(CODE.ERROR_TASK);
    return;
  }
  const codeLength = content.length;
  const lines = content.split("\n").length;
  const preview = content.substr(0, Math.floor(codeLength * 0.2));
  ctx.request.body.authorId = userInfo.id; // 设置作者id
  ctx.request.body.spaceId = userInfo.space.spaceId; // 设置空间id
  ctx.request.body.preview = preview; // 设置代码预览部分（隐藏全部内容）
  ctx.request.body.line = lines; // 统计代码行数
  ctx.request.body.status = 1; // 默认代码状态为 1

  await next();
}

// 判断用户输入的密码是否正确
async function checkCodeEncrypt(ctx, next) {
  const pwd = ctx.request.body.pwd;
  const codeId = ctx.params.id;
  // 输入的密码不符合规范
  if (!pwd || (pwd.length < 3 && pwd.length > 15)) {
    console.log(pwd);
    ctx.body = composeReturnInfo(CODE.ERROR_PWD);
    return;
  }

  // 比对密码
  const code = await codeService.getCodePwd(codeId);
  if (code.pwd !== encryptedPassword(pwd)) {
    ctx.body = composeReturnInfo(CODE.CODE_PWD_EEROR);
    return;
  }
  await next();
}

// 检测代码是否属于自己
async function checkOwnCode(ctx, next) {
  const codeId = ctx.params.id;
  const userId = ctx.userInfo.id;
  const code = await codeModel.findOne({ where: { id: codeId } });
  if (code.authorId != userId) {
    ctx.body = composeReturnInfo(CODE.CODE_NO_POWER);
    return;
  }

  await next();
}

// 判断用户是否在空间中
async function checkCodeAndUserInSpace(ctx, next) {
  const userInfo = ctx.userInfo;
  const codeId = ctx.params.id;
  if (codeId == "undefined") {
    ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
    return;
  }
  const id = userInfo.id;
  const spaceId = userInfo.space.spaceId;
  const user = await userModel.findOne({
    where: { id, spaceId },
  });
  const code = await codeSpaceModel.findOne({
    where: {
      spaceId,
      id: codeId,
    },
  });
  if (!code || !user) {
    ctx.body = composeReturnInfo(CODE.CODE_NO_ALLOW);
    return;
  }

  await next();
}

// 检查管理员修改代码
async function checkAdminCodeUpdate(ctx, next) {
  const codeId = ctx.params.id;
  const { content, title, isPwd, pwd, lan } = ctx.request.body;
  if (!codeId || !content || !title || ![false, true].includes(isPwd) || !lan) {
    ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
    return;
  }
  if (!LANGUAGE.includes(lan)) {
    ctx.body = composeReturnInfo(CODE.ERROR_LAN);
    return;
  }
  if (content.length < 10 || content.length > 1000) {
    ctx.body = composeReturnInfo(CODE.CODE_LENGTH);
    return;
  }
  if (title.length < 2 || title.length > 30) {
    ctx.body = composeReturnInfo(CODE.TITLE_LENGTH);
    return;
  }
  if (isPwd && (pwd.length < 2 || pwd.length > 10)) {
    ctx.body = composeReturnInfo(CODE.PWD_LENGTH);
    return;
  }
  // 如果设置密码：则需要对密码进行加密
  if (isPwd && pwd.length) {
    ctx.request.body.pwd = encryptedPassword(pwd);
  }
  const codeLength = content.length;
  const lines = content.split("\n").length;
  const preview = content.substr(0, Math.floor(codeLength * 0.2));
  ctx.request.body.preview = preview; // 设置代码预览部分（隐藏全部内容）
  ctx.request.body.line = lines; // 统计行数
  await next();
}

// 检查空间主修改代码
async function checkCodeEditBySpace(ctx, next) {
  const { title, content, status, lan } = ctx.request.body;
  if (!title || !content || ![1, 2].includes(status) || !LANGUAGE.includes(lan)) {
    ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
    return;
  }
  if (content.length < 10 || content.length > 1000) {
    ctx.body = composeReturnInfo(CODE.CODE_LENGTH);
    return;
  }
  if (title.length < 2 || title.length > 30) {
    ctx.body = composeReturnInfo(CODE.TITLE_LENGTH);
    return;
  }
  await next();
}

// 检查用户更新自己代码参数
async function checkOwnCodeUpdate(ctx, next) {
  const codeId = ctx.params.id;
  const { content, title, isPwd, status, pwd, lan } = ctx.request.body;
  if (!codeId || !content || !title || ![false, true].includes(isPwd) || ![0, 1].includes(status) || !lan) {
    ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
    return;
  }
  if (!LANGUAGE.includes(lan)) {
    ctx.body = composeReturnInfo(CODE.ERROR_LAN);
    return;
  }
  if (content.length < 10 || content.length > 1000) {
    ctx.body = composeReturnInfo(CODE.CODE_LENGTH);
    return;
  }
  if (title.length < 2 || title.length > 30) {
    ctx.body = composeReturnInfo(CODE.TITLE_LENGTH);
    return;
  }
  if (isPwd && (pwd.length < 2 || pwd.length > 10)) {
    ctx.body = composeReturnInfo(CODE.PWD_LENGTH);
    return;
  }
  // 如果设置密码：则需要对密码进行加密
  if (isPwd && pwd.length) {
    ctx.request.body.pwd = encryptedPassword(pwd);
  }
  const codeLength = content.length;
  const lines = content.split("\n").length;
  const preview = content.substr(0, Math.floor(codeLength * 0.2));
  ctx.request.body.preview = preview; // 设置代码预览部分（隐藏全部内容）
  ctx.request.body.line = lines; // 统计行数
  await next();
}

module.exports = {
  checkCodeAddBySquare,
  checkCodeAddBySpace,
  checkCodeEncrypt,
  checkOwnCode,
  checkOwnCodeUpdate,
  checkCodeAndUserInSpace,
  checkCodeEditBySpace,
  checkAdminCodeUpdate,
};
