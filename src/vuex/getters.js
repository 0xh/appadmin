//test
export const getCount = state => {
    return state.count
}

// 如果有getter 我们可以把一些需要处理返回的数据放在这即可，不进行业务操作
// 有时候我们需要从 store 中的 state 中派生出一些状态
// Vuex 允许我们在 store 中定义『getters』（可以认为是 store 的计算属性）。Getters 接受 state 作为其第一个参数
// Getters 会暴露为 store.getters 对象
// Getters 也可以接受其他 getters 作为第二个参数