<template>
  <van-tabbar class="x-footer" v-model="curTab" :z-index="999" route>
    <van-tabbar-item name="photo" icon="photo" :to="{ name: 'Photo' }"
      >照片</van-tabbar-item
    >
    <van-tabbar-item name="video" icon="video" :to="{ name: 'Video' }"
      >视频</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
export default {
  name: "x-footer",
  data() {
    return {
      curTab: "photo"
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.x-footer {
  height: 90px;
  &::after {
    border-color: #ddd;
  }
  /deep/ .van-tabbar-item__text {
    font-size: 22px !important;
  }
  /deep/ .van-tabbar-item__icon {
    font-size: 38px !important;
  }
}
</style>
