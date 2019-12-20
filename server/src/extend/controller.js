const moment = require("moment");

module.exports = {
  success(...args) {
    this.ctx.success(...args);
    return true;
  },
  fail(...args) {
    this.ctx.fail(...args);
    return true;
  },
  failErr(msg) {
    return this.fail(201, msg);
  },
  failToken(msg) {
    return this.fail(202, msg);
  },
  failParams() {
    return this.failErr("参数错误");
  },
  nowTime() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  },
  parsePageParams(params, config) {
    params.searchObj = {};
    for (const key in params) {
      if (key === "page") {
        params[key] = params[key] || 1;
      }
      if (key === "limit") {
        params[key] = params[key] || 10;
      }
      const cfg = config[key];
      if (cfg === undefined) continue;
      switch (cfg.type) {
        case "dateRange": // 时间范围
          params.searchObj[cfg.dbKey] = [
            "BETWEEN",
            moment(params[cfg.startKey]).format("YYYY-MM-DD HH:mm:ss"),
            moment(params[cfg.endKey]).format("YYYY-MM-DD HH:mm:ss")
          ];
          break;
        case "full": // 全词搜索
          params.searchObj[cfg.dbKey] = params[key];
          break;
        case "fuzzy": // 模糊搜索
          params.searchObj[cfg.dbKey] = ["like", "%" + params[key] + "%"];
          break;
      }
    }
    return params;
  },
  parsePageData(data) {
    return {
      page: data.currentPage,
      limit: data.pageSize,
      total: data.count,
      list: data.data
    };
  }
};
