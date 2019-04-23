---
title: laravel 项目实战
date: 2019-04-23 23:59:59
tags: [laravel,php]
categories: 码不能停
---


在开发中加深学习，laravel 5.8 项目实战走起。
<!-- more -->


#### 准备工作

###### 创建项目
github 创建项目，然后 clone 到本地，加上 laradock 支持。

```git
git submodule add https://github.com/Laradock/laradock.git
```

###### 配置 laradock
生成 laradock 配置文件：
```
copy env-example .env
```

修改 `.env` 中的目录和需要安装的组件等信息。

###### 启动环境
```
docker-compose up -d nginx mysql redis
```

等待安装完成。

###### 安装 laravel
进入 workspace 容器，执行命令：
```composer
composer create-project laravel/laravel app
```

###### 配置 nginx

在 `laradock/nginx/sites` 下执行：

```shell
copy laravel.conf.example project.conf
```

然后配置域名和文件夹，在本地 hosts 中加入新域名后重启 nginx。

这里推荐一个 hosts 编辑器： `switchhosts`

访问域名能显示 laravel 即为正常。
#### 开始开发
