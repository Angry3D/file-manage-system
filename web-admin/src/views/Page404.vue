<template>
  <div class="page-404">
    <p class="info1">404</p>
    <p class="info2">Page Not Found</p>
    <Button type="primary" size="large" @click="$router.push({name: 'Home'})">Take Me Home -></Button>
  </div>
</template>

<script>
export default {
  name: "page-404",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
@keyframes hue {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(-360deg);
  }
}

.page-404 {
  width: 700px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .info1 {
    font-size: 60px;
    font-weight: 500;
    color: #f35626;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: hue 2s linear infinite;
  }
  .info2 {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 50px;
  }
}
</style>