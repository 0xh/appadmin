import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Table from './pages/nav1/Table.vue'
import Form from './pages/nav1/Form.vue'
import user from './pages/nav1/user.vue'
import Page4 from './pages/nav2/Page4.vue'
import Page5 from './pages/nav2/Page5.vue'
import Page6 from './pages/nav3/Page6.vue'
import echarts from './pages/charts/echarts.vue'

// 1. 定义（路由）组件。
// 也可以从其他文件 import 进来
// 实际开发过程中，我们的vue组件显然不会只有一个template模板这么简单，会用到vue的单文件组件
const Bar = { template: '<div>bar</div>' }
// 嵌套路由<router-view>嵌套在模板template中
const Foo = {
    template:
    '<div class="foo">' +
    '<h2>This is Foo!</h2>' +
    '<router-view></router-view>' + // <- 嵌套的外链
    '</div>'
}
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 还可以是
// 通过 Vue.extend() 创建的组件构造器，var App = Vue.extend({});
// var Foo = Vue.extend({
//     template:
//     '<div class="foo">' +
//     '<h2>This is Foo!</h2>' +
//     '<router-view></router-view>' + // <- 嵌套的外链
//     '</div>'
// })
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。


let routes = [
    { path: '/foo', name: 'Foo',component: Foo },
    { path: '/bar', name: 'Bar',component: Bar },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true //不显示在导航中
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true //不显示在导航中
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',//命名路由：可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称
        iconCls: 'el-icon-message',//图标样式class
        //要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
