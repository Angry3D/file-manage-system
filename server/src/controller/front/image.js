// const Base = require("../base.js");

module.exports = class extends think.Controller {
  async getListAction() {
    const params = this.ctx.state.params;
    // 默认去除隐藏的图片
    Object.assign(params.searchObj, {
      status: 1
    });
    const dbImage = think.dbAdmin("image");
    const data = await dbImage
      .order("created_time DESC")
      .where(params.searchObj)
      .page(params.page, params.limit)
      .countSelect();
    return this.success(this.parsePageData(data));
  }
};
