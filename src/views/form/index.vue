<template>
  <div class="form">
    <Form
      v-model:model="model"
      :form-item="formItem"
      ref="formRef"
      @validateResult="validateResult"
      :rules="rules"
    >
      <template #button>
        <a-col :span="8" class="btn">
          <a-button type="primary" @click="onSubmit">搜索</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">清空</a-button>
        </a-col>
      </template>
    </Form>
  </div>
</template>
<script setup>
import { reactive, ref, } from "vue";
import moment from "moment";
import Form from "@/components/Form.vue";
const rules = {
  // user: [{ required: true, message: "请输入姓名", trigger: "blur" }],
};
const model = ref({
  user: "",
  sex: undefined,
  date1: undefined,
  org: [],
  level: "",
});
const formRef = ref();
const formItem = reactive([
  {
    type: "input",
    name: "user",
    label: "姓名",
    col: 8,
  },
  {
    type: "select",
    name: "sex",
    label: "性别",
    col: 8,
    options: [
      {
        value: "boy",
        label: "男",
      },
      {
        value: "girl",
        label: "女",
      },
    ],
  },
  {
    type: "datePicker",
    name: "date1",
    label: "时间",
    col: 8,
  },
  {
    type: "checkbox",
    name: "org",
    label: "组织",
    col: 8,
    options: [
      {
        value: "1",
        label: "武汉",
      },
      {
        value: "2",
        label: "上海",
      },
    ],
  },
  {
    type: "radio",
    name: "level",
    label: "级别",
    col: 8,
    options: [
      {
        value: "1",
        label: "老板",
      },
      {
        value: "2",
        label: "员工",
      },
    ],
  },
]);
const onSubmit = () => {
  formRef.value.validate();
};
const validateResult = (e) => {
  console.log(e, moment(new Date).format("YYYY-MM-DD HH:mm:ss") );
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<style lang="less" scoped>
.form {
  background-color: #fff;
  // height: 2000px;
}
.btn {
  text-align: right;
}
</style>

