const data = {
  // === params
  // 初始化路由
  initRouter: "ImageManage",
  // 菜单配置
  menuConfig: [
    {
      name: "file",
      icon: "ios-paper",
      label: "文件",
      children: [
        {
          name: "image-manage",
          router: "ImageManage",
          label: "图片管理"
        },
        {
          name: "video-manage",
          router: "VideoManage",
          label: "视频管理"
        }
      ]
    },
    {
      name: "system",
      icon: "ios-construct",
      label: "系统",
      children: [
        {
          name: "account-manage",
          router: "AccountManage",
          label: "帐号管理"
        }
      ]
    }
  ],
  // 每个路由的所属信息：header / sider / siderMenuSet / siderOpenMenu
  routerInfo: {},
  // 每个路由name，对应的路由
  routerNameInfo: {},
  // 每个顶部栏对应的第一个路由
  headerInfo: {}
};

function initRouterInfo() {
  data.menuConfig.forEach(i => {
    const header = i.name;
    let sider = "";
    const siderMenuSet = i.children || [];
    let siderOpenMenu = [];
    i.children &&
      i.children.forEach(ci => {
        if (ci.router) {
          // 如果是侧边路由
          sider = ci.name;
          data.routerInfo[ci.router] = {
            header,
            sider,
            siderMenuSet,
            siderOpenMenu
          };
          data.routerNameInfo[ci.name] = ci.router;
          if (!(i.name in data.headerInfo)) {
            data.headerInfo[i.name] = ci.router;
          }
        } else if (ci.children) {
          // 如果是侧边菜单盒子
          ci.children.forEach(cii => {
            if (!cii.router) return;
            sider = cii.name;
            siderOpenMenu = ci.name;
            data.routerInfo[cii.router] = {
              header,
              sider,
              siderMenuSet,
              siderOpenMenu
            };
            data.routerNameInfo[cii.name] = cii.router;
            if (!(i.name in data.headerInfo)) {
              data.headerInfo[i.name] = cii.router;
            }
          });
        }
      });
  });
}

initRouterInfo();

export default data;
