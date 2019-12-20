import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import MenuInfo from "@/assets/js/menu-info";

Vue.use(Router);

// routers
import FileRouters from "./file";
import SystemRouters from "./system";

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      redirect: { name: MenuInfo.initRouter },
      children: [...FileRouters, ...SystemRouters]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login"),
      meta: {
        root: true,
        title: "登陆"
      }
    },
    {
      path: "*",
      component: () => import("@/views/Page404"),
      meta: {
        root: true,
        title: "404"
      }
    }
  ]
});
