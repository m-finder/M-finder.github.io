---
title: 结合layui流加载实现的瀑布流
date: 2018-03-23 14:35:14
tags: [js,layui]
categories: 码不能停
---

最近在用layui做一个社区站点，有个页面想做成瀑布流形式，但是layui本身的流加载并没有实现这个功能，所以在研究了几个臃肿的插件源码后，自己做了一个可以结合layui流加载使用的轻量级瀑布流插件，用起来也比较简单。

![](/images/layui.png)
<!--more-->


图丢了，演示效果无。

#### 使用说明：
<font color=red>友情提示：如果不熟悉layui的用法，请百度过去仔细阅读一下文档。</font>

* 在页面中用layui的定义的模式扩展引入common.js
* ajax加载数据信息，获得数据总分页数
* laytpl渲染数据
* 流加载判断是否还有下一页数据
* waterfall整理页面元素的定位

javascript 内容：

common.js
```
layui.define(['jquery', 'element', 'util', 'laytpl'], function (exports) {

    var $ = layui.jquery
            , element = layui.element
            , layer = layui.layer
            , util = layui.util
            , laytpl = layui.laytpl;

    var gather = {
        waterfall: function () {
            var box = $(".layui-col-md3");
            var boxWidth = box.eq(0).width();
            var num = Math.floor($("#zone-list").width() / boxWidth);
            var boxArr = [];
            box.each(function (index, value) {
                var boxHeight = box.eq(index).height();
                if (index < num) {
                    boxArr[index] = boxHeight;
                } else {
                    var minboxHeight = Math.min.apply(null, boxArr), minboxIndex = $.inArray(minboxHeight, boxArr);
                    $(value).css({
                        "position": "absolute",
                        "top": minboxHeight + 15,
                        "left": box.eq(minboxIndex).position().left
                    });

                    boxArr[minboxIndex] += box.eq(index).height() + 15;
                    if (boxHeight + minboxHeight > $("#zone-list").height()) {
                        $("#zone-list").height(150 + boxArr[minboxIndex]);
                    }
                 }
            });

        },
        json: function (url, data, func, options) {
            var that = this, type = typeof data === 'function';
            if (type) {
                options = func
                func = data;
                data = {};
            }
            options = options || {};
            return $.ajax({
                type: options.type || 'post',
                dataType: options.dataType || 'json',
                data: data,
                url: url,
                success: function (res) {
                    func && func(res);
                }, error: function (e) {
                    layer.msg('请求异常，请重试', {shift: 6});
                    options.error && options.error(e);
                }
            });
        },

    };
    exports('common', gather);
});
```

调用
```
var action = '/zone';
common.json(action, '', function (res) {
    flow.load({
        elem: '#zone-list'
        , isAuto: true
        , isLazyimg: true
        , mb: 100
        , done: function (page, next) {
            var lis = [];
            common.json(action, {page: page}, function (res) {
                var getTpl = zonesTpl.innerHTML, view = document.getElementById('zone-list');

                layui.each(res.data.data, function (index, item) {
                    laytpl(getTpl).render(item, function (html) {
                        lis.push(html);
                    });
                });
                
                if (page < res.data.last_page) {
                    next(lis.join(''), true);
                } else {
                    next(lis.join(''), false);
                }
                common.waterfall();
            });
        }
    });
});
```

html内容：
```
<script id="zonesTpl" type="text/html">
    <div class="layui-col-md3"> 
        <div class="zone-box">
            <div class="dt_text"> 
                <span class="zone-word">@{{ d.content }}</span>
            </div>
            @{{# var img =  layui.jquery.grep(d.imgs.split(','), function(n) {return layui.jquery.trim(n).length > 0;}) }}
            <div class="img_box base-img-w img-w-@{{ img.length }}" >
                <a class="img_w " href="javascript:;">
                    @{{#  for(var k=0;k< img.length;k++){ }}
                    <img src="@{{ img[k] }}" >
                    @{{# } }}
                </a>
            </div>
        </div>
    </div>
</script>
```

好了，就是这么简单。