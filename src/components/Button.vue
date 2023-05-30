<template>
  <a-button :type="type" :loading="loading" @click="handleClick"
    >{{ text }}
    <template #icon v-if="icon">
      <slot name="icon" />
    </template>
  </a-button>
</template>

<script setup>
// import { reactive, ref, onMounted, watch, computed } from "vue";
const props = defineProps({
  text: {
    type: String,
  },
  type: {
    type: String,
    default: "default",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
  },
  record: {
    type: Object,
    required: true,
    default() {
      return {};
    },
  },
});
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click", props.record);
};
</script>

<style lang="less" scoped>
</style>
