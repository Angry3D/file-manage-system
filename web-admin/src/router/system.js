export default [
  {
    path: "account-manage",
    name: "AccountManage",
    component: () => import("@/views/system/AccountManage"),
    meta: {
      root: true,
      title: "帐号管理"
    }
  }
];
