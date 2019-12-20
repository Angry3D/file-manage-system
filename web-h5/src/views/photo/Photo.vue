<template>
  <div class="photo">
    <x-list
      :req-func="$api.getListImage"
      :req-params="params"
      :req-limit="10"
      :on-pushdata="onGetdata"
    >
      <waterfall :col="2" :data="list">
        <template>
          <div
            class="card"
            v-for="(item, index) in list"
            :key="index"
            @click="onClickCard(index)"
          >
            <img
              class="photo"
              :class="{ 'bottom-radius': !item.place && !item.note }"
              :src="item.image_thumb"
            />
            <div class="info-wrap" v-if="item.place || item.note">
              <p class="place vmiddle" v-if="item.place">
                <van-icon name="location" />
                <span>{{ item.place }}</span>
              </p>
              <p class="note vmiddle" v-if="item.note">
                <van-icon name="comment" />
                <span>{{ item.note }}</span>
              </p>
            </div>
          </div>
        </template>
      </waterfall>
    </x-list>
    <van-image-preview
      v-model="preview.show"
      :images="preview.images"
      :start-position="preview.start"
      lazy-load
    >
    </van-image-preview>
  </div>
</template>

<script>
export default {
  name: "photo",
  components: {},
  data() {
    return {
      params: {
        place: "",
        note: ""
      },
      list: [],
      preview: {
        show: false,
        images: [],
        start: 0
      }
    };
  },
  created() {},
  methods: {
    // on event
    onGetdata(data) {
      this.list.push(...data);
    },
    onClickCard(index) {
      this.preview.show = true;
      this.preview.images = [];
      // 取前后固定张数
      const count = 25;
      const start = Math.max(0, index - count);
      const end = Math.min(this.list.length, index + count);
      this.preview.start = Math.max(0, index - start);
      for (let i = start; i < end; ++i) {
        this.preview.images.push(this.list[i].image);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.photo {
  /deep/.vue-waterfall-column {
    box-sizing: border-box;
    padding: 20px 0;
    &:nth-child(2) {
      padding-left: 20px;
      padding-right: 10px;
    }
    &:nth-child(3) {
      padding-right: 20px;
      padding-left: 10px;
    }
  }
  .card {
    border-radius: 20px;
    background-color: #fff;
    // padding: 20px 20px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 18px 3px rgba(0, 0, 0, 0.15);
    .photo {
      width: 100%;
      vertical-align: middle;
      border-radius: 20px 20px 0 0;
      &.bottom-radius {
        border-radius: 20px;
      }
    }
    .info-wrap {
      padding: 20px;
      .place {
        font-size: 26px;
      }
      .note {
        font-size: 26px;
        margin-top: 3px;
      }
      .van-icon {
        margin-right: 5px;
      }
    }
  }
}
</style>
