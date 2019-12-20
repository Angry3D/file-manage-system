<template>
  <Upload
    class="upload"
    ref="upload"
    :action="actionUrl"
    :headers="headers"
    multiple
    :before-upload="onBeforeUpload"
    :on-format-error="onFormatError"
    :on-success="onSuccess"
    :show-upload-list="false"
    :default-file-list="defaultList"
    :format="format"
  >
    <slot name="item"></slot>
  </Upload>
</template>

<script>
import env from "@/assets/js/env";
export default {
  name: "x-upload",
  props: {
    url: {
      type: String,
      default: ""
    },
    format: {
      type: Array,
      default() {
        return [];
      }
    },
    countMode: {
      // 数量模式 multi:多个  single:单个
      type: String,
      default: "multi"
    },
    defaultList: {
      // 默认已传图片
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      actionUrl: env.API_BASE_URL + this.url,
      headers: this.$store.state.header,
      formatErrTips: ""
    };
  },
  created() {
    // init format error tips
    this.formatErrTips =
      "格式不支持，只能是 " + this.format.join() + " 中的一个";
  },
  mounted() {},
  methods: {
    // on event
    async onBeforeUpload() {
      if (this.countMode == "single") {
        this.$refs.upload.fileList = [];
      }
    },
    onFormatError(file) {
      this.$Message.error({
        content: file.name + this.formatErrTips,
        duration: 3
      });
    },
    onSuccess(res, file) {
      switch (res.errno) {
        case 201:
          this.$Message.error(res.errmsg);
          return;
        case 202:
          this.$Message.error(res.errmsg);
          this.$store.commit("setToken", "");
          this.$router.push({
            name: "Login"
          });
          return;
      }
      file.url = res.data.url;
      file.urlThumb = res.data.url_thumb;
      file.urlID = res.data.id;
    },
    // other
    getList() {
      return this.$refs.upload.fileList;
    },
    getUpload() {
      return this.$refs.upload;
    }
  }
};
</script>

<style lang="less" scoped>
.upload {
  display: inline-block;
}
</style>
