import { computed } from 'vue'
// 相关辅助函数导入
import { mapActions, mapGetters, mapMutations, mapState, useStore } from 'vuex'
function mapAll (keys, mapFn) {
    // 导入仓库对象
    const $store = useStore()
    // 根据传入的辅助函数和其他参数进行映射
    const stateFn = mapFn(...keys)
    // 记录映射结果
    const res = {}
    // 如果映射的是state或getters需要使用computed组合式API包裹，因此做了这样一个判断
    const isMapData = [mapState, mapGetters].includes(mapFn)
    for (const key in stateFn) {
        if (Object.hasOwnProperty.call(stateFn, key)) {
            // 修改映射函数内部this指向
            const fn = stateFn[key].bind({ $store })
            // 记录：state或getters使用computed进行包裹，其他的直接记录
            res[key] = isMapData ? computed(fn) : fn
        }
    }
    // 返回结果
    return res
}
// 导出对应的use映射函数
export function useMapState (...keys) {
    return mapAll(keys, mapState)
}
export function useMapMutations (...keys) {
    return mapAll(keys, mapMutations)
}
export function useMapGetters (...keys) {
    return mapAll(keys, mapGetters)
}
export function useMapActions (...keys) {
    return mapAll(keys, mapActions)
}
// export function useMapState (state) {
//     // 1. 获取实例 $store
//     const store = useStore()
//     // 2. 遍历状态数据
//     const storeStateFns = mapState(state)
//     console.log(storeStateFns)
//     // 3. 存放处理好的数据对象
//     const storeState = {}
//     // 4. 对每个函数进行computed
//     Object.keys(storeStateFns).forEach(fnKey => {
//         const fn = storeStateFns[fnKey].bind({ $store: store })
//         // 遍历生成这种数据结构 => {name: ref(), age: ref()}
//         storeState[fnKey] = computed(fn)
//     })
//     return storeState
// }
// // 映射state
// const { name } = useMapState(['name', 'age'])
// // 其他模块的state
// const { name: homeName } = useMapState('home', ['name'])
// // 映射mutations
// const { setName } = useMapMutations(['setName'])
// // 映射getters
// const { names } = useMapGetters({
//   names: 'getName'
// })
// // 映射actions
// const { postName } = useMapActions(['postName'])
// // 传参方式和vuex辅助函数相同
