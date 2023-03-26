const { MENU } = require("../config/errorType");
const menuService = require("../service/menuService");
const { composeReturnInfo } = require("../utils/handleDataResult");

class MenuController {
  async addMenu(ctx, next) {
    const res = await menuService.addMenu(ctx.request.body);
    ctx.body = composeReturnInfo(MENU.SUCCESS_CREATE);
  }

  async getMenuListByAdmin(ctx, next) {
    let { kw, type } = ctx.query;
    console.log("check:", ctx.query);
    if ((kw && kw.length > 20) || (type && !["M", "D", "B"].includes(type))) {
      ctx.body = composeReturnInfo(MENU.ERROR_PARAM);
      return;
    }
    const res = await menuService.getMenuList({ kw, type });
    ctx.body = composeReturnInfo(MENU.SUCCESS_GET, res);
  }

  async getMenuListBySpace(ctx, next) {
    const res = await menuService.getMenuListBySpace();
    const result = JSON.parse(JSON.stringify(res)).filter(
      (item) => ![3, 4].includes(item.id) && ![3, 4, 6, 7, 8, 9, 10, 11].includes(item.parentId)
    );

    ctx.body = composeReturnInfo(MENU.SUCCESS_GET, result);
  }

  async updateMenu(ctx, next) {
    const id = ctx.params.id;
    const res = await menuService.updateMenu(id, ctx.request.body);
    ctx.body = composeReturnInfo(MENU.SUCCESS_UPDATE);
  }

  async deleteMenu(ctx, next) {
    const id = ctx.params.id;
    const res = await menuService.deleteMenu(id);
    ctx.body = composeReturnInfo(MENU.SUCCESS_DELETE);
  }
}
module.exports = new MenuController();
