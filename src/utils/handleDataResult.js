const { codeSpaceModel, spaceModel } = require("../db");
const codeService = require("../service/codeService");
const commentService = require("../service/commentService");
const spaceSerivce = require("../service/spaceSerivce");

// 处理权限列表数据，删除关联表查询内容
function handleRoleMenuResult(roleMenu) {
  const menus = JSON.parse(JSON.stringify(roleMenu[0].menus));
  return menus.map((item) => {
    delete item.menuRole;
    return item;
  });
}

// 管理员获取用户列表同时查询该用户是否在空间内
async function handleAdminUserListResult(userList) {
  for (let i = 0; i < userList.length; i++) {
    const spaceId = userList[i].spaceId;
    if (spaceId) {
      const space = await spaceModel.findOne({ where: { id: spaceId } });
      if (space) {
        userList[i].spaceName = space.name;
      }
    }
  }
  return userList;
}

// 获取代码列表后同时查询其对应的收藏量和评论量
async function handleCodeListResult(codeList) {
  for (let i = 0; i < codeList.length; i++) {
    const id = codeList[i].id;
    codeList[i].commentCount = await codeService.getCurrentCodeCommentCount(id);
    codeList[i].collectCount = await codeService.getCurrentCodeCollectionCount(id);
  }
  return codeList;
}

// 获取空间列表同时查询其对应的人数、代码数、任务数
async function handleSpaceListResult(spaceList) {
  for (let i = 0; i < spaceList.length; i++) {
    const id = spaceList[i].id;
    spaceList[i].peopleCount = await spaceSerivce.getSpacePeopleCount(id);
    spaceList[i].codeCount = await spaceSerivce.getSpaceCodeCount(id);
    spaceList[i].taskCount = await spaceSerivce.getSpaceTaskCount(id);
  }
  return spaceList;
}

// 获取根评论下的子评论列表
async function handleCommentChildListResult(commentList, codeId) {
  for (let i = 0; i < commentList.length; i++) {
    const rootId = commentList[i].id;
    const res = await commentService.getChildCodeCommentList({ codeId, rootId, limit: 3, offset: 0 });
    commentList[i].childCount = res.count;
    commentList[i].children = res.rows;
  }
  return commentList;
}

// 获取任务列表同时查询其拥有代码数量统计
async function handleTaskListResult(taskList) {
  for (let i = 0; i < taskList.length; i++) {
    const taskId = taskList[i].id;
    const codeCount = await codeSpaceModel.count({ where: { taskId } });
    taskList[i].codeCount = codeCount;
  }
  return taskList;
}

// 统一设置响应返回信息提示
function composeReturnInfo(errorInfo, data) {
  errorInfo.data = data;
  return errorInfo;
}

module.exports = {
  handleRoleMenuResult,
  handleAdminUserListResult,
  handleCodeListResult,
  handleSpaceListResult,
  handleCommentChildListResult,
  handleTaskListResult,
  composeReturnInfo,
};
