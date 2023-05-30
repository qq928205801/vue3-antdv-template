<template>
  <div class="box">
    <a-form
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      ref="formRef"
    >
      <a-row class="bg">
        <a-col :span="8">
          <a-form-item label="姓名" name="name">
            <a-input
              v-model:value="formState.name"
              placeholder="请输入"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="下拉" name="region">
            <a-select
              v-model:value="formState.region"
              placeholder="请选择"
              allowClear
            >
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="时间" name="date1">
            <a-date-picker
              v-model="formState.date1"
              show-time
              type="date"
              placeholder="请选择"
              style="width: 100%"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="复选框" name="type">
            <a-checkbox-group v-model:value="formState.type">
              <a-checkbox value="1">Online</a-checkbox>
              <a-checkbox value="2">Promotion</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="单选框" name="resource">
            <a-radio-group v-model:value="formState.resource">
              <a-radio value="1">Sponsor</a-radio>
              <a-radio value="2">Venue</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="8" class="btn">
          <a-button type="primary" @click="onSubmit">搜索</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">清空</a-button>
        </a-col>
      </a-row>
    </a-form>

    <a-row class="bg">
      <a-col :span="24" class="tableAdd">
        <a-button type="primary" @click="openAdd('add', {})">添加</a-button>
      </a-col>
      <a-col :span="24">
        <a-table :dataSource="dataSource" :columns="columns">
          <template v-slot:bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'index'">
              {{ index + 1 }}
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <a @click="openAdd('edit', record)">编辑</a>
              <a-popconfirm
                title="确定要删除吗?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="toDelete(record)"
              >
                <a style="margin-left: 10px">删除</a>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
    <a-modal
      v-model:visible="visible"
      :title="title"
      @ok="toAdd"
      @cancel="closeModel(false)"
    >
      <a-form
        :model="modalState"
        :rules="rulesModal"
        :label-col="labelCol"
        ref="modalRef"
      >
        <a-form-item label="姓名" name="name">
          <a-input
            v-model:value="modalState.name"
            placeholder="请输入"
            allowClear
            v-focus="visible"
          />
        </a-form-item>
        <a-form-item label="年龄" name="age">
          <a-input
            v-model:value="modalState.age"
            placeholder="请输入"
            allowClear
            type="Number"
          />
        </a-form-item>
        <a-form-item label="住址" name="address">
          <a-input
            v-model:value="modalState.address"
            placeholder="请输入"
            allowClear
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { message } from "ant-design-vue";
import moment from "moment";
import { reactive, ref, onMounted, computed } from "vue";
const labelCol = { span: 6 };
const rules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  region: [
    {
      required: true,
      message: "请选择下拉",
      trigger: "change",
    },
  ],
};
const rulesModal = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  age: [{ required: true }],
};
const formRef = ref();
const num = ref(2);
const mode = ref("");
const modalRef = ref();
const formState = reactive({
  name: "",
  region: undefined,
  date1: undefined,
  delivery: false,
  type: [],
  resource: "",
});
const title = computed(() => (mode.value === "add" ? "新增" : "编辑"));
const modalState = ref({
  name: "",
  age: "",
  address: "",
});
const dataSource = ref([
  {
    key: 1,
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: 2,
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
]);
const columns = [
  {
    title: "序号",
    width: "80px",
    dataIndex: "index",
  },
  {
    title: "key",
    dataIndex: "key",
  },
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
  },
  {
    title: "操作",
    width: "100px",
    dataIndex: "operation",
  },
];
const visible = ref(false);
const details = ref({});
onMounted(() => {
  // let originalSetItem = localStorage.setItem;
  // //重写setItem函数
  // localStorage.setItem = function (key, newValue) {
  //   //创建setItemEvent事件
  //   let event = new Event("setItemEvent");
  //   event.key = key;
  //   event.newValue = newValue;
  //   //提交setItemEvent事件
  //   window.dispatchEvent(event);
  //   //执行原setItem函数
  //   originalSetItem.apply(this, arguments);
  // };
  // sessionStorage.setItem = function (key, newValue) {
  //   var setItemEvent = new Event('setItemEvent')
  //   setItemEvent.type = 'sessionStorage'
  //   setItemEvent.newValue = newValue
  //   window.dispatchEvent(setItemEvent)
  // }
  // window.addEventListener("setItemEvent", function (e) {
  //   console.log(e);
  // });
});
const onSubmit = () => {
  // window.localStorage.setItem("name", "123");
  // window.sessionStorage.setItem("name", "456");
  formRef.value.validate().then((value) => {
    if (value) {
      let data = {
        ...formState,
        date1: moment(formState.date1).format("YYYY-MM-DD HH:mm:ss"),
      };
      console.log(data);
      message.success("搜索成功！");
      setTimeout(() => {
        formRef.value.resetFields();
      }, 1000);
    }
  });
};
const resetForm = () => {
  formRef.value.resetFields();
};
const openAdd = (modes, deta) => {
  modalRef.value?.resetFields();
  if (modes === "add") {
    modalState.value = {
      name: "",
      age: "",
      address: "",
    };
  } else {
    modalState.value = {
      name: deta.name,
      age: deta.age,
      address: deta.address,
    };
  }
  details.value = deta;
  mode.value = modes;
  visible.value = true;
};
const toAdd = () => {
  modalRef.value.validate().then((value) => {
    if (value) {
      if (mode.value === "add") {
        num.value++;
        dataSource.value.push({
          ...modalState.value,
          key: num,
        });
      } else {
        let data = [...dataSource.value];
        data.forEach((item, index) => {
          if (details.value.key === item.key) {
            // Object.assign(data[index], { ...item, ...modalState.value });
            data[index] = { ...item, ...modalState };
          }
        });
        // Object.assign(dataSource.value.filter(item => details.value.key === item.key)[0], { ...modalState.value });
        dataSource.value = data;
      }
      message.success(mode.value === "add" ? "新增" : "修改" + "成功！");
      visible.value = false;
    }
  });
};
const toDelete = (e) => {
  let data = [...dataSource.value];
  data.forEach((item, index) => {
    if (item.key === e.key) {
      dataSource.value.splice(index, 1);
    }
  });
  message.success("删除成功！");
};
const closeModel = (e) => {
  visible.value = e;
};
// watch(
//   formState,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal);
//   },
//   { deep: true }
// );
</script>
<style lang="less" scoped>
.box {
  .bg {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
  }
  .btn {
    text-align: right;
  }
  .tableAdd {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
