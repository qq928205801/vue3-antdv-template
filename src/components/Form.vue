<template>
  <a-form
    :model="formState"
    :rules="props.rules"
    :label-col="props.labelCol"
    ref="formRef"
  >
    <a-row class="bg">
      <a-col
        :span="item.col || 8"
        v-for="(item, index) in props.formItem"
        :key="index"
      >
        <a-form-item :label="item.label" :name="item.name">
          <template v-if="item.type === 'input'">
            <a-input
              v-model:value="formState[item.name]"
              :placeholder="item.placeholder || '请输入'"
              allowClear
              :type="item.typeMode || 'input'"
            />
          </template>
          <template v-else-if="item.type === 'select'">
            <a-select
              v-model:value="formState[item.name]"
              :placeholder="item.placeholder || '请选择'"
              :options="item.options"
              allowClear
            >
            </a-select>
          </template>
          <template v-else-if="item.type === 'datePicker'">
            <a-date-picker
              v-model:value="formState[item.name]"
              show-time
              :type="item.typeMode || 'date'"
              :placeholder="item.placeholder || '请选择'"
              style="width: 100%"
              allowClear
            />
          </template>
          <template v-else-if="item.type === 'checkbox'">
            <a-checkbox-group
              v-model:value="formState[item.name]"
              :options="item.options"
            />
          </template>
          <template v-else-if="item.type === 'radio'">
            <a-radio-group
              v-model:value="formState[item.name]"
              :options="item.options"
            />
          </template>
        </a-form-item>
      </a-col>
      <!-- 插槽 按钮 -->
      <slot name="button" />
    </a-row>
  </a-form>
</template>

<script setup>
import { ref, computed } from "vue";
const formRef = ref();
const props = defineProps({
  formItem: {
    type: Array,
    required: true,
    default() {
      return [];
    },
  },
  model: {
    type: Object,
    required: true,
    default() {
      return {};
    },
  },
  labelCol: {
    type: Object,
    default() {
      return { span: 6 };
    },
  },
  rules: {
    type: Object,
    default() {
      return {};
    },
  },
});

const emit = defineEmits(["update:model", "validateResult"]);
const formState = computed({
  get: () => {
    return props.model;
    // return new Proxy(props.model, {
    //   set(obj, name ,val){
    //     console.log('emit', name, val)
    //     emit("update:model", {...obj,[name]:val});
    //     return true
    //   }
    // })
  },
  set: (val) => {
    emit("update:model", val);
  },
});
const validate = () => {
  formRef.value.validate().then((value) => {
    if (value) {
      emit("validateResult", value);
    }
  });
};
const resetFields = () => {
  formRef.value.resetFields();
};
defineExpose({
  resetFields,
  validate,
});
</script>

<style lang="less" scoped>
.bg {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
