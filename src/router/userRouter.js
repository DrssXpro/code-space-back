const Router = require("koa-router");
const userController = require("../controller/userController");
const { checkAuth, checkUserRolePower } = require("../middleware/checkAuth");
const {
  checkAddUser,
  checkUpdateUserByAdmin,
  checkUserLogin,
  checkUserRegister,
  checkUpdateUserByMe,
} = require("../middleware/checkUser");
const { avatarHandler } = require("../middleware/fileUpload");

const userRouter = new Router({
  prefix: "/api",
});

userRouter.get("/user/info/:id", userController.getUserInfo);
userRouter.get("/admin/user_list", checkAuth, userController.getUserListByAdmin);
userRouter.post("/admin/user/add", checkAuth, checkUserRolePower, checkAddUser, userController.addUserByAdmin);
userRouter.post(
  "/admin/user/update/:id",
  checkAuth,
  checkUserRolePower,
  checkUpdateUserByAdmin,
  userController.updateUserByAdmin
);
userRouter.post("/admin/user/delete/:id", checkAuth, checkUserRolePower, userController.deleteUserByAdmin);
userRouter.post("/user/login", checkUserLogin, userController.userLogin);
userRouter.post("/user/register", checkUserRegister, userController.userRegister);
userRouter.post("/user/update/:id", checkAuth, checkUpdateUserByMe, userController.updateUserByMe);
userRouter.post("/user/upload", checkAuth, avatarHandler, userController.userAvatarUpload);
module.exports = userRouter;
