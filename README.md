# vueAdmin
a simple admin template based on [vuejs2](http://vuejs.org/) and [element](http://element.eleme.io/#/).

### Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli).

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

```

### Browser Support

Modern browsers and Internet Explorer 10+.

### snapshots
![image](https://github.com/taylorchen709/vueAdmin/blob/master/screenshots/login.png)
![image](https://github.com/taylorchen709/vueAdmin/blob/master/screenshots/main.png)
![image](https://github.com/taylorchen709/vueAdmin/blob/master/screenshots/edit.jpg)

单页Web应用（single page web application，SPA），就是只有一张Web页面的应用。

单页应用程序 (SPA) 是加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。[1]
浏览器一开始会加载必需的HTML、CSS和JavaScript，所有的操作都在这张页面上完成，都由JavaScript来控制。

因此，对单页应用来说模块化的开发和设计显得相当重要。
既然是单页应用（SPA），那么整个项目有以下三个文件是必要的:

一个html文件：index.html

一个webpack打包时的入口js文件：main.js

一个根vue组件，作为其他组件的挂载点：app.vue

vue-resource → 官方推荐axios

在vue2.0中废除了使用事件的方式进行通信，所以在小项目中我们可以使用Event Bus，其余最好都使用vuex，

var app = new Vue({
  el: '#app',
  router,
  store,
  ...App===render:h => h(App)
});