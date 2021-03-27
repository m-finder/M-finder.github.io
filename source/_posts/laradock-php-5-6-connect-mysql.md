---
title: laradock 中 php5.6 连接 mysql 报错解决
date: 2019-03-21 23:00:00
tags:
- php
- docker
categories:
- 码不能停
---
laradock 中 php 5.6 连接 mysql 报错的解决方法。

![](/images/laradock.png)
<!--more-->

之前弄的是默认版本的 php 7.2 和 mysql 8，配置好以后一直都能正常使用。

最近因为需要切换 php 版本，突然发现切换后连接 mysql 时无法识别 host。

emmmm……，最开始还以为是 php 的锅，各种重新 build，无果，最后在 github 上找到别人发出来的解决办法：

> rm -rf ~/.laradock/data/mysql
> 删除老版本的数据
>
> docker-compose build mysql
> 重新构建 mysql
>
> 进入 mysql 容器
> mysql -uroot -p
> root
> ALTER USER root IDENTIFIED WITH mysql_native_password BY 'root';
> exit;

到这里也就可以了。

有这个问题是因为 8 和 5.7 的配置不一样，不清掉老数据的话会引起报错，一有请求去连接 mysql 马上就宕机。

