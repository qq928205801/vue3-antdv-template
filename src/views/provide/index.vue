<template>
    <div class="box">
        <div>provide/inject</div>
        父组件:
        <a-input v-model:value="value" allowClear v-focus/>
        <Inject></Inject>
        <!-- <div>porps</div>
        <a-input v-model:value="value2" allowClear/>
        <Inject :value="value2" :porps="true"></Inject> -->
    </div>
</template>

<script setup>
import {ref, provide} from 'vue'
import Inject from './inject.vue'
const value = ref('')
// const value2 = ref('')
provide('value', value)
</script>

<style lang="less" scoped>
.box {
    background-color: #fff;
    padding: 20px;
}
</style>
