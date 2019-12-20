import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// api
import api from "@/assets/js/api";
Vue.prototype.$api = api;

// vant
import Vant from "vant";
import "vant/lib/index.css";
import "@/assets/css/common.less";
Vue.use(Vant);

import { Lazyload } from "vant";
Vue.use(Lazyload);

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

// custom components
import XList from "@/components/XList";
Vue.component("XList", XList);

store.state.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
