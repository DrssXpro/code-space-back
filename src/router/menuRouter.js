const Router = require("koa-router");
const menuController = require("../controller/menuController");
const { checkAuth, checkUserRolePower } = require("../middleware/checkAuth");
const { handleCheckMenuPass } = require("../middleware/checkMenu");
const menuRouter = new Router({
  prefix: "/api",
});

menuRouter.post("/menu/add", checkAuth, checkUserRolePower, handleCheckMenuPass, menuController.addMenu);
menuRouter.post("/menu/delete/:id", checkAuth, checkUserRolePower, menuController.deleteMenu);
menuRouter.post("/menu/update/:id", checkAuth, checkUserRolePower, handleCheckMenuPass, menuController.updateMenu);
menuRouter.get("/menu/list", menuController.getMenuListByAdmin);
menuRouter.get("/menu/space_list", menuController.getMenuListBySpace);

module.exports = menuRouter;
