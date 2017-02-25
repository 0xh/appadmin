//则可以编写异步的逻辑或者是一些逻辑，再去commit我们的事件
export const increment = ({commit}) => {
    commit('INCREMENT')
}
//ES2015 的 参数解构 来简化代码
export const decrement = ({commit}) => {
    commit('DECREMENT')
}
