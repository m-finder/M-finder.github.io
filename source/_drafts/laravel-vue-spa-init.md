---
title: laravel-vue-spa系列-项目初始化
date: 2019-11-06 10:29:13
categories: 码不能停
tags: [laravel,vue,laravel-mix]
---

之前在 laravel-news 看到一篇用 laravel 做 spa 的文章，于是也想自己做一个单页后台，然后做成 composer 扩展包。

写写停停，好几个月过去了，我却还在不停地爬坑中。

前端之路多坎坷，一言难尽泪满襟……

![](laravel-vue-spa-init/laravel-vue.jpg)
<!-- more -->

#### 创建项目
默认以 laradock 为开发环境。

```
docker-compose exec workspace bash
laravel new laravel-spa
```

完成后修改 nginx 配置和 laravel-spa 的相关配置。

#### 安装 vue-router

命令行执行：
```shell
npm install vue-router
```
#### 配置 vue-router
路由装好了，接下来就改造下`app.js` 来配置 vue-router：

```javascript
import Vue from 'vue';
import Router from 'vue-router';
import BootstrapVue from 'bootstrap-vue'

Vue.use(Router);
Vue.use(BootstrapVue);

import Home from '../views/Home'
import Users from '../views/Users'
const router = new Router({
	scrollBehavior: () = >({y: 0}),
	routes: [{
		path: '/home',
		component: Home,
		meta: {title: '首页'},
		name: 'Home',
	},
	{
		path: '/users',
		component: Users,
		meta: {title: '用户列表'},
		name: 'Users',
	},
	]
});

const app = new Vue({
    el: '#app',
    store,
    components: {App},
    router,
});
```
#### 新建页面
路由配好以后，我们还需要一些组件。
```
mkdir resources/js/views
touch resources/js/views/App.vue
touch resources/js/view/Home.vue
touch resources/js/view/Users.vue
```
