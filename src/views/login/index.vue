<template>
  <div class="loginBox">
    <div class="login">
      <div class="title">Antd Admin</div>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        @keyup.enter="toLogin"
      >
        <a-form-item label="账号" name="user">
          <a-input v-model:value="formState.user" v-focus/>
        </a-form-item>
        <a-form-item label="密码" name="pwd">
          <a-input v-model:value="formState.pwd" type="password" />
        </a-form-item>
        <a-form-item :wrapperCol="{ offset: 10 }">
          <a-space size="small">
            <a-button
              type="primary"
              v-debounce-click="toLogin"
              :loading="formState.loading"
            >
              登录
            </a-button>
            <a-button @click="reset" :loading="formState.loading">
              重置
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import service from "@/utils/requset";
const store = useStore();
const labelCol = { span: 6 };
const rules = {
  user: [{ required: true, message: "请输入账号", trigger: "blur" }],
  pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const formRef = ref();
const router = useRouter();
const formState = reactive({
  user: "admin",
  pwd: "123456",
  loading: false,
});
onMounted(() => {
  // console.log('onMounted')
});
const toLogin = () => {
  formRef.value.validate().then(() => {
    if (formState.user && formState.pwd) {
      formState.loading = true;
      service({ url: "/user/login", method: "post", data: formState }).then(
        (res) => {
          if (res.code === 200) {
            formState.loading = false;
            message.success("登录成功！");
            store.commit("changeValue", {
              name: "user",
              value: formState.user,
            });
            sessionStorage.setItem("user", formState.user);
            let path = sessionStorage.getItem("fromPath") || "/";
            console.log(path);
            router.replace({
              path: path,
              // query: {
              //   user: formState.user,
              // },
            });
            sessionStorage.removeItem("fromPath");
          }
        }
      );
    } else {
      message.warning("账号或密码错误！");
    }
  });
};
const reset = () => {
  formRef.value.resetFields();
};
</script>

<style lang="less" scoped>
.loginBox {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/login.svg');
  background-size: 100%;
  display: flex;
  .login {
    width: 350px;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 22px;
      line-height: 30px;
      text-align: center;
      margin-bottom: 10px;
    }
  }
}
</style>