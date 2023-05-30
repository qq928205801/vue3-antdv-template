<template>
  <div class="box">子组件：{{ porps.porps ? porps.value : value }}</div>
</template>

<script setup>
import { inject } from "vue";
const value = inject("value");
const porps = defineProps({
  value: {
    type: String,
  },
  porps: {
    type: Boolean,
  },
});
</script>

<style lang="less" scoped>
.box {
  padding: 20px;
  border: 1px solid;
}
</style>
