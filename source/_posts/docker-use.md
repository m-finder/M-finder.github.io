---
title: Docker使用教程-入门
date: 2018-03-28 16:34:13
tags: 
- docker
categories: 
- 码不能停
---

docker已经装好了，但是完全不知道怎么用，先来点官网的例子看看吧。

docker自带的终端不太好用，所以先用xshell连接上终端，ip为终端启动时显示的：192.1168.99.100，默认应该都是这个。
账号密码是：docker / tcuser
```

                        ##         .
                  ## ## ##        ==
               ## ## ## ## ##    ===
           /"""""""""""""""""\___/ ===
      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
           \______ o           __/
             \    \         __/
              \____\_______/
 _                 _   ____     _            _
| |__   ___   ___ | |_|___ \ __| | ___   ___| | _____ _ __
| '_ \ / _ \ / _ \| __| __) / _` |/ _ \ / __| |/ / _ \ '__|
| |_) | (_) | (_) | |_ / __/ (_| | (_) | (__|   <  __/ |
|_.__/ \___/ \___/ \__|_____\__,_|\___/ \___|_|\_\___|_|
```

<!--more-->

#### 安装centos镜像

拉取一个centos的映像并在衍生容器内运行交互式终端：
```
docker run --interactive --tty centos bash
```

官网的例子是ubuntu，没玩过，所以换成了更熟悉点的centos

安装完成后会自动进入centos的控制台，输入exit可以退出。

#### 安装nginx

```
docker run --detach --publish 80:80 --name webserver nginx
```
装完以后，在你的宿主机，也就是装docker的电脑上打开浏览器，输入docker启动时输出的ip就能够看到nginx的欢迎页面了。

#### 删除镜像

1.停止所有的container，这样才能够删除其中的images：

docker stop $(docker ps -a -q)

如果想要删除所有container的话再加一个指令：

docker rm $(docker ps -a -q)

2.查看当前有些什么images

docker images

3.删除images，通过image的id来指定删除谁

docker rmi <image id>

想要删除untagged images，也就是那些id为<None>的image的话可以用

docker rmi $(docker images | grep "^<none>" | awk "{print $3}")

要删除全部image的话

docker rmi $(docker images -q)

