import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 当前菜单
    curMenu: {
      header: sessionStorage.header || "",
      sider: sessionStorage.sider || "",
      siderMenuSet: sessionStorage.siderMenuSet
        ? JSON.parse(sessionStorage.siderMenuSet)
        : [],
      siderOpenMenu: sessionStorage.siderOpenMenu
        ? JSON.parse(sessionStorage.siderOpenMenu)
        : []
    },
    // 根实例
    vue: null,
    // 网络请求header
    header: {
      token: localStorage.adminToken || ""
    },
    // 面包屑集合
    breads: sessionStorage.breads ? JSON.parse(sessionStorage.breads) : []
  },
  mutations: {
    changeCurMenuHeader(state, header) {
      state.curMenu.header = header;
      sessionStorage.setItem("header", header);
    },
    changeCurMenuSider(state, sider) {
      state.curMenu.sider = sider;
      sessionStorage.setItem("sider", sider);
    },
    changeCurMenuSiderSet(state, set) {
      state.curMenu.siderMenuSet = set;
      sessionStorage.setItem("sider-menu-set", JSON.stringify(set));
    },
    changeCurMenuOpen(state, open) {
      state.curMenu.siderOpenMenu = open;
      sessionStorage.setItem("sider-open-menu", JSON.stringify(open));
    },
    setToken(state, token) {
      state.header.token = token;
      localStorage.adminToken = token;
    },
    setBreads(state, route) {
      const bread = {
        title: route.meta.title,
        routeName: route.name,
        query: route.query,
        params: route.params
      };
      if (route.meta.root) {
        state.breads = [bread];
      } else {
        // 如果在面包屑链中，直接跳至该面包屑
        let existBread = false;
        for (let i = 0; i < state.breads.length; ++i) {
          if (state.breads[i].routeName == bread.routeName) {
            existBread = true;
            state.breads.splice(i + 1);
            break;
          }
        }
        if (!existBread) {
          state.breads.push(bread);
        }
      }
      sessionStorage.breads = JSON.stringify(state.breads);
    }
  },
  actions: {}
});
