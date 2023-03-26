const Router = require("koa-router");
const commentController = require("../controller/commentController");
const { checkAuth, judgeIsAdmin } = require("../middleware/checkAuth");
const commentRouter = new Router({
  prefix: "/api",
});

commentRouter.get("/comment_list/code/:id", commentController.getCodeCommentList);
commentRouter.get("/comment_list/child/:id", commentController.getChildCodeCommentList);
commentRouter.get("/admin_comment_list", checkAuth, commentController.getCommentListByAdmin);
commentRouter.get("/comment_list/me", checkAuth, commentController.getMyCommentList);
commentRouter.post("/admin_comment/delete/:id", checkAuth, commentController.deleteComment);
commentRouter.post("/comment/add/:id", checkAuth, judgeIsAdmin, commentController.addCodeComment);
commentRouter.post("/comment/like/:id", commentController.likeComment);
commentRouter.post("/comment/delete/:id", checkAuth, commentController.deleteComment);

module.exports = commentRouter;
