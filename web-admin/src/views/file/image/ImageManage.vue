<template>
  <div class="image-list">
    <Form :model="params" inline :label-width="70">
      <FormItem label="创建时间">
        <x-daterangePicker
          ref="formCreateTime"
          :start.sync="params.create_time_start"
          :end.sync="params.create_time_end"
        ></x-daterangePicker>
      </FormItem>
      <FormItem label="显示状态">
        <x-select :value.sync="params.status" :list="showStatuses"></x-select>
      </FormItem>
    </Form>
    <Form :model="params" inline :label-width="70">
      <FormItem label="地点名称">
        <x-input
          :value.sync="params.place"
          placeholder="请输入地点"
          @onSearch="onSearch"
        ></x-input>
      </FormItem>
      <FormItem label="备注名称">
        <x-input
          :value.sync="params.note"
          placeholder="请输入备注"
          @onSearch="onSearch"
        ></x-input>
      </FormItem>
      <x-formButtons @onSearch="onSearch" @onReset="onReset"></x-formButtons>
    </Form>
    <div>
      <Button type="primary" @click="onAdd">新增图片</Button>
    </div>
    <div class="table-wrapper">
      <x-table
        ref="table"
        :columns="columns"
        :req-params="params"
        :req-func="$api.getListImage"
        :formatter="onFormatter"
        selection="multi"
      >
        <template slot-scope="{ row }" slot="c1">
          <img
            :src="row.image_thumb"
            style="max-height:100px; max-width:250px; margin:5px 0;"
            @click="onImageView(row)"
          />
        </template>
        <div slot="footer-left" class="table-action">
          <Button size="small" @click="onStatus('select', 2)">隐藏</Button>
          <Button size="small" @click="onStatus('select', 1)">展示</Button>
          <Button type="primary" size="small" @click="onEdit('select')"
            >编辑</Button
          >

          <Button type="primary" size="small" @click="onDelete('select')"
            >删除</Button
          >
        </div>
        <div slot-scope="{ row }" slot="action">
          <Button
            type="text"
            size="small"
            @click="onStatus(row, row.status == 1 ? 2 : 1)"
            >{{ row.status == 1 ? "隐藏" : "展示" }}</Button
          >
          <span>-</span>
          <Button type="text" size="small" @click="onEdit(row)">编辑</Button>
          <span>-</span>
          <Button type="text" size="small" @click="onDelete(row)">删除</Button>
        </div>
      </x-table>
    </div>
    <image-view
      :show.sync="viewModal.show"
      :images="viewModal.images"
      :index="viewModal.index"
    ></image-view>
    <Modal v-model="editModal.show" title="批量编辑" @on-ok="onEditModalOk">
      <p style="color:red; margin-bottom:10px;">
        注意：此模式会覆盖所有状态，例如不填“地点”，那么所有“地点”都会被清空
      </p>
      <Form :model="editModal.form" :label-width="90">
        <FormItem label="显示状态：">
          <RadioGroup v-model="editModal.form.status">
            <Radio label="1">展示</Radio>
            <Radio label="2">隐藏</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="地点：">
          <x-input
            :value.sync="editModal.form.place"
            placeholder="请输入地点"
          ></x-input>
        </FormItem>
        <FormItem label="备注：">
          <x-input
            :value.sync="editModal.form.note"
            placeholder="请输入备注"
          ></x-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { ShowStatus } from "@/assets/js/enums";
import ImageView from "@/components/ImageView";
export default {
  name: "image-list",
  components: {
    ImageView
  },
  data() {
    return {
      params: {
        status: "",
        created_time_start: "",
        created_time_end: "",
        place: "",
        note: ""
      },
      showStatuses: ShowStatus.getOptions(),
      columns: [
        { title: "照片", slot: "c1", align: "center", minWidth: 250 },
        {
          title: "显示状态",
          key: "statusName",
          align: "center",
          minWidth: 100
        },
        {
          title: "创建时间",
          key: "created_time",
          align: "center",
          minWidth: 170
        },
        { title: "地点", key: "place", align: "center", minWidth: 170 },
        { title: "备注", key: "note", align: "center", minWidth: 200 },
        {
          title: "操作",
          slot: "action",
          align: "center",
          fixed: "right",
          minWidth: 150
        }
      ],
      viewModal: {
        show: false,
        images: [],
        index: 0
      },
      editModal: {
        show: false,
        form: {
          ids: "",
          status: "1",
          place: "",
          note: ""
        }
      }
    };
  },
  created() {},
  methods: {
    // on event
    onSearch() {
      this.$refs.table.search(false);
    },
    onReset() {
      this.$refs.formCreateTime.clear();
      this.$tool.clearObj(this.params);
      this.onSearch();
    },
    onAdd() {
      this.$router.push({
        name: "ImageAdd"
      });
    },
    onFormatter(rows) {
      rows.forEach(i => {
        i.statusName = ShowStatus.getValue(i.status);
      });
    },
    onImageView(row) {
      this.viewModal.show = true;
      this.viewModal.images = [];
      this.$refs.table.getList().forEach((i, index) => {
        this.viewModal.images.push(i.image);
        if (i.id == row.id) {
          this.viewModal.index = index;
        }
      });
    },
    onStatus(row, status) {
      let ids = "";
      if (row === "select") {
        const selection = this.$refs.table.getSelection();
        const idsAry = [];
        selection.forEach(i => {
          idsAry.push(i.id);
        });
        ids = idsAry.join();
      } else {
        ids = row.id + "";
      }
      if (ids) {
        this.$api
          .statusImage({
            ids,
            status
          })
          .then(() => {
            this.$Message.success("操作成功");
            this.$refs.table.search();
          });
      } else {
        this.$Message.info("请先选择要操作的项");
      }
    },
    onEdit(row) {
      if (row === "select") {
        let ids = "";
        const selection = this.$refs.table.getSelection();
        const idsAry = [];
        selection.forEach(i => {
          idsAry.push(i.id);
        });
        ids = idsAry.join();
        if (!ids) {
          this.$Message.info("请先选择要操作的项");
          return;
        }
        this.editModal.show = true;
        this.editModal.form = {
          ids: ids,
          status: "1",
          place: "",
          note: ""
        };
      } else {
        this.$router.push({
          name: "ImageAdd",
          query: {
            id: row.id
          }
        });
      }
    },
    onEditModalOk() {
      this.$api.setBatchImage(this.editModal.form).then(data => {
        console.log(data);
        this.editModal.show = false;
        this.$refs.table.search();
        this.$Message.success("操作成功");
      });
    },
    onDelete(row) {
      let ids = "";
      if (row === "select") {
        const selection = this.$refs.table.getSelection();
        const idsAry = [];
        selection.forEach(i => {
          idsAry.push(i.id);
        });
        ids = idsAry.join();
      } else {
        ids = row.id + "";
      }
      if (ids) {
        this.$Modal.confirm({
          title: "提示",
          content: "是否删除指定数据？",
          onOk: () => {
            this.$api
              .deleteImage({
                ids
              })
              .then(() => {
                this.$Message.success("操作成功");
                this.$refs.table.search();
              });
          }
        });
      } else {
        this.$Message.info("请先选择要操作的项");
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
