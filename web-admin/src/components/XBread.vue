<template>
  <div class="xbread">
    <Breadcrumb separator=">">
      <BreadcrumbItem
        v-for="(item, index) in bread"
        :key="index"
        :to="
          item.routeName
            ? { name: item.routeName, query: item.query, params: item.params }
            : ''
        "
        >{{ item.title }}</BreadcrumbItem
      >
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  name: "xbread",
  computed: {
    bread() {
      return this.$store.state.breads;
    }
  }
};
</script>

<style lang="less" scoped>
.xbread {
  height: 35px;
  border-bottom: 1px solid #dcdee2;
  text-align: left;
  display: flex;
  align-items: center;
  padding-left: 40px;
  white-space: nowrap;
}
</style>
