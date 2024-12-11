---
title: laravel5.4疑难杂症
date: 2018-01-05 03:05:12
tags:
- laravel
- php
categories:
- 码不能停
---

公司项目最近翻新了页面，把 bootstrap 完全改成了 layui 。

![](/images/laravel.jpg)
按照惯例，上线之前先在测试环境跑几天，结果在搭建测试环境的时候，问题就出来了：

laravel 版本是 5.4.63 ，服务器的 php 版本是 5.6 ，执行 composer install 时，提示我需要 php7.1 。

吓得我一阵懵逼，难道是什么时候装错扩展了？

把 composer.json 里没什么用的扩展完全去除后再试，结果还是一样。

反复折腾无果，想起还有 update 可以用，遂改为执行 composer update ，终于开始安装了。

小样，还治不了你了！容老夫抽根烟得瑟一下。

下一秒，一个新的报错又砸我个措手不及：
![错误信息](/images/error.png)

class ‘’ not found !

虽然不知道这个报错是咋回事，但是潜意识觉得应该是某个 Kernel 文件出错了。

找到一份之前的备份，一通对比，终于有所发现：
![对比结果](/images/2018-01-05-03-03-33-5a4eeb050862d.png)

出错的代码比之前正常的代码多了个 “，”，丫的，太粗糙了！

去掉，再次执行 update ，果然一路畅通无阻。

但是那个该死的 install 是再也没回来。