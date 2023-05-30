<template>
  <div class="box">
    <h3>threejs demo</h3>
    <div class="tab">
      <div
        v-for="item in tabs"
        :key="item"
        @click="active = item"
        :class="{ active: active.name === item.name }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="content">
      <component :is="active.comments"></component>
    </div>
  </div>
</template>

<script setup>
import Test from "./test1.vue";
import Test2 from "./test2.vue";
import { ref, reactive } from "vue";
const tabs = reactive([
  {
    name: "测试1",
    comments: Test,
  },
  {
    name: "测试2",
    comments: Test2,
  },
]);
const active = ref(tabs[1]);
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
  }
}
.tab {
  display: flex;
  font-size: 16px;
  padding-bottom: 10px;
  > div {
    padding: 0 10px;
    cursor: pointer;
    color: #333;
  }
  .active {
    color: #1890ff;
  }
}
</style>
