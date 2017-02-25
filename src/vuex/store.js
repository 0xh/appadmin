import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10
}

// 定义所需的 mutations 注册我们各种数据变化的方法
// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// 你不能直接调用一个 mutation handler(INCREMENT or DECREMENT)
// 需要以相应的 type 调用 store.commit 方法
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})