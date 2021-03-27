---
title: Layim模块化右键菜单
date: 2017-12-27 09:40:33
tags:
- js
- layui
- layim
categories:
- 码不能停
---

一直觉得社区那群“先驱”搞的右键菜单要么太丑，要么风格不统一，很难受。

这两天仔细看了看心姐的源码，把历史消息里的右键菜单揪出来改了一把，感觉很良好。

演示地址已挂，请在本地搭建后测试。

调用方法，先引用上边暴露出来的方法，然后：
```
layim.on('ready', function (options) {
    $(".layim-list-friend >li > ul > li").menu({
        menu: [{
                text: "新增",
                callback: function () {
                    alert("新增");
                }
            }, {
                text: "复制",
                callback: function () {
                    alert("复制");
                }
            }, {
                text: "粘贴",
                callback: function () {
                    alert("粘贴");
                }
            }, {
                text: "删除",
                callback: function () {
                    alert("删除");
                }
            }
        ]
    });
});
```
代码下载地址：
[码云](https://gitee.com/M-finder/Layim-contextmenu)
[Github](https://github.com/M-finder/Layim-contextmenu)