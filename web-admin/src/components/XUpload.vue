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
    :on-error="onError"
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
    setFileFail(file) {
      if (!file) {
        return;
      }
      file.status = "fail";
      delete file.url;
      delete file.urlThumb;
      delete file.urlID;
    },
    onSuccess(res, file) {
      const errno = res && res.errno;
      const errmsg = res && res.errmsg;
      const data = res && res.data;
      switch (errno) {
        case 201:
          this.setFileFail(file);
          this.$Message.error(errmsg);
          return;
        case 202:
          this.setFileFail(file);
          this.$Message.error(errmsg);
          this.$store.commit("setToken", "");
          this.$router.push({
            name: "Login"
          });
          return;
      }
      if (errno !== 0) {
        this.setFileFail(file);
        this.$Message.error(errmsg || "上传失败，请稍后重试");
        return;
      }
      if (!data || !data.url || !data.url_thumb || !data.id) {
        this.setFileFail(file);
        this.$Message.error("上传返回数据不完整，请重试");
        return;
      }
      file.url = data.url;
      file.urlThumb = data.url_thumb;
      file.urlID = data.id;
    },
    onError(err, response, file) {
      this.setFileFail(file);
      this.$Message.error("上传失败，请检查网络后重试");
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
