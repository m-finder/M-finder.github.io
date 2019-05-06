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

laradock 作为子模块加入，后期克隆项目时，要在项目根目录执行命令下载子模块：
```git
git submodule update --init --recursive
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

修改相关配置，并下载要用到的组件。
```
semantic-css # 放到 resources
composer require predis/predis
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

###### 配置 fontawesome 字体图标：

```shell
npm install --save @fortawesome/fontawesome-free
```

安装完成后，直接调用：
```html
<i class="fa fa-anchor" aria-hidden="true"></i>
```

[ [ 图标库 ] ](https://fontawesome.com/icons?d=gallery)

###### 配置 jquery-pjax 和 nprogress
pjax 可以使页面的切换和跳转更加友好，但是好像对 seo 不太好，所以要用的慎重。

nprogress 是一个加载的样式组件，和 pjax 组合使用。
```shell
npm install --save jquery-pjax nprogress
```


安装完成后，在resources/js/bootstrap.js 中加入引用：
```javascript
window.pjax = require('jquery-pjax/jquery.pjax');
window.nprogress = require('nprogress');

$(document).pjax('a[pjax]', 'body')

$(function (){
    $(document).on('pjax:start', function() {
        nprogress.start();
    })
    $(document).on('pjax:end', function() {
        nprogress.done()
    })
    $('[data-toggle="tooltip"]').tooltip()
})
```

需要 pjax 切换的 a 标签加上 pjax 即可。

###### 编译前端文件
laravel 内置 mix 用来编译前端资源，只需要在项目根目录运行 `npm run watch-poll` 遍可以实现监听。

出现问题时请重复尝试，或者先切出文件夹，然后再切入重试。
