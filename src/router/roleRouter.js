const Router = require("koa-router");
const roleController = require("../controller/roleController");
const { checkAuth, checkUserRolePower } = require("../middleware/checkAuth");
const { checkRoleAdd, checkRoleDeleteOrUpdate } = require("../middleware/checkRole");
const roleRouter = new Router({
  prefix: "/api",
});

roleRouter.post("/role/add", checkAuth, checkRoleAdd, roleController.addRole);
roleRouter.post("/space_role/add", checkAuth, checkUserRolePower, checkRoleAdd, roleController.addRoleBySpace);
roleRouter.post(
  "/space_role/update/:id",
  checkAuth,
  checkUserRolePower,
  checkRoleDeleteOrUpdate,
  roleController.updateRole
);
roleRouter.post(
  "/space_role/delete/:id",
  checkAuth,
  checkUserRolePower,
  checkRoleDeleteOrUpdate,
  roleController.deleteRole
);
roleRouter.post("/role/update/:id", checkAuth, checkUserRolePower, checkRoleDeleteOrUpdate, roleController.updateRole);
roleRouter.post(
  "/role_status/update/:id",
  checkAuth,
  checkUserRolePower,
  checkRoleDeleteOrUpdate,
  roleController.updateRoleStatus
);
roleRouter.post("/role/delete/:id", checkAuth, checkUserRolePower, checkRoleDeleteOrUpdate, roleController.deleteRole);
roleRouter.get("/admin/role_list", checkAuth, roleController.getRoleListByAdmin);
roleRouter.get("/role_space_list", checkAuth, roleController.getRoleListBySpace);
roleRouter.get("/role_menu/:id", roleController.getRoleMenu);

module.exports = roleRouter;
