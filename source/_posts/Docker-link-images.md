---
title: Docker使用教程-连接容器-php-nginx
date: 2018-04-12 15:12:21
tags: Docker
categories: 码不能停
---

一直想在一个容器内把 php 的环境搭建好，直到我看到了一句话：
>将所有服务放在一个容器内的模式有个形象的非官方称呼：Fat Container。与之相对的是将服务分拆到容器的模式。从Docker的设计可以看到，构建镜像的过程中可以指定唯一一个容器启动的指令，因此Docker天然适合一个容器只运行一种服务，而这也是官方更推崇的。

好吧，我不闹了。

<!--more-->
那就先用最简单的方式搭建一遍试试：

```
docker run -itd --name php-fpm -v /docker/www:/var/www/html:ro php:7.2-fpm
```

先启动 php ，并把容器命名为 php-fpm ,本地不存在 php 镜像的话会自动下载。

因为是在 windows 上跑，还特么是 win10 家庭版，所以只有打开 VirtualBox 来设置下共享文件夹：

![设置共享文件夹](Docker-link-images/set.png)
ok，重启虚拟机。

然后再执行下边命令：
```
docker run -itd --name nginx-server -p 80:80 --link php-fpm:php-fpm -v  /docker/www:/usr/share/nginx/html:rw -v /docker/nginx/conf.d:/etc/nginx/conf.d:rw nginx
```

* 第一个 -v 是挂载本地目录
* 第二个是挂载配置文件

除了要在 www 里创建一个 index.html外，还需要一个 default.conf 文件

打开浏览器：192.168.99.100：
![ok](Docker-link-images/hello.png)

最后，docker 文件夹的结构：
```
C:\DOCKER
├─nginx
│  └─conf.d
│          default.conf
│
└─www
        index.html
        index.php
```

default.conf 是 nginx 的配置文件，内容如下：
```
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    location ~ \.php$ {
        fastcgi_pass   php-fpm:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /var/www/html/$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

最重要的是 /var/www/html这里是 php 文件的存储路径，不是 nginx 的项目根目录，一定要对，否则死的很惨。

另外，如果你也遇到了这个错误：
>FastCGI sent in stderr: "Primary script unknown" while reading response head

可能是因为 /var/www/html/目录配置不正确，也可能是权限没给对，再遇到的可怜人不要在跳坑里挣扎了。😋