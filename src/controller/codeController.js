const { CODE } = require("../config/errorType");
const { LANGUAGE } = require("../config/config");
const codeService = require("../service/codeService");
const { composeReturnInfo, handleCodeListResult } = require("../utils/handleDataResult");
const { encryptedPassword } = require("../utils/passwordMd5");

class CodeController {
  async addCodeInSquare(ctx, next) {
    const { title, lan, content, preview, isPwd, authorId, pwd, status, line } = ctx.request.body;
    const res = await codeService.addCodeBySquare({ title, lan, preview, content, isPwd, authorId, pwd, status, line });
    ctx.body = composeReturnInfo(CODE.SUCCESS_CREATE, res);
  }

  async addCodeInSpace(ctx, next) {
    const { title, lan, content, preview, line, status, authorId, spaceId, taskId } = ctx.request.body;
    const res = await codeService.addCodeBySpace({
      title,
      lan,
      preview,
      content,
      status,
      line,
      authorId,
      spaceId,
      taskId,
    });
    ctx.body = composeReturnInfo(CODE.SUCCESS_CREATE, res);
  }

  async getCodeList(ctx, next) {
    let { limit, offset, lan, sort } = ctx.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    if ((lan != "All" && !LANGUAGE.includes(lan)) || (sort && ![1, 2, 3].includes(Number(sort)))) {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    const res = await codeService.getCodeList({ limit, offset, sort: Number(sort), lan });
    const result = await handleCodeListResult(JSON.parse(JSON.stringify(res.rows)));
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, { count: res.count, rows: result });
  }

