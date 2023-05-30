<template>
  <div class="appBox">
    <div class="appLeft">
      <Menu :menu="menu"></Menu>
    </div>
    <div class="appRight">
      <div class="appHead">
        <Head v-if="!isQK"></Head>
        <Tabs></Tabs>
      </div>
      <div class="appContents">
        <div class="appContent">
          <a-spin :spinning="menu.length ? false : true"> </a-spin>
          <router-view v-show="menu.length" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Head from "./head.vue";
import Menu from "./menu.vue";
import Tabs from "./tabs.vue";
import service from "@/utils/requset";
import { useStore } from "vuex";
const store = useStore();
const menu = ref([]);
const isQK = computed(() => store.state.isQK);
const contentH = computed(() => (store.state.isQK ? "50px" : "110px"));
onMounted(() => {
  getMenu();
});
const getMenu = () => {
  service({ url: "/get/menu", method: "get" }).then((res) => {
    if (res.code === 200) {
      menu.value = res.data;
      store.commit("changeValue", { name: "menu", value: res.data });
    }
  });
};
</script>

<style lang="less" scoped>
.appBox {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  display: flex;
  .appLeft {
    width: 220px;
    height: 100%;
    background-color: rgb(0, 21, 41);
  }
  .appRight {
    width: calc(100% - 220px);
    height: 100%;
    display: flex;
    flex-direction: column;
    .appHead {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .appContents {
      width: 100%;
      height: calc(100% - v-bind(contentH));
      box-sizing: border-box;
      padding: 20px 0 20px 20px;
      :deep(.ant-spin) {
        width: 100%;
        padding-top: 30%;
      }
      .appContent {
        height: 100%;
        overflow-y: auto;
        width: 100%;
      }
    }
  }
}
</style>
