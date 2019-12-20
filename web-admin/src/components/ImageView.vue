<template>
  <div class="image-view" v-show="show" @click.stop>
    <Icon
      class="icon-close"
      type="md-close"
      size="40"
      color="#bbb"
      @click.stop="onClose"
    />
    <Icon
      class="icon-left"
      type="md-arrow-round-back"
      size="60"
      color="#fff"
      @click.stop="onLeft"
    />
    <img :src="images[curIndex]" />
    <Icon
      class="icon-right"
      type="md-arrow-round-forward"
      size="60"
      color="#fff"
      @click.stop="onRight"
    />
  </div>
</template>

<script>
export default {
  name: "image-view",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default() {
        return [];
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      curIndex: 0
    };
  },
  created() {
    document.onkeydown = e => {
      switch (e.keyCode) {
        case 37: // left
          this.onLeft();
          break;
        case 39: // right
          this.onRight();
          break;
      }
    };
  },
  watch: {
    index: {
      immediate: true,
      handler() {
        this.curIndex = this.index;
      }
    }
  },
  methods: {
    // on event
    onClose() {
      this.$emit("update:show", false);
    },
    onKeyLeft() {
      console.log("keyleft");
    },
    onLeft() {
      if (this.curIndex - 1 == 0) {
        this.$Message.info("已经是第一张了");
      }
      this.curIndex =
        this.curIndex - 1 < 0 ? this.images.length - 1 : this.curIndex - 1;
    },
    onRight() {
      if (this.curIndex + 1 == this.images.length - 1) {
        this.$Message.info("已经是最后一张了");
      }
      this.curIndex =
        this.curIndex + 1 > this.images.length - 1 ? 0 : this.curIndex + 1;
    }
  }
};
</script>

<style lang="less" scoped>
.image-view {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  img {
    max-width: calc(100% - 180px);
    max-height: calc(100% - 40px);
  }
  .icon-close {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .icon-left {
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .icon-right {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
