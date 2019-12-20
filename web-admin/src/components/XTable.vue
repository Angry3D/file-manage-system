<template>
  <div class="x-table">
    <Table
      ref="table"
      :columns="columns"
      :data="list"
      :loading="loading"
      stripe
      border
    >
      <template slot-scope="{ row, index }" slot="c1">
        <slot name="c1" :row="row" :index="index"></slot>
      </template>
      <template slot-scope="{ row, index }" slot="c2">
        <slot name="c2" :row="row" :index="index"></slot>
      </template>
      <template slot-scope="{ row, index }" slot="c3">
        <slot name="c3" :row="row" :index="index"></slot>
      </template>
      <template slot-scope="{ row, index }" slot="c4">
        <slot name="c4" :row="row" :index="index"></slot>
      </template>
      <template slot-scope="{ row, index }" slot="c5">
        <slot name="c5" :row="row" :index="index"></slot>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <slot name="action" :row="row" :index="index"></slot>
      </template>
    </Table>
    <div class="pager">
      <div class="pager-left">
        <slot name="footer-left"></slot>
      </div>
      <Page
        class="pager-right"
        show-total
        @on-page-size-change="onPageSizeChange"
        @on-change="onPageChange"
        :total="total"
        :current="page"
        show-elevator
        show-sizer
        transfer
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "x-table",
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    reqFunc: {
      type: Function
    },
    reqParams: {
      type: Object,
      default() {
        return {};
      }
    },
    selection: {
      type: String,
      default: ""
    },
    // function
    formatter: {
      type: Function
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      page: 1,
      limit: 10,
      total: 0
    };
  },
  created() {
    this.requestList();
    this.init();
  },
  methods: {
    // on event
    onPageSizeChange(val) {
      this.limit = val;
      this.requestList();
    },
    onPageChange(val) {
      this.page = val;
      this.requestList();
    },
    // other
    init() {
      if (this.selection) {
        if (this.selection == "multi") {
          this.columns.unshift({
            type: "selection",
            width: 60,
            align: "center"
          });
        }
      }
    },
    search(keepCurPage = true) {
      if (!keepCurPage) {
        this.page = 1;
      }
      this.requestList();
    },
    getSelection() {
      return this.$refs.table.getSelection();
    },
    getList() {
      return this.list;
    },
    // request
    requestList() {
      if (this.loading || !this.reqFunc) {
        return;
      }
      this.loading = true;
      const params = Object.assign(
        {
          page: this.page,
          limit: this.limit
        },
        this.reqParams
      );
      this.reqFunc(params).then(data => {
        this.formatter && this.formatter(data.list);
        this.total = data.total;
        this.list = data.list;
        this.loading = false;
        // 如果不是第1页，并且请求到的数据为空，那么往上一页，重新请求
        if (this.page != 1 && !this.list.length) {
          this.page--;
          this.requestList();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.x-table {
  .pager {
    padding: 15px 0;
    overflow: hidden;
    .pager-left {
      float: left;
    }
    .pager-right {
      float: right;
    }
  }
}
</style>