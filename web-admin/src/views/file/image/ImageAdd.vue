<template>
  <div class="image-add">
    <Form ref="modalForm" :model="form" :rules="rules" :label-width="90">
      <FormItem label="图片：">
        <div
          class="upload-list-item"
          v-for="(item, index) in imageList"
          :key="index"
        >
          <template v-if="item.status === 'finished'">
            <img :src="item.urlThumb" />
            <div class="upload-list-item-cover">
              <Icon
                type="ios-eye-outline"
                @click.native="onViewImage(item)"
              ></Icon>
              <Icon
                type="ios-trash-outline"
                @click.native="onDeleteImage(item)"
              ></Icon>
            </div>
          </template>
          <template v-else>
            <Progress
              v-if="item.showProgress"
              :percent="item.percentage"
              hide-info
            ></Progress>
          </template>
        </div>
        <x-upload
          v-if="mode == 'add'"
          ref="upload"
          url="common/upload/image"
          :format="['jpg', 'jpeg', 'png', 'gif']"
        >
          <Button type="primary" slot="item">新增图片</Button>
        </x-upload>
        <x-upload
          v-else-if="mode == 'edit'"
          ref="upload"
          url="common/upload/image"
          :format="['jpg', 'jpeg', 'png', 'gif']"
          :default-list="editDefaultImage"
          count-mode="single"
        >
          <Button type="primary" slot="item">替换图片</Button>
        </x-upload>
      </FormItem>
      <FormItem label="上传进度：">
        {{ uploadedCount }} / {{ uploadTotalCount }}
      </FormItem>
      <FormItem label="显示状态：">
        <RadioGroup v-model="form.status">
          <Radio label="1">展示</Radio>
          <Radio label="2">隐藏</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="地点：">
        <x-input :value.sync="form.place" placeholder="请输入地点"></x-input>
      </FormItem>
      <FormItem label="备注：">
        <x-input :value.sync="form.note" placeholder="请输入备注"></x-input>
      </FormItem>
      <FormItem>
        <Button style="margin-right:15px;" @click="$router.back()">返回</Button>
        <Button type="primary" @click="onOk" :loading="okBtnLoading">确定</Button>
      </FormItem>
    </Form>
    <image-view
      :show.sync="viewModal.show"
      :images="viewModal.images"
      :index="viewModal.index"
    ></image-view>
  </div>
</template>

<script>
import ImageView from "@/components/ImageView";
export default {
  name: "image-add",
  components: {
    ImageView
  },
  data() {
    return {
      id: this.$route.query.id, // 编辑模式的条目ID
      mode: "add", // 默认为 add 模式，有 id 传入则为 edit 模式
      form: {
        place: "",
        note: "",
        status: "1"
      },
      editForm: {
        id: ""
      },
      editDefaultImage: [],
      rules: {},
      uploader: null,
      viewModal: {
        show: false,
        images: [],
        index: 0
      },
      okBtnLoading: false
    };
  },
  computed: {
    imageList() {
      if (this.uploader) {
        return this.uploader.getList();
      }
      return [];
    },
    uploadedCount() {
      if (this.uploader) {
        let ret = 0;
        this.imageList.forEach(i => {
          if (i.status === "finished") {
            ++ret;
          }
        });
        return ret;
      }
      return 0;
    },
    uploadTotalCount() {
      if (this.uploader) {
        return this.imageList.length;
      }
      return 0;
    }
  },
  async created() {
    if (this.id) {
      const data = await this.$api.getImage({ id: this.id });
      this.form.place = data.place;
      this.form.note = data.note;
      this.form.status = data.status + "";
      this.editForm.id = data.id;
      this.editDefaultImage.push({
        url: data.image,
        urlThumb: data.image_thumb,
        urlID: data.image_id
      });
      this.mode = "edit";
    }
  },
  mounted() {
    this.uploader = this.$refs.upload;
  },
  methods: {
    // on event
    onViewImage(item) {
      console.log(item)
      this.viewModal.show = true;
      this.viewModal.images = [];
      this.uploader && this.uploader.getList().forEach((i, index) => {
        this.viewModal.images.push(i.url);
        if (i.uid == item.uid) {
          this.viewModal.index = index;
        }
      })
    },
    onDeleteImage(item) {
      const list = this.uploader.getList();
      list.splice(list.indexOf(item), 1);
    },
    onOk() {
      if (!this.uploadTotalCount) {
        this.$Message.error("请先添加图片");
        return;
      }
      if (this.uploadedCount != this.uploadTotalCount) {
        this.$Message.error("图片还未上传完，请稍等");
        return;
      }
      const images = [];
      this.uploader.getList().forEach(i => {
        // console.log(i);
        images.push({
          url: i.url,
          url_thumb: i.urlThumb,
          id: i.urlID
        });
      });
      if (this.mode == "add") {
        const params = Object.assign({ images }, this.form);
        this.okBtnLoading = true;
        this.$api.addImage(params).then(() => {
          this.$Message.success("添加成功");
          setTimeout(() => {
            this.$router.back();
          }, 300);
        });
      } else if (this.mode == "edit") {
        if (!images.length) {
          this.$$Message.error("请先添加一张图片");
          return;
        }
        this.okBtnLoading = true;
        this.$api
          .setImage({
            id: this.editForm.id,
            image: images[0].url,
            image_thumb: images[0].urlThumb,
            status: this.form.status,
            place: this.form.place,
            note: this.form.note
          })
          .then(() => {
            this.$Message.success("编辑成功");
            setTimeout(() => {
              this.$router.back();
            }, 300);
          });
      }
    }
    // other
  }
};
</script>

<style lang="less" scoped>
.image-add {
  .upload-list-item {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    margin-bottom: 10px;
    height: 120px;
    position: relative;
    img {
      height: 100%;
    }
    .upload-list-item-cover {
      // display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: all 0.1s ease-in;
      i {
        color: #fff;
        font-size: 40px;
        cursor: pointer;
        // margin: 0 2px;
        vertical-align: middle;
      }
    }
    &:hover .upload-list-item-cover {
      opacity: 1;
    }
  }
}
</style>
