---
title: laravel 事件系统、广播系统学习
date: 2019:03:27: 23:00
tag: laravel
categies: 码不能停
---

学习下 laravel 的事件系统和广播系统。
![](laravel-events-broadcasting/laravel.jpg)
<!-- more -->

Laravel 的事件提供了一个简单的观察者实现，能够订阅和监听应用中发生的各种事件。

先以一个登陆日志来作为例子开始事件的学习吧。

#### 注册事件 && 监听器

在 app\Providers\EventServiceProvider.php 中，添加以下内容：
```
protected $listen = [
    Registered::class => [
        SendEmailVerificationNotification::class,
    ],
    'App\Events\LoginEvent' => [
        'App\Listeners\LoginListener'
    ]
];
```

然后运行命令，生成事件和监听器：

```
php artisan event:generate
```

运行结束后，事件和监听器都会被自动创建好。
![](laravel-events-broadcasting/new-event.png)

在监听中打个 log： info('user login event')

然后找个控制器触发事件。

event(new LoginEvent());

可以看到 log 文件中有一条新纪录：
>[2019-03-27 08:16:21] local.INFO: user login event

