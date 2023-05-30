import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = []

const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? "/vue3-app" : process.env.BASE_URL),
  base: window.__POWERED_BY_QIANKUN__ ? "/vue3-app" : process.env.BASE_URL,
  routes
})


export default router
