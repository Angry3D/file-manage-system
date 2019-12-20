const Base = require("../base.js");
const fs = require("fs");
const path = require("path");
const Define = require("../../config/define");
const Sharp = require("sharp");

module.exports = class extends Base {
  imageAction() {
    return this.uploadFunc("图片上传失败", "image");
  }
  videoAction() {
    return this.uploadFunc("视频上传失败", "video");
  }
  fileAction() {
    return this.uploadFunc("文件上传失败", "file");
  }
  async uploadFunc(failTip, folderName) {
    const file = this.file("file");
    if (!file) {
      return this.fail(201, failTip);
    }
    // 目录信息
    switch (folderName) {
      case "image":
        return this.processImage(file, folderName);
      default:
        break;
    }
  }
  async processImage(file, folderName) {
    // path & file name
    const dbPath = folderName + "/" + path.basename(file.path);
    const filePath = path.join(Define.fileDir, dbPath);
    const extName = path.extname(file.path);
    let dbPathThumbnail =
      folderName + "/" + path.basename(file.path, extName) + "_thumb" + extName;
    let filePathThumbnail = path.join(Define.fileDir, dbPathThumbnail);
    if (file.type === "image/gif") {
      dbPathThumbnail = dbPath;
      filePathThumbnail = filePath;
      // 移动文件
      await this.moveFile(file.path, filePath);
    } else {
      // sharp info
      const sharpImg = Sharp(file.path).rotate();
      const sharpImgMeta = await sharpImg.metadata();
      // origin image
      await sharpImg.toFile(filePath);
      // thumbnail imgage
      await sharpImg
        .resize(Math.min(300, sharpImgMeta.width), null)
        .toFile(filePathThumbnail);
    }
    // 压入信息到数据库
    const uploadImage = think.dbAdmin("upload_image");
    const imageID = await uploadImage.add({
      name: file.name,
      path: dbPath,
      path_thumb: dbPathThumbnail
    });
    // 请求返回
    return this.success({
      url: Define.fileHost + dbPath,
      url_thumb: Define.fileHost + dbPathThumbnail,
      id: imageID
    });
  }
  moveFile(srcPath, destPath) {
    return new Promise(resolve => {
      const readStream = fs.createReadStream(srcPath);
      const writeStream = fs.createWriteStream(destPath);
      readStream.pipe(writeStream);
      readStream.on("end", () => {
        // fs.unlinkSync(srcPath);
        resolve();
      });
    });
  }
};
