const roleService = require("../service/roleService");
const { ROLE } = require("../config/errorType");
const { composeReturnInfo } = require("../utils/handleDataResult");
const { handleRoleMenuResult } = require("../utils/handleDataResult");

class RoleController {
  async addRole(ctx, next) {
    const { name, introduce, roleChar, menuList, status } = ctx.request.body;

    const res = await roleService.addRole({ name, introduce, roleChar, menuList, status });
    ctx.body = composeReturnInfo(ROLE.SUCCESS_CREATE);
  }

  async addRoleBySpace(ctx, next) {
    const { name, introduce, roleChar, menuList, status } = ctx.request.body;
    const spaceId = ctx.userInfo.space.spaceId;
    const res = await roleService.addRoleBySpace(spaceId, { name, introduce, roleChar, menuList, status });
    ctx.body = composeReturnInfo(ROLE.SUCCESS_CREATE);
  }

  async getRoleListByAdmin(ctx, next) {
    let { limit, offset, kw, status } = ctx.request.query;
    if ((kw && kw.length > 20) || ![0, 1].includes(Number(status))) {
      ctx.body = composeReturnInfo(ROLE.ERROR_PARAM);
      return;
    }
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    const res = await roleService.getRoleListByAdmin({ limit, offset, kw, status });
    ctx.body = composeReturnInfo(ROLE.SUCCESS_GET, res);
  }

  async getRoleListBySpace(ctx, next) {
    const spaceId = ctx.userInfo.space.spaceId;
    let { limit, offset, kw, status } = ctx.request.query;
    if ((kw && kw.length > 20) || ![0, 1].includes(Number(status))) {
      ctx.body = composeReturnInfo(ROLE.ERROR_PARAM);
      return;
    }
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    const res = await roleService.getRoleListBySpace(spaceId, { limit, offset, kw, status });
    ctx.body = composeReturnInfo(ROLE.SUCCESS_GET, res);
  }

  async getRoleMenu(ctx, next) {
    const rid = ctx.params.id;
    if (!Number(rid)) {
      ctx.body = composeReturnInfo(ROLE.ERROR_PARAM);
      return;
    }
    const res = await roleService.findAdminRoleMenu(Number(rid));
    ctx.body = composeReturnInfo(ROLE.SUCCESS_GET, handleRoleMenuResult(res));
  }

  async updateRole(ctx, next) {
    const rid = ctx.params.id;
    const { name, introduce, roleChar, menuList, status } = ctx.request.body;
    if (!name || !introduce || !roleChar || (status !== 0 && status !== 1)) {
      ctx.body = composeReturnInfo(ROLE.ERROR_PARAM);
    } else {
      const res = await roleService.updateRole({ name, introduce, roleChar, menuList, status, rid });
      ctx.body = composeReturnInfo(ROLE.SUCCESS_UPDATE);
    }
  }

  async updateRoleStatus(ctx, next) {
    const rid = ctx.params.id;
    const { status } = ctx.request.body;
    if (status !== 0 && status !== 1) {
      ctx.body = composeReturnInfo(ROLE.ERROR_PARAM);
    } else {
      const res = await roleService.updateRoleStatus({ rid, status });
      ctx.body = composeReturnInfo(ROLE.SUCCESS_UPDATE);
    }
  }

  async deleteRole(ctx, next) {
    const rid = ctx.params.id;
    if (!rid) {
      ctx.body = composeReturnInfo(ROLE.ERROR_PARAM);
    } else {
      const res = await roleService.deleteRole(rid);
      ctx.body = composeReturnInfo(ROLE.SUCCESS_DELETE);
    }
  }
}

module.exports = new RoleController();
