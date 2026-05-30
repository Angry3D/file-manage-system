const isDev = think.env === "development";
const Env = require("./env");

const defaultFileDir = isDev ? "/Users/relax/Documents/upload" : "/mnt/a/data/upload";
const defaultFileHost = isDev ? "http://127.0.0.1:11000/" : "http://file.relaxcoder.top/";

module.exports = {
  fileDir: Env.get("BABYLIFE_UPLOAD_DIR", defaultFileDir),
  fileHost: Env.get("BABYLIFE_FILE_HOST", defaultFileHost),
  showStatus: {
    show: 1,
    hide: 2
  }
};
