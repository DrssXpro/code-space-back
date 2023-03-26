const Router = require("koa-router");
const spaceController = require("../controller/spaceController");
const { checkAuth, checkUserRolePower, judgeIsAdmin } = require("../middleware/checkAuth");
const {
  checkAddSpace,
  checkSpaceUpdate,
  checkGetSpaceDetail,
  checkKickUser,
  checkInviteUser,
  checkEditSpaceUser,
  checkUserInSpace,
} = require("../middleware/checkSpace");
const { spaceHandler } = require("../middleware/fileUpload");
const spaceRouter = new Router({
  prefix: "/api",
});

spaceRouter.get("/space/list", spaceController.getSpaceList);
spaceRouter.get("/space/isIn/:id", checkAuth, checkUserInSpace);
spaceRouter.get("/space/user/list", checkAuth, spaceController.getSpaceUserList);
spaceRouter.get("/space/detail/:id", checkAuth, checkGetSpaceDetail, spaceController.getSpaceDetail);
spaceRouter.post("/space/invite_code/:id", checkAuth, judgeIsAdmin, spaceController.judgeSpaceInviteCode);
spaceRouter.post(
  "/space/invite_user",
  checkAuth,
  checkUserRolePower,
  checkInviteUser,
  spaceController.invitePeopleBySpace
);
spaceRouter.post(
  "/space/user/edit/:id",
  checkAuth,
  checkUserRolePower,
  checkEditSpaceUser,
  spaceController.editSpaceUser
);
spaceRouter.post("/space/add/:id", checkAuth, checkUserRolePower, checkAddSpace, spaceController.addSpaceInfo);
spaceRouter.post("/space/kick/:id", checkAuth, checkUserRolePower, checkKickUser, spaceController.kickSpaceUser);
spaceRouter.post("/space/exit", checkAuth, spaceController.exitSpaceByOwn);
spaceRouter.post("/space/update/:id", checkAuth, checkUserRolePower, checkSpaceUpdate, spaceController.updateSpaceInfo);
spaceRouter.post("/space/delete/:id", checkAuth, checkUserRolePower, spaceController.deleteSpace);
spaceRouter.post("/space/upload", checkAuth, spaceHandler, spaceController.uploadSpaceAvatar);
module.exports = spaceRouter;
