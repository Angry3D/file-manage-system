<template>
  <DatePicker
    ref="self"
    class="xdaterange-picker form-item-datetime"
    type="datetimerange"
    placeholder="开始日期 --- 结束日期"
    :editable="false"
    clearable
    @on-change="onChange"
    :value="date"
  ></DatePicker>
</template>

<script>
export default {
  name: "xdaterange-picker",
  props: {
    start: {
      default: ""
    },
    end: {
      default: ""
    }
  },
  data() {
    return {
      date: ["", ""]
    };
  },
  created() {
    this.setDate();
  },
  watch: {
    start() {
      this.setDate();
    },
    end() {
      this.setDate();
    }
  },
  methods: {
    // call
    clear() {
      this.$refs.self.handleClear();
    },
    // on event
    onChange(val) {
      this.$emit("update:start", val[0] ? new Date(val[0]).getTime() : "");
      this.$emit("update:end", val[1] ? new Date(val[1]).getTime() : "");
    },
    // other
    setDate() {
      this.date[0] = this.start
        ? this.$moment(this.start).format("YYYY-MM-DD HH:mm:ss")
        : "";
      this.date[1] = this.end
        ? this.$moment(this.end).format("YYYY-MM-DD HH:mm:ss")
        : "";
    }
  }
};
</script>

<style lang="less" scoped>
</style>