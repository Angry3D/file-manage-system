<template>
  <Input
    class="form-item"
    v-model="data"
    :placeholder="placeholder"
    clearable
    @keydown.native.prevent.enter="onSearch"
  />
</template>

<script>
export default {
  name: "xinput",
  props: {
    value: {
      default: ""
    },
    placeholder: {
      default: ""
    }
  },
  data() {
    return {
      data: ""
    };
  },
  watch: {
    data(val) {
      this.$emit("update:value", val);
    },
    value() {
      this.setData();
    }
  },
  created() {
    this.setData();
  },
  methods: {
    // on event
    onSearch() {
      this.$emit("onSearch");
    },
    // other
    setData() {
      this.data = this.value;
    }
  }
};
</script>

<style lang="less" scoped>
</style>