---
title: Docker安装教程
date: 2018-03-27 15:34:30
tags:
- docker
categories:
- 码不能停
---

Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从Apache2.0协议开源。

Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

docker官方推荐了两种安装方式:app和toolbox。

![Docker](/images/docker.jpg)
<!--more-->

注：app方式对系统版本和配置会有一定要求，Mac版本会自动为你安装好VM（虚拟机），但Windows版本需要你安装微软虚拟化产品Hyper-V，而toolbox方式则需要你额外安装virtualbox来作为docker的VM。

[App-mac](https://docs.docker.com/docker-for-mac/)
[App-win](https://docs.docker.com/docker-for-windows/)

[Toolbox](https://www.docker.com/products/docker-toolbox)


#### centos 安装

_<font color=red>注意：docker要求centos在3.0以上</font>_

可以用 uname -r 查看centos内核：
```
uname -r

[root@localhost ~]# uname -r
2.6.32-696.20.1.el6.x86_64

```

好可惜，我的虚拟机不支持,升级个内核再继续装。

Docker 软件包和依赖包已经包含在默认的 CentOS-Extras 软件源里，安装命令如下：
```
yum -y install docker
```
如果出现 <font color=red>No package docker available</font>
yum没有找到docker包，更新epel第三方软件库，运行命令：

```
sudo yum install epel-release
```
然后再运行：
```
sudo yum install docker-io
```
安装完就可以愉快地安装了。

![安装](/images/yum.png)

![安装完成](/images/yumdone.png)


#### docker 启动

启动docker:
```
service docker start
```

测试运行 hello-world
```
docker run hello-world
```

![测试运行](/images/hello.png)

由于本地没有hello-world这个镜像，所以会下载一个hello-world的镜像，并在容器内运行。

#### windows安装

_<font color=red>注意：win7，8和10的家庭版需要docker toolbox安装</font>_

[点我下载：](https://docs.docker.com/toolbox/toolbox_install_windows/)

安装完成后，桌面会多这三个图标出来。强行给我乔巴照相，哈哈！
![安装完成](/images/winok.png)

点击 Docker QuickStart 图标来启动 Docker Toolbox 终端。

如果系统显示 User Account Control 窗口来运行 VirtualBox 修改你的电脑，选择 Yes

![启动](/images/启动.png)

输入一下命令调用测试：
```
docker run hello-world
```

![启动测试](hello-win.png)

##### win10专业版

win10专业版自带hyper-v,用来装docker更方便。（hyper-v是win系统自带的一个虚拟机工具）

找到程序和功能，打开启用和关闭功能，然后勾选hyper-v

然后下载安装 [Toolbox](https://www.docker.com/get-docker.png)

安装完成后会自动打开，右下角的系统通知栏有个小鲸鱼的图标，这表示docker在运行。

到这里就安装好了，更多姿势我们可以在启动器输入 docker 来解锁。
