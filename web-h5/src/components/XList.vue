<template>
  <van-list
    class="x-list"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <slot></slot>
  </van-list>
</template>

<script>
export default {
  name: "x-list",
  props: {
    reqFunc: {
      type: Function
    },
    reqParams: {
      type: Object,
      default() {
        return {};
      }
    },
    reqLimit: {
      type: Number,
      defautl: 0
    },
    onFormatter: {
      type: Function
    },
    onGetdata: {
      type: Function
    },
    onPushdata: {
      type: Function
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 0,
      limit: 10,
      list: []
    };
  },
  created() {},
  methods: {
    // on event
    onLoad() {
      this.page++;
      this.requestList();
    },
    // other
    reset() {
      this.onGetdata([]);
      // finished 必须经过 true => false 的过程，list才会重新触发onLoad
      this.finished = true;
      this.$nextTick(() => {
        this.page = 0;
        this.finished = false;
      });
    },
    // request
    requestList() {
      if (!this.reqFunc) return;
      const obj = {
        page: this.page,
        limit: this.reqLimit || this.limit,
        ...this.reqParams
      };
      this.reqFunc(obj).then(data => {
        this.loading = false;
        this.onFormatter && this.onFormatter(data.list);
        if (this.page == 1) {
          this.list = data.list;
          this.onPushdata && this.onPushdata(data.list);
        } else {
          this.list = this.list.concat(data.list);
          this.onPushdata && this.onPushdata(data.list);
        }
        this.onGetdata && this.onGetdata(this.list);
        // 判断是否完成
        if ((this.page - 1) * this.limit + data.list.length >= data.total) {
          this.finished = true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
