---
title: python 内存溢出的解决方法
date: 2019-09-24 09:05:00
categories: 
- 码不能停
tags: 
- python
---

运行在服务器上的数据同步脚本突然出现已杀死，谁把你杀了，咋就突然被杀了？？？

![真実はいつも一つ！](/images/kn.jpg)

<!-- more -->

#### 系统日志
切换到 `var/log/` 查看 messages，发现是 `Out of memory: Kill process 13678 (python3) score 906 or sacrifice child`


#### 原因分析
这就奇怪了，数据同步脚本每次运行完都会释放内存的，而且已经从常开的死循环改成了 `BlockingScheduler` 的定时任务，按理说不应该消耗大量内存。

数据同步没问题，那就只能是其他程序消耗了，想起来这里不紧运行了数据同步，还有一个 laravel 项目和一个 django 项目，laravel 为 django 提供接口，问题很有可能就出现在 django！

运行 top 查看 python 的内存消耗，然后通过 laravel 调用一下接口，发现内存确实上涨并且一直没有释放。

罪魁祸首终于找到了！

#### 问题解决
经过一番查询，django 引发内存泄漏一般有两种情况，一个是直接访问 django 的数据库接口时没有主动释放游标，另一个就是设置了 debug 模式，这个项目因为还在开发，所以 debug 模式确实开着。

改掉以后再试，果然内存不再飙升。

线上环境一定要慎重啊！
