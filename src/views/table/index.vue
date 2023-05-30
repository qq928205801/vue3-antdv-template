<template>
  <div class="table">
    <Table
      :data="dataSource"
      :columns="columns"
      :pagination="pagination"
      @change="change"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Table from "@/components/Table.vue";
const dataSource = ref([
  {
    key: 1,
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: 2,
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
]);
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 35,
});
const opneUpdata = (e) => {
  console.log(e);
};
const columns = [
  {
    title: "序号",
    width: "80px",
    dataIndex: "index",
    slots: "index",
  },
  {
    title: "key",
    dataIndex: "key",
    slots: "key",
  },
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
  },
  {
    title: "操作",
    width: "100px",
    slots: "operation",
    operations: [
      {
        text: "修改",
        clickEvent: opneUpdata,
      },
    ],
  },
];
const change = (page) => {
  console.log(page);
  pagination.value = page
};
</script>

<style lang="less" scoped>
.table {
  background-color: #fff;
  padding: 20px;
}
</style>
