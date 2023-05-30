import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = []

const router = createRouter({
  history: createWebHashHistory(window.__POWERED_BY_QIANKUN__ ? "/vue3-vite-app" : './'),
  base: window.__POWERED_BY_QIANKUN__ ? "/vue3-vite-app" : './',
  routes
})


export default router
