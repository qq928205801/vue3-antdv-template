<template>
  <div class="headBox">
    <div class="headLeft">
      <!-- <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Application Center</a-breadcrumb-item>
        <a-breadcrumb-item>Application List</a-breadcrumb-item>
        <a-breadcrumb-item>An Application</a-breadcrumb-item>
      </a-breadcrumb> -->
    </div>
    <div class="headRight">
      <div class="userName">{{ store.state.user || "请先登录" }}</div>
      <a-dropdown>
        <img src="https://buqiyuan.gitee.io/img/logo.jpg" class="portrait" />
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="handleMenuClick" class="quit">
              <img src="@/assets/images/quit.png" /> 退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
const store = useStore();
const router = useRouter();
onBeforeMount(() => {
  let user = sessionStorage.getItem("user");
  if (!store.state.user && user) {
    store.commit("changeValue", { name: "user", value: user });
  }
});
const handleMenuClick = () => {
  message.success("退出成功！");
  sessionStorage.clear();
  store.commit("changeValue", { name: "user", value: "" });
  router.replace("/login");
};
</script>

<style lang="less" scoped>
@width: 24px;
.headBox {
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  .headRight {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .userName {
      font-size: 14px;
      color: #000;
    }
    .portrait {
      width: @width;
      height: @width;
      border-radius: 50%;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
:deep(.quit span) {
  display: flex;
  align-items: center;
  img {
    width: 15px;
    height: 16px;
    margin-right: 5px;
  }
}
</style>
