<template>
  <div class="home">
    <Layout>
      <Header>
        <XHeader></XHeader>
      </Header>
      <Layout>
        <Sider
          v-model="siderCollapse"
          collapsible
          :collapsed-width="0"
          :hide-trigger="true"
        >
          <XSider></XSider>
        </Sider>
        <Content>
          <div class="bread-wrap">
            <Icon
              class="icon-menu"
              :class="{ rotate: siderCollapse }"
              type="md-menu"
              size="20"
              @click.native="onCollapseMenu"
            ></Icon>
            <XBread></XBread>
          </div>
          <div class="content">
            <router-view></router-view>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import XHeader from "@/components/XHeader";
import XSider from "@/components/XSider";
import XBread from "@/components/XBread";
export default {
  name: "home",
  components: {
    XHeader,
    XSider,
    XBread
  },
  data() {
    return {
      siderCollapse: false
    };
  },
  methods: {
    onCollapseMenu() {
      this.siderCollapse = !this.siderCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  min-width: 400px;
  .content {
    padding: 10px;
  }
  .bread-wrap {
    position: relative;
    .icon-menu {
      position: absolute;
      left: 10px;
      top: 8px;
      &.rotate {
        transform: rotate(-90deg);
      }
      transition: 0.2s all ease-out;
    }
    // display: flex;
  }
}
</style>
