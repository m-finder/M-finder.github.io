---
title: laravel 队列学习
date: 2019-04-09 23:00:00
tags: [laravel, php, docker]
categories: 码不能停
---

学习下 laravel 的队列系统。
![](laravel-queues/laravel.jpg)

队列的目的是将耗时的任务延时处理，比如发送邮件，从而大幅度缩短 Web 请求和相应的时间。

常用的队列后台有： Beanstalk，Amazon SQS，Redis 等。