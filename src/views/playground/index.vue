<template>
  <Repl :store="store" :showCompileOutput="true" class="box" />
</template>
<script setup>
import '@vue/repl/dist/style.css'
import { watchEffect, ref } from "vue";
import { Repl, ReplStore } from "@vue/repl";
// import { useRoute } from "vue-router";
// const currentRoute = useRoute();
// retrieve some configuration options from the URL
// const query = new URLSearchParams(location.search);
const store = ref(null)
store.value = new ReplStore({
  // 用先前序列化的状态初始化repl
  // serializedState: currentRoute.query.value || '',

  // 如果URL具有showOutput查询，则在输出窗格(仅限移动设备)上启动
  // showOutput: query.has("showOutput"),
  // 如果URL具有outputMode查询，则在输出窗格的不同选项卡上开始
  // 默认是预览选项卡
  // outputMode: query.get("outputMode") || "preview",

  // 指定从沙箱中导入Vue运行时的默认URL
  // 默认是unpkg.com的CDN链接，版本与Vue的版本匹配
  // 从peerDependency
  // defaultVueRuntimeURL: "cdn link to vue.runtime.esm-browser.js",
});
// persist state to URL hash
// watchEffect(() => {
// 	const url = `#${currentRoute.path}?value=${store.serialize().slice(1)}`
// 	console.log(url)
// 	history.replaceState({}, "", url)
// });
const file = `
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World22223!')
<\/script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim();
store.value.setFiles({
  'App.vue': file,
})

// pre-set import map
// store.value.setImportMap({
//   imports: {
//     myLib: "cdn link to esm build of myLib",
//   },
// });

// use a specific version of Vue
// store.setVueVersion("3.2.8");
</script>



<style lang="less" scoped>
.box {
  height: 100%;
}
</style>
