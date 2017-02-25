import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App' //可以理解为页面的容器，页面在这个容器中切换
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store' //store
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'font-awesome/css/font-awesome.min.css'
import routes from './routes'  //路由配置
// import Mock from './mock'
// Mock.bootstrap();
import axios from 'axios';
import Qs from 'qs'

// Import Crypto JS for Twitter OAuth request signing
import hmac_sha1 from 'crypto-js/hmac-sha1'
import encode_base64 from 'crypto-js/enc-base64'

// 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
Vue.prototype.$http = axios.create({
    baseURL: 'http://192.168.1.100:8849/api/v1400', // 基础url前缀
    // timeout: 10000,
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // }
    // ,transformRequest: [function (data) {
    //     data = qs.stringify(data)
    //     return data
    // }]
})

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)



//页面顶部进度条
NProgress.configure({showSpinner: false});

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes //ES6缩写语法，相当于routes:routes
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
    //NProgress.start();
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        if(to.path == '/foo' || to.path == '/bar'){
            next()
        }else{
            next({path: '/login'})
        }
    } else {
        //确保要调用 next 方法，否则钩子就不会被 resolved。
        //进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）
        next()
    }
})

// 同样可以注册一个全局的 after 钩子，不过它不像 before 钩子那样，after 钩子没有 next 方法，不能改变导航
// router.afterEach(transition => {
// NProgress.done();
// });

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    //el: '#app',  //==.$mount('#app')
    //template: '<App/>',
    router,
    store,// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件,子组件能通过 this.$store 访问到
    //components: { App }
    render: h => h(App)
}).$mount('#app')
// 现在，应用已经启动了！
