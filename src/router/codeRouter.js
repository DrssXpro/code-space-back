const Router = require("koa-router");
const codeController = require("../controller/codeController");
const {
  checkAuth,
  addInfoByAuth,
  checkUserRolePower,
  checkUserInSpace,
  checkUserShareCode,
  judgeIsAdmin
} = require("../middleware/checkAuth");
const {
  checkCodeAddBySquare,
  checkCodeEncrypt,
  checkOwnCode,
  checkOwnCodeUpdate,
  checkCodeAddBySpace,
  checkCodeAndUserInSpace,
  checkCodeEditBySpace,
  checkAdminCodeUpdate,
} = require("../middleware/checkCode");
const codeRouter = new Router({
  prefix: "/api",
});

codeRouter.get("/square_code/list", codeController.getCodeList);
codeRouter.get("/square_code/new_list", codeController.getNewCodeList);
codeRouter.get("/search_code/list", codeController.getSearchCodeList);
codeRouter.get("/code/detail/:id", codeController.getCurrentCode);
codeRouter.get("/author_code/list/:id", codeController.getCodeListByAuthor);
codeRouter.get("/space_code/list", checkAuth, checkUserInSpace, codeController.getCodeListBySpace);
codeRouter.get("/space_code/great_list", checkAuth, checkUserInSpace, codeController.getGreatCodeListBySpace);
codeRouter.get(
  "/space_code/detail/:id",
  checkAuth,
  checkUserInSpace,
  checkCodeAndUserInSpace,
  codeController.getCurrentCodeBySpace
);
codeRouter.get("/code/encrypt/:id", addInfoByAuth, codeController.judgeCodeIsPwd);
codeRouter.get("/part_code/:id", codeController.getEncryptCode);
codeRouter.get("/code/collect/list", checkAuth, codeController.getCollectCodeList);
codeRouter.get("/admin_code/list", checkAuth, codeController.getCodeListByAdmin);
codeRouter.get("/own_code/list", checkAuth, codeController.getCodeListByOwn);
codeRouter.get("/space_master/code/list", checkAuth, codeController.getCodeListBySpaceMaster);
codeRouter.post(
  "/admin_code/update/:id",
  checkAuth,
  checkUserRolePower,
  checkAdminCodeUpdate,
  codeController.updateCodeByAdmin
);
codeRouter.post("/admin_code/delete/:id", checkAuth, checkUserRolePower, codeController.deleteCodeInSquare);
codeRouter.post("/own_code/delete/:id", checkAuth, checkOwnCode, codeController.deleteCodeInSquare);
codeRouter.post("/own_code/update/:id", checkAuth, checkOwnCodeUpdate, codeController.updateCodeByOwn);
codeRouter.post("/encrypt_code/:id", checkCodeEncrypt, codeController.getCurrentCode);
codeRouter.post("/code/collect/:id", checkAuth, codeController.collectCode);
codeRouter.post("/code/encrypt_judge/:id", codeController.judgeCodePwd);
codeRouter.post(
  "/square_code/add",
  checkAuth,
  judgeIsAdmin,
  checkUserShareCode,
  checkCodeAddBySquare,
  codeController.addCodeInSquare
);
codeRouter.post(
  "/space_code/add",
  checkAuth,
  judgeIsAdmin,
  checkUserShareCode,
  checkCodeAddBySpace,
  codeController.addCodeInSpace
);
codeRouter.post(
  "/space_code/delete/:id",
  checkAuth,
  checkUserRolePower,
  checkCodeEditBySpace,
  codeController.deleteCodeInSpace
);
codeRouter.post(
  "/space_code/update/:id",
  checkAuth,
  checkUserRolePower,
  checkCodeEditBySpace,
  codeController.updateCodeBySpaceMaster
);
codeRouter.post("/square_code/view/:id", codeController.addCodeViewsInSquare);
codeRouter.post("/square_code/like/:id", codeController.addCodeLikeInSquare);
codeRouter.post("/space_code/view/:id", checkAuth, checkCodeAndUserInSpace, codeController.addCodeViewsInSpace);
codeRouter.post("/space_code/like/:id", checkAuth, checkCodeAndUserInSpace, codeController.addCodeLikeInSpace);
module.exports = codeRouter;
