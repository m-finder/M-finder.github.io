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
* 修改数据库信息，然后执行:
```php
php artisan make:auth
php artisan migrate
```

