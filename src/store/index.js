import { createStore } from 'vuex'
import router from "@/router";

const valueType = (value) => {
  if (!value) {
    return undefined
  } else if (value.constructor === Array) {
    return []
  } else if (value.constructor === String) {
    return ''
  } else if (value.constructor === Object) {
    return {}
  } else if (value.constructor === Boolean) {
    return null
  }
  return null
}
export default createStore({
  state: {
    user: '',//用户名
    selectedKeys: null,//菜单选中
    openKeys: [],//菜单展开
    routers: [],//路由
    menu: [],//菜单
    tabs: [],//标签页
    tabActive: null,//选中的标签页
    isQK: window.__POWERED_BY_QIANKUN__,//是否是乾坤
  },
  getters: {
  },
  mutations: {
    changeValue(state, obj) {
      state[obj.name] = obj.value
    },
  },
  actions: {
    addRouters(context, payload) {
      payload.forEach(item => {
        router.addRoute(item)
      })
      context.commit('changeValue', { name: 'router', value: payload })
    },
    setTabs(context, payload) {
      let tabs = context.state.tabs
      let exist = tabs.filter(item => item.key === payload.key)
      if (!exist.length) {
        tabs.push(payload)
        context.commit('changeValue', { name: 'tabs', value: tabs })
        context.commit('changeValue', { name: 'tabActive', value: payload.key })
      } else {
        context.commit('changeValue', { name: 'tabActive', value: payload.key })
      }
    },
    clearState(context, payload) {
      let state = context.state
      for (let i in state) {
        if (i == 'isQK') continue
        let value = valueType(state[i])
        context.commit('changeValue', { name: i, value: value })
      }
    }
  },
  modules: {
  }
})
