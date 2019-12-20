<template>
  <div id="app">
    <router-view />
    <van-loading class="x-loading" v-show="$store.state.loading" color="#1989fa" size="60px" />
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .x-loading {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
}
</style>
