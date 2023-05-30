<template>
  <div class="box">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="Activity name" name="name">
        <a-input v-model:value="formState.name" v-focus/>
      </a-form-item>
      <a-form-item label="Activity zone" name="region">
        <a-select
          v-model:value="formState.region"
          placeholder="please select your zone"
        >
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Activity time" required name="date1">
        <a-date-picker
          v-model:value="formState.date1"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="Instant delivery" name="delivery">
        <a-switch v-model:checked="formState.delivery" />
      </a-form-item>
      <a-form-item label="Activity type" name="type">
        <a-checkbox-group v-model:value="formState.type">
          <a-checkbox value="1" name="type">Online</a-checkbox>
          <a-checkbox value="2" name="type">Promotion</a-checkbox>
          <a-checkbox value="3" name="type">Offline</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="Activity form" name="desc">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
// import { useRoute } from "vue-router";
// import { Moment } from "moment";
const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const formRef = ref();
// const route = useRoute();
const formState = reactive({
  name: "",
  region: undefined,
  date1: null,
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
const rules = {
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" },
  ],
};
onMounted(() => {
  // console.log(route.query);
});
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log("values", formState);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
const resetForm = () => {
  console.log(formRef.value);
  formRef.value.resetFields();
};
</script>

<style lang="less" scoped>
.box {
  background-color: #fff;
  padding: 20px;
}
</style>
