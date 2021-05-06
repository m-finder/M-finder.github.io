---
title: php 和设计模式 - 命令行模式
date: 2021-03-21 14:35:20
categories:
- 设计模式
tags:
- 设计模式
---

用过 laravel 框架的应该都知道，其脚本模块非常强大，这些脚本，也就是命令行模式。

说到命令行，就不得步提一下 cli 和 cgi 的区别，在 nginx 中，php 并不是直接执行的，而是通过 cgi 调用 php 并获取执行结果。

而 cli 就是命令行接口，主要用于 shell 脚本的开发。

```shell
php command.php
/opt/homebrew/var/www/design-pattern


php-cli command.php
X-Powered-By: PHP/7.4.16
Content-type: text/html; charset=UTF-8

/opt/homebrew/var/www/design-pattern
```

不多说了，回头再专门看一下这方面的东西。


