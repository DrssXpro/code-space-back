const { Op } = require("sequelize");
const { commentModel, userModel, codeModel } = require("../db");

class CommentService {
  async getCommentListByAdmin({ limit, offset, kw, code }) {
    const kwRules = kw ? { content: { [Op.like]: `%${kw}%` } } : {};
    const codeRules = code ? { codeId: code } : {};
    return await commentModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: [
            ["id", "authorId"],
            ["name", "authorName"],
          ],
        },
        {
          model: codeModel,
          attributes: [
            ["id", "codeId"],
            ["title", "codeTitle"],
          ],
        },
      ],
      attributes: ["id", "content", "like", "createdAt", "rootId"],
      limit,
      offset,
      where: { ...kwRules, ...codeRules },
      order: [["createdAt", "DESC"]],
      raw: true,
    });
  }
  // 获取该代码的评论列表
  async getCodeCommentList(codeId, payload) {
    const { limit, offset, sort } = payload;
    const rules = sort == 1 ? [["like", "DESC"]] : [["createdAt", "DESC"]];
    console.log(rules);
    return await commentModel.findAndCountAll({
      include: {
        model: userModel,
        attributes: [
          ["name", "authorName"],
          ["avatar", "authorAvatar"],
        ],
      },
      limit,
      offset,
      order: rules,
      where: {
        codeId,
        commentId: null,
      },
    });
  }

  // 获取多级子评论列表
  async getChildCodeCommentList(data) {
    const { codeId, rootId, limit, offset } = data;
    return await commentModel.findAndCountAll({
      include: {
        model: userModel,
        attributes: [
          ["name", "authorName"],
          ["avatar", "authorAvatar"],
        ],
      },
      limit,
      offset,
      where: {
        codeId,
        rootId,
      },
    });
  }

  // 获取我的评论列表
  async getMyCommentList(data) {
    const { limit, offset, userId } = data;
    console.log("check:", data);
    return await commentModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: [
            ["name", "authorName"],
            ["avatar", "authorAvatar"],
          ],
        },
        {
          model: codeModel,
          attributes: [["title", "codeTitle"]],
        },
      ],
      limit,
      offset,
      where: {
        userId,
      },
    });
  }

  // 添加评论
  async addCodeComment(payload) {
    const { codeId, userId, content, rootId, commentId } = payload;
    return await commentModel.create({ codeId, userId, content, rootId, commentId });
  }

  // 评论点赞
  async likeCodeComment(commentId) {
    return await commentModel.increment({ like: 1 }, { where: { id: commentId } });
  }

  // 删除评论
  async deleteComment(commentId) {
    return await commentModel.destroy({ where: { id: commentId } });
  }
}
module.exports = new CommentService();
