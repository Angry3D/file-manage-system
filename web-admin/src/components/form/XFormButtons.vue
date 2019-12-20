<template>
  <FormItem class="x-form-buttons search-form-btns">
    <Button icon="md-search" @click="$emit('onSearch')">搜索</Button>
    <Button icon="md-refresh" @click="$emit('onReset')">重置</Button>
  </FormItem>
</template>

<script>
export default {
  name: "x-form-buttons",
  data() {
    return {};
  },
  created() {},
  methods: {
    // on event
  }
};
</script>

<style lang="less" scoped>
</style>