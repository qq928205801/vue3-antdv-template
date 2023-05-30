<template>
  <a-modal
    v-model:visible="modalVis"
    :title="props.title"
    @ok="handleOk"
    @cancel="closeModel(false)"
    :wrapClassName="wrapClassName"
    :width="width"
    :zIndex="zIndex"
    :okText="okText"
    :cancelText="cancelText"
  >
    <slot name="contet" />
    <template #footer v-if="slots.footer">
      <slot name="footer" />
    </template>
  </a-modal>
</template>

<script setup>
import { computed, useSlots } from "vue";
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  wrapClassName: {
    type: String,
    default: "",
  },
  width: {
    type: String || Number,
  },
  zIndex: {
    type: Number,
  },
  okText: {
    type: String,
    default: "确定",
  },
  cancelText: {
    type: String,
    default: "取消",
  },
  footer: {
    type: Boolean,
    default: false,
  },
});
const slots = useSlots();
const emit = defineEmits(["update:visible", "ok"]);
const modalVis = computed({
  get: () => {
    return props.visible;
  },
  set: (val) => {
    emit("update:visible", val);
  },
});
const handleOk = (val) => {
  emit("ok", val);
};
const closeModel = (val) => {
  emit("update:visible", val);
};
</script>

<style lang="less" scoped>
</style>
