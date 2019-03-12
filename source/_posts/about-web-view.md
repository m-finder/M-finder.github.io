---
title: 前端之路多坎坷 - hexo主题开发历程
date: 2018-08-30 13:06:35
tags: [js,hexo]
categories: 码不能停
---
#### 前言
今天突然觉得，应该给博客升下级。

2月份把博客迁移到hexo时，嫌官方模板太丑，好看的模板又被用的烂了大街，当时苦于对hexo的力量一无所知，只是简单地拿官方模板改了一下就直接用了，改完还在博客立下flag：“以后打死不再折腾博客了”，

后来，我把那句话删了，带着脸上一阵阵的疼，又给博客偷偷改了些东西，就这么将就着一直到了今天，不完美突然变得无比刺眼，看着这个博客，总有丝嫌弃在心里翻滚。

还是再改一次吧！最喜欢脸疼的感觉了，折腾不死就该继续坚持…

<!--more-->

#### 一束光，突然照亮
今天查找资料时，看到一句直击内心的话
```
当你看到你用的主题出现在两个以上的博客的时候，那你就要考虑自己写一个了。
```
这一瞬间，突然觉得所有的折腾都是值得的。我并不是唯一的“强迫症患者”，有这么一群人，也在跟我一样忍受着同样的折磨而做着同样的事情，真好。

就像一束光，照亮了身边的黑暗。

#### 那么，开始吧
###### 环境搭建
这一步参考以及一些基础操作请参考hexo官方的文档。

吐槽下官方文档实在是坑，想开发个主题愣是没找到可用资料，国内关于hexo的资料虽然多但大多重复，嫌弃脸。

###### 模板引擎
hexo内建了swig模板引擎，也可以下载插件使用ejs、haml和jade，四个里边ejs我最熟悉，所以这次继续使用，有机会再研究下另外几个组件。 

###### css预处理器
按需使用。这里我准备用less，刚学会，多用几次加深掌握程度。

#### 主题搭建
###### 文件结构
一般来说，一个主题内有两层文件夹，一个layout用来放置视图文件，一个source用来放相关的静态资源，

###### 环境搭建
正常情况下载本地预览博客，需要在命令行跑hexo server，但是频繁更新主题文件后，需要多次重启，非常麻烦，有幸见到大神推荐的两个插件 hexo-server和hexo-browsersync避免了这些尴尬。

```
npm install hexo-server hexo-browsersync --save-dev
```

先安装，用法后边再说。

#### yeoman生成主题结构

yeoman是一个生成主题目录结构的脚手架工具，为了偷懒，来吧。
 ``` 
 npm install yo  -g
 npm install generator-hexo-theme -g
 ```
 
进入刚才创建好的hexo项目的themes文件夹，执行 
``` 
yo hexo-theme 
```
，根据提示选择自己的配置。

```
C:\www\hexo-themes-build\themes\hexo-theme-fox>yo hexo-theme
--=[ generator-hexo-theme ]=--
? What is the theme name? hexo theme fox
? Which template language to use? ejs
? Which stylesheet language to use? less
? Other technical features
   create layout\archive.ejs
   create layout\category.ejs
   create layout\index.ejs
   create layout\layout.ejs
   create layout\page.ejs
   create layout\partials\recent-posts.ejs
   create layout\post.ejs
   create layout\tag.ejs
   create source\favicon.ico
   create source\css\hexo theme fox.less
   create source\js\hexo theme fox.js
   create _config.yml
```

运行完以后，目录下会创建出新的主题文件，so easy。把站点配置文件中的主题切换到新主题，这时候用hexo s 运行一下，可以看到一个完全没有css样式的博客，当然这些就需要我们自己来做了。

重点来了：
hexo s 很烦，装完hexo-server以后，找到项目根目录的package.json，在下边添上一行：
```
"scripts": {
    "dev": "hexo s -p 4000"
}
```
好像，package.json俗称为npm scripts。写好以后，编辑器配下npm run就好了。

#### 页面书写
页面主要结构是已经生成好了的，充分发挥你的想象力吧。


#### 插件引入
* 字数统计 > npm i --save hexo-wordcount
* 站内查询 > npm i --save hexo-generator-search

###### 主题还在紧张的制作中，什么时候见面，随缘吧。

###### 待做清单
* ~~文章目录，跟随滚动条自动切换~~
* 图片放大查看
* 音乐播放器 hexo-tag-aplayer
* 视频播放器
* 评论
* ~~归档页时间轴~~
* 本地搜索
* ~~标签页~~
* ~~404页面~~
* 详情页上下篇
* ~~页面切换动画~~