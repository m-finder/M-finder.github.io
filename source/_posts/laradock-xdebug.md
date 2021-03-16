---
title: phpstorm 配置 laradock xdebug
date: 2019-03-08 11:41:48
tags: Docker
categories: 码不能停
---

本次操作为 win10 系统，理论上和其他系统无差异。

![laradock](/laradock-xdebug/laradock.png)
<!--more-->

克隆 laradock 到本地： 
`git clone https://github.com/Laradock/laradock.git`

进入 laradock 文件夹， 生成配置文件： 
` cp .\env-example .env `

编辑 .env 配置文件：

```

WORKSPACE_INSTALL_XDEBUG=true
PHP_FPM_INSTALL_XDEBUG=true

```

修改 `laradock/php-fpm/xdebug.ini` 和 `laradock/workspace/xdebug.ini`配置文件：

```
xdebug.remote_host=dockerhost
xdebug.remote_connect_back=0
xdebug.remote_port=9000
xdebug.idekey=PHPSTORM

xdebug.remote_autostart=1
xdebug.remote_enable=1
xdebug.cli_color=0
xdebug.profiler_enable=0
xdebug.profiler_output_dir="~/xdebug/phpstorm/tmp/profiling"

xdebug.remote_handler=dbgp
xdebug.remote_mode=req

xdebug.var_display_max_children=-1
xdebug.var_display_max_data=-1
xdebug.var_display_max_depth=-1
```

然后在 laradock 同级新建 www 文件夹并在文件夹下新建 index.php 文件。
修改 `laradock/nginx/sites/default.conf` 配置：

```
root /var/www;
```
build 服务： `docker-compose bild php-fpm workspace`

启动服务：`docker-compose up -d nginx mysql workspace`

打开 phpstorm，添加 php 设置和 server：

![php](/laradock-xdebug/php.png)

![php-option](/laradock-xdebug/php-set.png)

添加 php 时，要把 additional 里的两个内容填好。
options 内容如下图：
```
-dxdebug.remote_host=docker.for.win.localhost -dxdebug.remote_enable=1 -dxdebug.remote_port=9000 -dxdebug.remote_mode=req
```
![options](/laradock-xdebug/option.png)

![server](/laradock-xdebug/server.png)

建好以后，再添加 remote_debug：

![debug](/laradock-xdebug/debug.png)

配置好以后，启动 debug，打开电话按钮，添加断点刷新页面。
![start](/laradock-xdebug/start.png)


_注：_ 配置好 xdebug 后，如果需要安装 laravel，需要把 phpstorm 关掉。否则会拦截的 composer 的请求。
具体表现为执行任何 composer 的命令都没有反应。