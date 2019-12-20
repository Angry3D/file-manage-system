const Base = require("../base.js");
// const Define = require("../../config/define");
// const moment = require("moment");

module.exports = class extends Base {
  async addAction() {
    const params = this.post();
    const dbImage = think.dbAdmin("image");
    const nowTime = this.nowTime();
    params.images.forEach(async i => {
      await dbImage.add({
        created_time: nowTime,
        status: params.status,
        place: params.place,
        note: params.note,
        image: i.url,
        image_thumb: i.url_thumb,
        image_id: i.id
      });
    });
    return this.success(params.images.length);
  }

  async getListAction() {
    const params = this.ctx.state.params;
    const dbImage = think.dbAdmin("image");
    const data = await dbImage
      .order("created_time DESC")
      .where(params.searchObj)
      .page(params.page, params.limit)
      .countSelect();
    return this.success(this.parsePageData(data));
  }

  async getAction() {
    const params = this.post();
    const data = await think
      .dbAdmin("image")
      .where({ id: params.id })
      .find();
    return this.success(data);
  }

  async setAction() {
    const params = this.post();
    await think
      .dbAdmin("image")
      .where({
        id: params.id
      })
      .update({
        image: params.image,
        status: params.status,
        place: params.place,
        note: params.note
      });
    return this.success(1);
  }

  async setBatchAction() {
    const params = this.post();
    await think
      .dbAdmin("image")
      .where({
        id: ["IN", params.ids]
      })
      .update({
        status: params.status,
        place: params.place,
        note: params.note
      });
    return this.success(params.ids.split(",").length);
  }

  async statusAction() {
    const params = this.post();
    params.ids += "";
    const idsAry = params.ids.split(",");
    const updateAry = [];
    idsAry.forEach(i => {
      updateAry.push({
        id: i,
        status: params.status
      });
    });
    // console.log("status", updateAry);
    await think.dbAdmin("image").updateMany(updateAry);
    return this.success(updateAry.length);
  }

  async deleteAction() {
    const params = this.post();
    await think
      .dbAdmin("image")
      .where({
        id: ["IN", params.ids]
      })
      .delete();
  }
};
