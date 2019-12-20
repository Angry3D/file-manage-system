import { post } from "./http";

export default {
  //===== H5端接口
  // 照片墙
  getListImage: p => post("/front/image/getList", p)
};
