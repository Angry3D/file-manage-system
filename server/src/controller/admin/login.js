const Base = require("../base.js");
const moment = require("moment");

module.exports = class extends Base {
  async indexAction() {
    const params = this.post();
    if (!params.account || !params.pwd) {
      return this.fail(201, "缺少必要参数");
    }
    const user = think.dbAdmin("user");
    const data = await user.where({ account: params.account }).find();
    if (think.isEmpty(data)) {
      return this.fail(201, "用户名不存在");
    }
    if (data.pwd !== params.pwd) {
      return this.fail(201, "密码错误");
    }
    // ===== success
    const token = think.uuid();
    this.ctx.state.token = token;
    await user.where({ account: params.account }).update({
      token,
      login_ip: this.ctx.ip,
      login_time: moment().format("YYYY-MM-DD HH:mm:ss")
    });
    return this.success({
      token
    });
  }
};
