---
title: laravel 内置 vue 的使用
date: 2019-03-14 23:00:00
tag: [php, laravel]
categories: 码不能停
---

从 5.3 版本开始，用 Vue.js 作为默认 JavaScript 前端框架。

从刚接触 laravel 到现在已经又过去了四个版本，种种原因，还是一直没能用上 vue.js 来做开发，现在刚好因为公司项目用到了 vue，对 vue 有了一定的了解，所以顺便就研究下 vue 在 laravel 中的使用吧。

![](laravel-vue/php.jpg)
<!--more-->

#### laravel安装

操作均在 laradock 的环境中进行。
进入 workspace 容器，执行以下命令安装 laravel
```
composer create-project laravel/laravel study
```

#### 服务设置

* docker-compose up -d nginx mysql phpmyadmin 启动容器
* 配置 nginx、hosts 并重启 nginx
* 进入 mysql 容器执行以下命令：
```shell
mysql -uroot -p
root
ALTER USER root IDENTIFIED WITH mysql_native_password BY 'PASSWORD';
exit;
exit

```

* 访问 phpmyadmin： localhost:8080，host 填写 mysql，用户名密码均为 root。
* 进入 workspace 容器，创建 laravel 项目：create-project laravel/laravel study
* 修改数据库信息，生成用户模块并安装前端脚手架:
```php
php artisan make:auth
php artisan migrate
php artisan make:seed UsersTableSeeder

在 run 方法中添加用户信息：
$user = new App\User;
$user->name = 'wu';
$user->email = 'yf-wu@qq.com';
$user->password = Hash::make('111111');
$user->save();

再去 DatabaseSeeder 中打开 run 中的注释，接着往下执行：
php artisan db:seed
npm install
```

#### 修改视图 
home.blade.php：
vue 的组件在 resources/js/components，然后在 app.js 中注册。
```html
You are logged in!
<example-component></example-component>
```
* 更新脚手架：npm run dev  or npm run watch

#### 注意事项
> 组件在 @section('content') 标签内才会生效
> 每次修改组件后都需要重新运行一次 npm run dev，也可以用 watch 监听。
