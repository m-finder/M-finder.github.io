---
title: im 项目重构记录
date: 2021-04-15 23:00:00
categories:
- 码不能停
- laravel
- layim
tags:
---

仓库有一个 4 年前的老项目，基于 `融云` 和 `layim`的即时通讯。

当初水平太菜，只做出来一点基础功能，代码也烂的一塌糊涂。

一直想重构又一直在拖，不知不觉这么久过去了，真是一点都没有不好意思呢。 

(╯‵□′)╯︵┻━┻

> 特别声明，重构基于 laravel 8，最终会转化成 composer 包
 
#### 安装 laravel
先准备个全新的 laravel 项目，安装过程这里不再赘述。

新版 laravel 的权限管理目前也被独立成了扩展包，先选用最快速的：
```shell
composer require laravel/breeze --dev

npm install

npm run dev

php artisan migrate
```

迁移之前，确保用户表有以下字段：
```
'name',
'id',
'status',
'sign',
'avatar,
'token'
```

#### 安装融云 SDK

之前是直接把官方的 SDK 下载下来拖进了项目里，这次按正规流程来，先把它加到准备好的 laravel 项目中。

```shell
composer require rongcloud/php-sdk dev-master
```

#### 安装 layui

突然发现 layui 是支持 npm 安装的，那就试试吧：

```shell
npm i layui --save
```

新建文件 `resources/js/im.js`：

```javascript
require('layui/src/layui');

layui.use(function(){
    let layer = layui.layer
        ,form = layui.form;

    layer.msg('Hello World');
});
```

`webpack.mix.js` 添加以下内容，把 layui 的模块内容复制到 public 目录：

调试过程中，发现 layui 跟 laravel-mix 兼容性不是很好，需要修改一下：
```javascript
mix.js('resources/js/im.js', 'public/js')
    .css('node_modules/layui/src/css/layui.css', 'public/css')
    .copyDirectory('node_modules/layui/src/css/modules', 'public/js/css/modules')
    .copyDirectory('node_modules/layui/src/font', 'public/font')
    .copyDirectory('node_modules/layui/src/modules', 'public/js/modules')
```


最后，新建个页面：
```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>M-Chat</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="{{ mix('css/layui.css') }}">
</head>
<body>

<script src="{{ mix('js/app.js') }}" defer></script>
<script src="{{ mix('js/im.js') }}" defer></script>
</body>
</html>
```

注意底部位置，加上了 im.js 的引用。

执行 `npm run watch-poll`，然后页面访问下域名，可以看到如下内容即说明已经配置成功。

![hello-world](/images/layui-hello-world.png)


#### 安装 layim
这个就不能 npm 了，自己去下载，然后把 `layim.js` 和 `layim-assets` 拖到下边对应的目录，然后再次修改 `webpack.mix.js`:

```javascript
mix.js('resources/js/im.js', 'public/js')
    .css('node_modules/layui/src/css/layui.css', 'public/css')
    .copyDirectory('node_modules/layui/src/css/modules', 'public/js/css/modules')
    .copyDirectory('node_modules/layui/src/font', 'public/font')
    .copyDirectory('node_modules/layui/src/modules', 'public/js/modules')
    .copyDirectory('resources/js/modules', 'public/js/modules')
    .copyDirectory('resources/js/layim-assets', 'public/js/css/modules')
```

在上边的基础上又加了两行，注意区分，当然如果你也可以直接把这两个东西拖到 public 下对应目录，只是不推荐。

再次打开 `im.js`，添加 layim demo：
```javascript
layui.config({
    layimPath: '/js/modules/' //配置 layim.js 所在目录
    , layimAssetsPath: '/js/css/modules/' //layim 资源文件所在目录
}).extend({
    layim: layui.cache.layimPath + 'layim' //配置 layim 组件所在的路径
}).use('layim', function (layim) { //加载组件
    //先来个客服模式压压精
    layim.config({
        brief: true //是否简约模式（如果true则不显示主面板）
    }).chat({
        name: '一个新窗口'
        , type: 'friend'
        , avatar: 'http://tp1.sinaimg.cn/5619439268/180/40030060651/1'
        , id: -2
    });
});
```

等待自动编译，然后再次刷新页面，可以看到以下内容：
![layim-window](/images/layim-window.png)

> ps. 大哈是谁，大哈是个逗比。😏

现在，你已经有了个客服模式的窗口了，只是还不能收发信息。

#### 准备工作

好了，前边的这些东西还只是开胃前菜而已，真正的工作才刚开始。

首先，安装融云客户端 js：
```shell
 npm install @rongcloud/imlib-v4 --save
```

然后在 im.js 中引入它，然后再加一堆对它的调用，官网文档上也有，不过还是贴出来吧：
```javascript
```

好了，到这里准备工作就差不多了，下边开始愉快的敲代码了。

#### happy coding
过程略。

#### 成果展示
喏，成了。

快来给你的 laravel 增加一个 im 吧！



