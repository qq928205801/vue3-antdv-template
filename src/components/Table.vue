<template>
  <a-row class="bg">
    <slot name="button" />
    <a-col :span="24">
      <a-table
        :dataSource="dataSource"
        :pagination="pagination"
        @change="change"
      >
        <template v-for="(item, ind) in columns" :key="ind">
          <a-table-column
            :title="item.title"
            :align="item.align"
            :width="item.width"
            :data-index="item.dataIndex"
            v-if="item.slots === 'index'"
          >
            <template #default="{ index }">
              {{ index + 1 }}
            </template>
          </a-table-column>
          <a-table-column
            :title="item.title"
            :align="item.align"
            :width="item.width"
            v-else-if="item.slots === 'operation'"
          >
            <template #default="{ record }">
              <Button
                v-for="(ite, ind) in item.operations"
                :key="ind"
                :type="ite.type"
                :text="ite.text"
                :loading="ite.loading"
                @click="ite.clickEvent"
                :record="record"
              >
              </Button>
            </template>
          </a-table-column>
          <a-table-column
            :title="item.title"
            :data-index="item.dataIndex"
            :align="item.align"
            :width="item.width"
            v-else
          >
          </a-table-column>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script setup>
import { computed } from "vue";
import Button from "./Button.vue";
const props = defineProps({
  columns: {
    type: Array,
    required: true,
    default() {
      return [];
    },
  },
  data: {
    type: Array,
    required: true,
    default() {
      return [];
    },
  },
  pagination: {
    type: Object,
    required: true,
    default() {
      return {};
    },
  },
});
const dataSource = computed(() => [...props.data]);

const emit = defineEmits(["change"]);
const change = (page) => {
  emit("change", page);
};
</script>

<style lang="less" scoped>
</style>
