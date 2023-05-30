<template>
  <div class="box">
    <p>v-bind动态传递样式</p>
    <a-input v-model:value="value" allowClear />
    <div class="changeColor"></div>
    <div class="changeColor" :style="{backgroundColor: value}"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref("#000");
</script>

<style lang="less" scoped>
.box {
  background-color: #fff;
  padding: 20px;
  p {
  }
  .changeColor {
    width: 100px;
    height: 100px;
    background-color: v-bind(value);
    border: 1px solid;
  }
}
</style>
