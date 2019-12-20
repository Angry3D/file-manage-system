const isDev = think.env === "development";

module.exports = {
  fileDir: isDev ? "/Users/relax/Documents/upload" : "/mnt/a/data/upload",
  fileHost: isDev ? "http://127.0.0.1:11000/" : "http://file.relaxcoder.top/",
  showStatus: {
    show: 1,
    hide: 2
  }
};
