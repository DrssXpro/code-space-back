const { COMMENT } = require("../config/errorType");
const commentService = require("../service/commentService");
const { handleCommentChildListResult, composeReturnInfo } = require("../utils/handleDataResult");

class CommentController {
  async getCommentListByAdmin(ctx, next) {
    let { limit, offset, kw, code } = ctx.request.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    const res = await commentService.getCommentListByAdmin({ limit, offset, kw, code });
    ctx.body = composeReturnInfo(COMMENT.SUCCESS_GET, res);
  }
  async getCodeCommentList(ctx, next) {
    const codeId = ctx.params.id;
    let { limit, offset, sort } = ctx.request.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    const res = await commentService.getCodeCommentList(codeId, { limit, offset, sort });
    const result = await handleCommentChildListResult(JSON.parse(JSON.stringify(res.rows)), codeId);
    ctx.body = composeReturnInfo(COMMENT.SUCCESS_GET, { count: res.count, rows: result });
  }

  async getChildCodeCommentList(ctx, next) {
    const codeId = ctx.params.id;
    let { limit, offset, rootId } = ctx.request.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    if (!codeId || !rootId) {
      ctx.body = composeReturnInfo(COMMENT.ERROR_PARAM);
      return;
    }
    const res = await commentService.getChildCodeCommentList({ limit, offset, codeId, rootId });

    ctx.body = composeReturnInfo(COMMENT.SUCCESS_GET, res);
  }

  async getMyCommentList(ctx, next) {
    const userId = ctx.userInfo.id;
    let { limit, offset } = ctx.request.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    const res = await commentService.getMyCommentList({ userId, limit, offset });
    ctx.body = composeReturnInfo(COMMENT.SUCCESS_GET, res);
  }

  async addCodeComment(ctx, next) {
    const codeId = ctx.params.id;
    const userId = ctx.userInfo.id;
    const { content, rootId, commentId } = ctx.request.body;
    if (content.length < 5 || (content.length > 100 && commentId) || (content.length > 400 && !commentId)) {
      ctx.body = composeReturnInfo(COMMENT.COMMENT_LONG);
      return;
    }
    const res = await commentService.addCodeComment({ codeId, userId, content, rootId, commentId });
    ctx.body = composeReturnInfo(COMMENT.SUCCESS_CREATE);
  }

  async likeComment(ctx, next) {
    const commentId = ctx.params.id;
    const res = await commentService.likeCodeComment(commentId);
    ctx.body = composeReturnInfo(COMMENT.SUCCESS_LIKE);
  }

  async deleteComment(ctx, next) {
    const commentId = ctx.params.id;
    const res = await commentService.deleteComment(commentId);
    ctx.body = composeReturnInfo(COMMENT.SUCCESS_DELETE);
  }
}

module.exports = new CommentController();
