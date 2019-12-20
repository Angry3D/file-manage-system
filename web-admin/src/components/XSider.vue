<template>
  <div class="xsider">
    <Menu
      ref="siderMenu"
      :active-name="activeMenu"
      :open-names="openMenu"
      accordion
      @on-select="onMenuChange"
    >
      <div v-for="(item, index) in menuSet" :key="index">
        <Submenu v-if="item.children" :name="item.name">
          <template slot="title">
            <Icon v-if="item.icon" :type="item.icon"></Icon>
            <span>{{ item.label }}</span>
          </template>
          <MenuItem
            v-for="(item, index) in item.children"
            :key="index"
            :name="item.name"
          >
            <Icon v-if="item.icon" :type="item.icon"></Icon>
            <span>{{ item.label }}</span>
          </MenuItem>
        </Submenu>
        <MenuItem v-else :name="item.name">
          <Icon v-if="item.icon" :type="item.icon"></Icon>
          <span>{{ item.label }}</span>
        </MenuItem>
      </div>
    </Menu>
  </div>
</template>

<script>
import MeueInfo from "@/assets/js/menu-info";
export default {
  name: "xsider",
  data() {
    return {};
  },
  computed: {
    activeMenu() {
      this.$nextTick(() => {
        this.$refs.siderMenu.updateOpened();
        this.$refs.siderMenu.updateActiveName();
      });
      return this.$store.state.curMenu.sider;
    },
    openMenu() {
      return this.$store.state.curMenu.siderOpenMenu;
    },
    menuSet() {
      return this.$store.state.curMenu.siderMenuSet;
    }
  },
  created() {},
  methods: {
    // on event
    onMenuChange(name) {
      this.$router.push({
        name: MeueInfo.routerNameInfo[name]
      });
    }
    // other
    // request
  }
};
</script>

<style lang="less" scoped>
.xsider {
  height: 100%;
  min-height: 100vh;
  background-color: #fff;
  border-right: 1px solid #dcdee2;
  .ivu-menu {
    max-width: 200px;
    width: auto !important;
    overflow: hidden;
    .ivu-menu-item {
      white-space: nowrap;
    }
  }
  .ivu-menu-vertical.ivu-menu-light:after {
    display: none;
  }
}
/deep/ .ivu-menu-submenu-title,
/deep/ .ivu-menu-item {
  text-align: left;
}
</style>