  async getNewCodeList(ctx, next) {
    const res = await codeService.getNewCodeList();
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, res);
  }

  async getSearchCodeList(ctx, next) {
    let { limit, offset, kw, sort, isPwd } = ctx.query;
    let lan = ctx.query["lan[]"]; // 传递数组的取法
    // 单项传递时需要数组包裹
    if (lan && !(lan instanceof Array)) {
      lan = [lan];
    }
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    if (
      (lan && !lan.every((item) => LANGUAGE.includes(item))) ||
      (isPwd && !["true", "false"].includes(isPwd)) ||
      (kw && kw.length > 20) ||
      (sort && ![1, 2, 3].includes(Number(sort)))
    ) {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    const res = await codeService.getSearchCodeList({ limit, offset, sort: Number(sort), lan, isPwd, kw });
    const result = await handleCodeListResult(JSON.parse(JSON.stringify(res.rows)));
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, { count: res.count, rows: result });
  }

  async getCodeListByAdmin(ctx, next) {
    let { limit, offset, kw, lan } = ctx.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    if ((kw && kw.lenth > 20) || (lan != "" && !LANGUAGE.includes(lan))) {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    console.log("check:", ctx.query);
    const res = await codeService.getCodeListByAdmin({ limit, offset, kw, lan });
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, res);
  }

  async getCodeListByOwn(ctx, next) {
    let { limit, offset, kw, lan } = ctx.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    const userId = ctx.userInfo.id;
    if ((kw && kw.lenth > 20) || (lan != "" && !LANGUAGE.includes(lan))) {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    const res = await codeService.getCodeListByOwn(userId, { limit, offset, kw, lan });
    const result = await handleCodeListResult(JSON.parse(JSON.stringify(res.rows)));
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, { count: res.count, rows: result });
  }

  async getCodeListBySpace(ctx, next) {
    let { limit, offset, kw, sort, task, status } = ctx.query;
    let lan = ctx.query["lan[]"]; // 传递数组的取法
    // 单项传递时需要数组包裹
    if (lan && !(lan instanceof Array)) {
      lan = [lan];
    }
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    const spaceId = ctx.userInfo.space.spaceId;
    if (
      (lan && !lan.every((item) => LANGUAGE.includes(item))) ||
      (status && ![1, 2].includes(Number(status))) ||
      (kw && kw.length > 20) ||
      (sort && ![1, 2, 3].includes(Number(sort)))
    ) {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    const res = await codeService.getCodeListBySpace(spaceId, {
      limit,
      offset,
      kw,
      sort: Number(sort),
      task: Number(task),
      status: Number(status),
      lan,
    });
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, res);
  }

  async getGreatCodeListBySpace(ctx, next) {
    const spaceId = ctx.userInfo.space.spaceId;
    const res = await codeService.getGreatCodeList(spaceId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, res);
  }

  async getCodeListByAuthor(ctx, next) {
    const userId = ctx.params.id;
    const res = await codeService.getAuthorCodeList(userId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, res);
  }

  async getCodeListBySpaceMaster(ctx, next) {
    let { limit, offset, kw, lan, task } = ctx.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    const spaceId = ctx.userInfo.space.spaceId;
    if ((kw && kw.lenth > 20) || (lan != "" && !LANGUAGE.includes(lan))) {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    const res = await codeService.getCodeListBySpaceMaster(spaceId, { limit, offset, kw, lan, task });
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, res);
  }

  async getCurrentCode(ctx, next) {
    const codeId = ctx.params.id;
    if (codeId == "undefined") {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    const res = JSON.parse(JSON.stringify(await codeService.getCodeDetail(codeId)));
    const collectionCount = await codeService.getCurrentCodeCollectionCount(codeId);
    res.collectCount = collectionCount;
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, res);
  }

  async getCurrentCodeBySpace(ctx, next) {
    const codeId = ctx.params.id;
    if (codeId == "undefined") {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    const spaceId = ctx.userInfo.space.spaceId;
    const res = await codeService.getSpaceCodeDetail(spaceId, codeId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, res);
  }

  async updateCodeByAdmin(ctx, next) {
    const codeId = ctx.params.id;
    if (codeId == "undefined") {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    let { title, content, isPwd, pwd, lan } = ctx.request.body;
    if (!isPwd) {
      pwd = null;
    }

    await codeService.updateCodeByAdmin(codeId, { content, title, isPwd, pwd, lan });
    ctx.body = composeReturnInfo(CODE.SUCCESS_UPDATE);
  }

  async updateCodeBySpaceMaster(ctx, next) {
    const codeId = ctx.params.id;
    if (codeId == "undefined") {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    const { title, content, preview, status, lan } = ctx.request.body;
    await codeService.updateCodeBySpaceMaster(codeId, { title, content, preview, status, lan });
    ctx.body = composeReturnInfo(CODE.SUCCESS_UPDATE);
  }

  async updateCodeByOwn(ctx, next) {
    const codeId = ctx.params.id;
    if (codeId == "undefined") {
      ctx.body = composeReturnInfo(CODE.ERROR_PARAM);
      return;
    }
    let { content, title, isPwd, status, pwd, lan, line } = ctx.request.body;
    // 如果不进行加密，则直接处理为空
    if (!isPwd) {
      pwd = null;
    }
    const res = await codeService.updateCodeOnOwn(codeId, { content, title, isPwd, status, pwd, lan, line });
    ctx.body = composeReturnInfo(CODE.SUCCESS_UPDATE);
  }

  async getCollectCodeList(ctx, next) {
    const userId = ctx.userInfo.id;
    let { limit, offset } = ctx.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    const codeIds = JSON.parse(JSON.stringify(await codeService.getMyCOllectCode(userId))).map((item) => item.codeId);
    const res = await codeService.getCollectList({ limit, offset, codeIds });
    const result = await handleCodeListResult(JSON.parse(JSON.stringify(res.rows)));
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, { count: res.count, rows: result });
  }

  async deleteCodeInSquare(ctx, next) {
    const codeId = ctx.params.id;
    const res = await codeService.deleteCodeInSquare(codeId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_DELETE);
  }

  async deleteCodeInSpace(ctx, next) {
    const codeId = ctx.params.id;
    const res = await codeService.deleteCodeInSpace(codeId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_DELETE);
  }

  async collectCode(ctx, next) {
    const codeId = ctx.params.id;
    const userId = ctx.userInfo.id;

    // 判断收藏的代码id是否存在
    const res = await codeService.getCodeDetail(codeId);
    if (!res) {
      ctx.body = composeReturnInfo(CODE.CODE_NOT_EXIST);
    } else {
      // 收藏 / 取消收藏操作
      const result = await codeService.collectCode(userId, codeId);
      ctx.body =
        result === "collect" ? composeReturnInfo(CODE.SUCCESS_COLLECT) : composeReturnInfo(CODE.SUCCESS_COLLECT_CANCEL);
    }
  }

  async addCodeViewsInSquare(ctx, next) {
    const codeId = ctx.params.id;
    const res = await codeService.addCodeViewBySquare(codeId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_OPERATOR);
  }

  async addCodeLikeInSquare(ctx, next) {
    const codeId = ctx.params.id;
    const res = await codeService.addCodeLikeBySquare(codeId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_LIKE);
  }

  async addCodeViewsInSpace(ctx, next) {
    const codeId = ctx.params.id;
    const res = await codeService.addCodeViewBySpace(codeId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_OPERATOR);
  }

  async addCodeLikeInSpace(ctx, next) {
    const codeId = ctx.params.id;
    const res = await codeService.addCodeLikeBySpace(codeId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_LIKE);
  }

  // 代码是否加密
  async judgeCodeIsPwd(ctx, next) {
    const codeId = ctx.params.id;
    const userInfo = ctx.userInfo;
    const res = JSON.parse(JSON.stringify(await codeService.getCodeIsPwd(codeId)));
    console.log(res);
    // 判断用户是否登录保存信息至ctx
    if (userInfo) {
      // 如果是本人的代码则无需输入密码直接访问
      if (userInfo.id === res.authorId) {
        ctx.body = composeReturnInfo(CODE.CODE_ALLOW_PWD);
        return;
      }
    }
    // 根据代码密码判断是否有加密
    if (res.pwd) {
      ctx.body = composeReturnInfo(CODE.CODE_HAS_PWD);
    } else {
      ctx.body = composeReturnInfo(CODE.CODE_NOT_PWD);
    }
  }

  // 判断代码是否加密
  async judgeCodePwd(ctx, next) {
    const codeId = ctx.params.id;
    const pwd = ctx.request.body.pwd;
    if (!pwd || (pwd.length < 4 && pwd.length > 15)) {
      ctx.body = composeReturnInfo(CODE.ERROR_PWD);
      return;
    }
    const res = JSON.parse(JSON.stringify(await codeService.getCodeIsPwd(codeId)));
    if (res.pwd == encryptedPassword(pwd)) {
      ctx.body = composeReturnInfo(CODE.SUCCESS_GET);
    } else {
      ctx.body = composeReturnInfo(CODE.CODE_PWD_EEROR);
    }
  }

  // 获取加密代码的部分信息
  async getEncryptCode(ctx, next) {
    const codeId = ctx.params.id;
    const res = await codeService.getEncryptCode(codeId);
    ctx.body = composeReturnInfo(CODE.SUCCESS_GET, res);
  }
}

module.exports = new CodeController();
