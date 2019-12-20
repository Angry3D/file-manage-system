import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: { name: "Photo" },
    children: [
      {
        path: "/photo",
        name: "Photo",
        component: () => import("../views/photo/Photo")
      },
      {
        path: "/video",
        name: "Video",
        component: () => import("../views/video/Video")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
