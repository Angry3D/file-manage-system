<template>
  <Select class="form-item" v-model="data" clearable>
    <Option v-for="item in list" :value="item.key" :key="item.key">{{item.value}}</Option>
  </Select>
</template>

<script>
export default {
  name: "xselect",
  props: {
    list: {
      default() {
        return [];
      }
    },
    value: {
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
    // other
    setData() {
      this.data = this.value;
    }
  }
};
</script>

<style lang="less" scoped>
</style>