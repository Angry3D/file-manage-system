import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

Vue.config.productionTip = false;

// api
import api from "@/assets/js/api";
Vue.prototype.$api = api;

// tool
import Tool from "@/assets/js/tool";
Vue.prototype.$tool = Tool;

// iview
import ViewUI from "view-design";
import "@/assets/css/common.less";
Vue.use(ViewUI);

// moment
import Moment from "moment";
Vue.prototype.$moment = Moment;

// self form components
import XDaterangePicker from "@/components/form/XDaterangePicker";
Vue.component("XDaterangePicker", XDaterangePicker);
import XSelect from "@/components/form/XSelect";
Vue.component("XSelect", XSelect);
import XInput from "@/components/form/XInput";
Vue.component("XInput", XInput);
import XFormButtons from "@/components/form/XFormButtons";
Vue.component("XFormButtons", XFormButtons);
import XUpload from "@/components/XUpload";
Vue.component("XUpload", XUpload);
import XTable from "@/components/XTable";
Vue.component("XTable", XTable);

// 导航守卫
import MenuInfo from "@/assets/js/menu-info";
const OriginDocTitle = document.title;
router.beforeEach((to, from, next) => {
  // next
  if (to.name != "Login" && !store.state.header.token) {
    next({
      name: "Login"
    });
  } else {
    next();
  }
  // 设置顶栏、侧边栏显示
  if (to.name in MenuInfo.routerInfo) {
    const obj = MenuInfo.routerInfo[to.name];
    store.commit("changeCurMenuHeader", obj.header);
    store.commit("changeCurMenuSider", obj.sider);
    store.commit("changeCurMenuSiderSet", obj.siderMenuSet);
    store.commit("changeCurMenuOpen", obj.siderOpenMenu);
  }
  // set title
  document.title = to.meta.title
    ? OriginDocTitle + " - " + to.meta.title
    : OriginDocTitle;
  // set breads
  store.commit("setBreads", to);
});

store.state.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
