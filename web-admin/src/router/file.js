export default [
  {
    path: "/image-manage",
    name: "ImageManage",
    component: () => import("@/views/file/image/ImageManage"),
    meta: {
      root: true,
      title: "图片管理"
    }
  },
  {
    path: "/image-add",
    name: "ImageAdd",
    component: () => import("@/views/file/image/ImageAdd"),
    meta: {
      title: "新增/编辑图片"
    }
  },
  {
    path: "/video-manage",
    name: "VideoManage",
    component: () => import("@/views/file/video/VideoManage"),
    meta: {
      root: true,
      title: "视频管理"
    }
  }
];
