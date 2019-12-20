<template>
  <div class="xheader">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt />
    </div>
    <Menu
      ref="headerMenu"
      mode="horizontal"
      theme="primary"
      :active-name="activeMenu"
      @on-select="onMenuChange"
    >
      <MenuItem
        v-for="(item, index) in MenuInfo.menuConfig"
        :key="index"
        :name="item.name"
      >
        <Icon :type="item.icon"></Icon>
        <span>{{ item.label }}</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
import MenuInfo from "@/assets/js/menu-info";
export default {
  name: "xheader",
  data() {
    return {
      MenuInfo
    };
  },
  computed: {
    activeMenu() {
      this.$nextTick(() => {
        this.$refs.headerMenu.updateOpened();
        this.$refs.headerMenu.updateActiveName();
      });
      return this.$store.state.curMenu.header;
    }
  },
  created() {},
  methods: {
    // on event
    onMenuChange(name) {
      if (name in MenuInfo.headerInfo) {
        this.$router.push({
          name: MenuInfo.headerInfo[name]
        });
      }
    }
    // other
    // request
  }
};
</script>

<style lang="less" scoped>
.xheader {
  height: 100%;
  background-color: #4ab176;
  display: flex;
  .logo {
    width: 200px;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
  }
  .ivu-menu-item {
    position: relative;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
  .ivu-menu-item-active,
  .ivu-menu-item-selected {
    opacity: 1;
    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 2px;
      background-color: #fff;
    }
  }
}
</style>
