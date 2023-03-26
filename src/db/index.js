const commentModel = require("./model/comment_model");
const collectionModel = require("./model/collection_model");
const userModel = require("./model/user_model");
const codeModel = require("./model/code_model");
const menuModel = require("./model/menu_model");
const spaceModel = require("./model/space_model");
const roleModel = require("./model/role_model");
const taskModel = require("./model/task_model");
const codeSpaceModel = require("./model/code_space_model");
const emailCodeModel = require("./model/emailCode_model");

menuModel.belongsToMany(roleModel, {
  through: "menuRole",
});
roleModel.belongsToMany(menuModel, {
  through: "menuRole",
});

module.exports = {
  codeModel,
  userModel,
  menuModel,
  roleModel,
  taskModel,
  commentModel,
  codeSpaceModel,
  spaceModel,
  emailCodeModel,
  collectionModel,
};
