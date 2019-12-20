const moment = require("moment");

const ignoreUrls = ["/admin/login", "/"];

module.exports = class extends think.Controller {
  async __before() {
    // check token expiration
    if (ignoreUrls.indexOf(this.ctx.url) !== -1) {
      return true;
    }
    const token = this.ctx.request.header.token;
    if (!token) {
      this.fail(202, "token为空，请重新登陆");
      return false;
    }
    const user = think.dbAdmin("user");
    const data = await user.where({ token }).find();
    if (think.isEmpty(data)) {
      this.fail(202, "token不合法，请重新登陆");
      return false;
    }
    if (moment().valueOf() > moment(data.token_expiration_time).valueOf()) {
      this.fail(202, "token已过期，请重新登陆");
      return false;
    }
    // insert token to state
    this.ctx.state.token = token;
    // console.log("______before", this.ctx.state.token);
    return true;
  }
  async __after() {
    // update token expiration time
    // console.log("_______after", this.ctx.state.token);
    const token = this.ctx.state.token;
    if (!token) {
      return;
    }
    const user = think.dbAdmin("user");
    await user.where({ token }).update({
      token_expiration_time: moment(
        new Date().getTime() + 3 * 24 * 3600000
      ).format("YYYY-MM-DD HH:mm:ss") // 三天后过期
    });
  }
};
