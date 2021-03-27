---
title: Pjax的正确使用
date: 2018-03-14 21:03:52
tags: 
- js
categories: 
- 码不能停
---

以前偶然之间接触到pjax这个插件，眼前一亮，被它惊艳到了。

顿时觉得心痒难耐，便着手测试想要加在博客里，几经折腾，页面的跳转总算是改善许多，但是离我所见到的完美却总是差一步：每次跳转页面都会闪一下。

奈何文档太少，或者说我所遇到的问题水平太low，这个问题也就一直伴随着我的博客。
<!--more-->

服务器到期后，我就把博客迁到了github，用着还挺满意，还拉了几个同学也来用这个，这两天有个同学换了套别人做的模板，让我又见识到了pjax的魅力。

妈蛋，不能忍。

看文档没能解决我的问题，那我找别人的源码去。

于是今天下班路上，扒了几篇码云的源码，终于是解决了这个伴随已久的不完美！

```
<script type="text/javascript">
    layui.config({
        base: '/js/'
        ,version: false
    }).extend({
        index: 'index'
        ,pjax: 'pjax'
    }).use(['pjax','index'],function (){
        var $ = layui.jquery;
            $(function () {
                $(document).pjax('a', '#main',{fragment:'#main'});
                $(document).on('pjax:start', function () {
                    NProgress.start();
                });
                $(document).on('pjax:end', function () {
                    NProgress.done();
                });
                
            });
    });
</script>
```

因为引入了layui，虽然在这个版本的博客里没什么大用，我还是把pjax裹了一层做成了layui的扩展。

之前我是这么写的：
```
 $(document).pjax('a', '#main');
```

今天在对比之下，发现我少了 {fragment:'#main'}，加进去一试，好了。

原来我曾经离完美只差一步之遥。

这个东西应该是指定新页面所替换的位置，也就是在拿到新页面的内容以后会在这个元素里边替换。

应该就是这么个意思吧……

解决了，挺开心的，就是觉得我真的该再下下功夫学英文了。