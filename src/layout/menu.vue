<template>
  <div class="menuBox">
    <div class="menuIcon" v-if="!isQK">
      <img src="~@/assets/images/logo.png" alt="" />
      <div class="title">Antdv</div>
    </div>
    <a-spin :spinning="menu.length ? false : true">
      <div class="menu">
        <a-menu
          theme="dark"
          mode="inline"
          :open-keys="openKeys"
          :selected-keys="selectedKeys"
          @openChange="onOpenChange"
        >
          <MenuItem :menu="menu"></MenuItem>
        </a-menu>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import MenuItem from "./menu-item.vue";
import { onBeforeMount, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
// import { useMapState, useMapMutations } from "@/utils/hooks";
const store = useStore();
const props = defineProps({
  menu: {
    type: Array,
    default() {
      return [];
    },
  },
});
const currentRoute = useRoute();
const openKeys = computed(() => store.state.openKeys);
const selectedKeys = computed(() => store.state.selectedKeys);
const isQK = computed(() => store.state.isQK);
onBeforeMount(() => {
  // getPresentKey(currentRoute.path, props.menu, []);
});
const getPresentKey = (path, menuList, open) => {
  menuList.forEach((item) => {
    if (item.path === path) {
      store.dispatch("setTabs", item);
      store.commit("changeValue", { name: "openKeys", value: open });
      store.commit("changeValue", { name: "selectedKeys", value: [item.key] });
      document.title = item.name;
    } else if (item.children && item.children.length) {
      getPresentKey(path, item.children, [...open, item.key]);
    }
  });
};
const onOpenChange = (e) => {
  store.commit("changeValue", {
    name: "openKeys",
    value: e.length ? [e[e.length - 1]] : [],
  });
};
const unwatch = watch(
  () => props.menu,
  () => {
    getPresentKey(currentRoute.path, props.menu, []);
    unwatch();
  }
);
watch(
  () => currentRoute.path,
  (newValue) => {
    // let {openKeys, selectedKeys } = useMapState(['openKeys', 'selectedKeys'])
    // console.log(openKeys, selectedKeys);
    getPresentKey(newValue, props.menu, []);
  }
);
</script>

<style lang="less" scoped>
@height: calc(100vh - 60px);
.menuBox {
  width: 100%;
  height: 100%;
  :deep(.ant-spin-blur){
    opacity: 0;
  }
}
.menu {
  height: @height;
  width: 100%;
  overflow-y: auto;
}
.menuIcon {
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 26px;
  color: #fff;
  padding-left: 24px;
  img {
    height: 32px;
    margin-right: 8px;
  }
}
:deep(.ant-menu-item),
:deep(.ant-menu-submenu-title) {
  border-radius: 0;
  margin: 0;
  width: 100%;
}
.ant-spin-nested-loading {
  height: @height;
}
</style>
