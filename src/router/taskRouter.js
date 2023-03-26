const Router = require("koa-router");
const taskController = require("../controller/taskController");
const { checkAuth, checkUserRolePower } = require("../middleware/checkAuth");
const { checkAddTask, checkDeleteTask, checkUpdateTask } = require("../middleware/checkTask");
const taskRouter = new Router({
  prefix: "/api",
});
taskRouter.get("/task/list", taskController.getTaskList);
taskRouter.get("/task/new", checkAuth, taskController.getNewTask);
taskRouter.post("/task/add", checkAuth, checkUserRolePower, checkAddTask, taskController.addTask);
taskRouter.post("/task/delete/:id", checkAuth, checkUserRolePower, checkDeleteTask, taskController.deleteTask);
taskRouter.post("/task/update/:id", checkAuth, checkUserRolePower, checkUpdateTask, taskController.updateTask);

module.exports = taskRouter;
