<template>
  <div class="home">
    <div class="content">
      <router-view />
    </div>
    <x-footer></x-footer>
  </div>
</template>

<script>
import XFooter from "@/components/XFooter";
export default {
  name: "home",
  components: {
    XFooter
  }
};
</script>

<style lang="less" scoped>
.home {
  .content {
    padding-bottom: 100px;
  }
}
</style>
