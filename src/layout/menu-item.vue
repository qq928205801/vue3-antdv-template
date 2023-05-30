<template>
  <template v-for="item in menu" :key="item.key">
    <template v-if="item.children && item.children.length">
      <a-sub-menu :key="item.key" :title="item.name">
        <MenuItem :menu="item.children"></MenuItem>
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="item.key" @click="toRouter(item)">{{
        item.name
      }}</a-menu-item>
    </template>
  </template>
</template>

<script>
export default {
  name: "MenuItem",
};
</script>
<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  menu: {
    type: Array,
    default() {
      return [];
    },
  },
});
const router = useRouter();
const toRouter = (e) => {
  // console.log(e);
  store.dispatch("setTabs", e);
  store.commit("changeValue", { name: "selectedKeys", value: [e.key] });
  router.push(e.path || "/404");
  document.title = e.name;
};
</script>

<style lang="less" scoped>
</style>
