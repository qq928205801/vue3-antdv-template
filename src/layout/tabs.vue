<template>
	<div class="tabBox">
		<a-tabs :activeKey="activeKey" type="editable-card" @edit="onEdit" hideAdd @tabClick="tabClick">
			<a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.name"></a-tab-pane>
		</a-tabs>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useStore();
const panes = computed(() => store.state.tabs);
const activeKey = computed(() => store.state.tabActive);
const onEdit = (targetKey, action) => {
	if (action === 'remove') {
		remove(targetKey);
	}
};
const remove = targetKey => {
	if (panes.value.length === 1) {
		message.warning('这已经是最后一页，不能再关闭了！');
		return;
	}
	let lastIndex = 0;
	let tabs = store.state.tabs;
	let tabActive = store.state.tabActive;
	tabs.forEach((pane, i) => {
		if (pane.key === targetKey) {
			lastIndex = i - 1;
		}
	});
	tabs = tabs.filter(pane => pane.key !== targetKey);
	if (tabs.length && tabActive === targetKey) {
		if (lastIndex >= 0) {
			tabActive = tabs[lastIndex].key;
			router.push(tabs[lastIndex].path || '/404');
		} else {
			tabActive = tabs[0].key;
			router.push(tabs[0].key.path || '/404');
		}
	}
	store.commit('changeValue', { name: 'tabs', value: tabs });
	store.commit('changeValue', { name: 'tabActive', value: tabActive });
};
const tabClick = e => {
	let choose = panes.value.filter(item => item.key === e);
	router.push(choose[0].path || '/404');
	document.title = choose[0].name;
	store.commit('changeValue', { name: 'tabActive', value: e });
};
</script>

<style lang="less" scoped>
.tabBox {
	height: 50px;
	background: #fff;
	padding: 0 10px;
	display: flex;
	align-items: flex-end;
	box-sizing: border-box;
	:deep(.ant-tabs-nav) {
		margin: 0;
	}
}
</style>
