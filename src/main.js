import './public-path.js';
// require('./public-path.js')
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { message } from "ant-design-vue";
import service from '@/utils/requset'
import rou from '@/mock/router'
console.log(process.env.NODE_ENV)
// console.log(import.meta.env)
//顶部页面加载条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import * as directive from '@/utils/drrective'

import '@/mock/index'

NProgress.configure({
	easing: 'ease',
	speed: 500,
	showSpinner: false,
	trickleSpeed: 200,
	minimum: 0.3
})
//路由监听
router.beforeEach((to, from, next) => {
	let options = router.getRoutes()
	NProgress.start();
	// 动态添加路由
	if (!options.length) {
		service({
			url: '/get/router',
			method: 'get'
		}).then(res => {
			if (res.code === 200) {
				let data = rou.data
				store.commit('changeValue', {
					name: 'routers',
					value: data
				})
				data.forEach(item => {
					router.addRoute(item)
				})
			}
			next({
				...to,
				replace: true
			})
		})
	} else {
		if (!store.state.user && !sessionStorage.user && to.path !== '/login') {
			message.warning('登录超时或者过期，请重新登录！')
			sessionStorage.fromPath = to.path
			router.replace('/login')
		}
		next();
	}
});
//路由跳转结束
router.afterEach(() => {
	NProgress.done()
})

let instance = null

function render({ container } = {}) {
    instance = createApp(App)
    // 注册全局指令
    instance.directive('drag', directive.drag);
    instance.directive('focus', directive.focus);
    instance.directive('debounceClick', directive.debounceClick);
    instance.directive('stretch', directive.stretch);
    instance.config.productionTip = false;
    instance.config.devtools = true;
    instance.config.globalProperties.$axios = 159
    instance.use(Antd);
    instance.use(store).use(router).mount(container ? container.querySelector('#vue3-vite-app') : '#vue3-vite-app')
}

// 如果是单独启动的子文件，保证仍能正常运行
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

// 生命周期的钩子函数
// 导出第一次进入当前子应用的钩子函数
export async function bootstrap() {
    console.log('第一次进入vue3-vite')
}

// 导出每次创建挂载时的钩子函数
export async function mount(props) {
    console.log("创建挂载组件")
    render(props)
}

// 导出每次销毁时的钩子函数
export async function unmount(props) {
    console.log("销毁组件")
    instance.unmount()
    instance._container.innerHTML = ''
    instance = null
    store.dispatch("clearState");
}
