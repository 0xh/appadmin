import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import Table from './components/nav1/Table.vue'
import Form from './components/nav1/Form.vue'
import Page3 from './components/nav1/Page3.vue'
import Page4 from './components/nav2/Page4.vue'
import Page5 from './components/nav2/Page5.vue'
import Page6 from './components/nav3/Page6.vue'
import echarts from './components/charts/echarts.vue'

// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    {
        path: '/login',
        component: Login,
        hidden: true//不显示在导航中
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',//命名路由：可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称
        iconCls: 'el-icon-message',//图标样式class
        //要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：
        children: [
            //{ path: '/main', component: Main },
            {path: '/table', component: Table, name: 'Table'},
            {path: '/form', component: Form, name: 'Form'},
            {path: '/page3', component: Page3, name: '页面3'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            {path: '/page4', component: Page4, name: '页面4',meta: { requiresAuth: true }},// a meta field
            {path: '/page5', component: Page5, name: '页面5',meta: { requiresAuth: true }}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            {path: '/page6', component: Page6, name: '导航三'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            {path: '/echarts', component: echarts, name: 'echarts'}
        ]
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes
})

//vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的
//你可以使用 router.beforeEach 注册一个全局的 before 钩子
//当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于 等待中
//每个钩子方法接收三个参数
// to 和 from 都是 路由信息对象
//to: Route: 路由信息对象,即将要进入的目标
//from: Route: 路由信息对象,当前导航正要离开的路由
//next: Function: 一定要调用该方法来 resolve 这个钩子

router.beforeEach((to, from, next) => {
    NProgress.start();

    // 在全局导航钩子中检查 meta 字段
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }


    //确保要调用 next 方法，否则钩子就不会被 resolved。
    //进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）
    next()
})

//同样可以注册一个全局的 after 钩子，不过它不像 before 钩子那样，after 钩子没有 next 方法，不能改变导航
router.afterEach(transition => {
    NProgress.done();
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件,子组件能通过 this.$store 访问到
    components: {App}
    //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')

