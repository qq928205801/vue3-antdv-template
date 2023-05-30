<template>
  <div class="box">
    <div>弹框</div>
    <a-space>
      <a-button type="primary" @click="openModal">默认底部</a-button>
      <a-button type="primary" @click="openModal2">自定义底部</a-button>
      <a-button type="primary" @click="change">修改值</a-button>
    </a-space>
    {{ obj }}
    <Modal title="弹框" v-model:visible="visible" :footer="false" @ok="handOK">
      <template #contet>默认contet</template>
    </Modal>
    <Modal title="弹框" v-model:visible="visible2" :footer="false">
      <template #contet>自定义底部contet</template>
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" @click="handleOk"
          >Submit</a-button
        >
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, readonly } from "vue";
import { message } from "ant-design-vue";
import Modal from "@/components/Modal.vue";
const visible = ref(false);
const visible2 = ref(false);
const read = readonly({a:123,b:456})
let obj = ref({
  name: '123',
  pwd: '456'
})
const openModal = () => {
  visible.value = !visible.value;
};
const handOK = () => {
  setTimeout(() => {
    message.success("提交成功");
    openModal();
  }, 100);
};
const openModal2 = () => {
  visible2.value = !visible2.value;
};
const handleCancel = () => {
  openModal2();
};
const handleOk = () => {
  setTimeout(() => {
    message.success("提交成功");
    openModal2();
  }, 100);
};
const change = () => {
  // obj = reactive({...obj, qqq: 789})
  obj.value.name = 159
  // read.bc = 789
}
</script>

<style lang="less" scoped>
.box {
  background-color: #fff;
  padding: 20px;
}
</style>
