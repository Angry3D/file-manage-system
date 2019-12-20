import { post, postForm } from "./http";

export default {
  //===== 管理端接口
  // 登陆
  login: p => post("/admin/login", p),
  // 图片管理
  addImage: p => post("/admin/image/add", p),
  getListImage: p => post("/admin/image/getList", p),
  getImage: p => post("/admin/image/get", p),
  setImage: p => post("/admin/image/set", p),
  setBatchImage: p => post("/admin/image/setBatch", p),
  statusImage: p => post("/admin/image/status", p),
  deleteImage: p => post("/admin/image/delete", p),
  // 公共
  uploadImage: p => postForm("/common/upload/image", p),
  uploadVideo: p => postForm("/common/upload/video", p),
  uploadFile: p => postForm("/common/upload/file", p)
};
