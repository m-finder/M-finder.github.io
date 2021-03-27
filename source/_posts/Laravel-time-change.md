---
title: Laravel转换时间为xx分钟前
date: 2018-05-08 16:37:28
tags: 
- laravel
categories:
- 码不能停
---

![示意图](/images/time.png)

<!--more-->

比如说有这样一个需求：一篇文章的发表时间：

```
**距离现在时间**      **显示格式**
< 1小时                 xx分钟前
1小时-24小时            xx小时前 
1天-10天                xx天前
>10天                   直接显示日期
```



其实laravel已经内置好了，只需要用Carbon就可以实现了。

#### 中文化显示
在 app\Providers\AppServiceProvider.php 中添加代码：
```
public function boot() {
    Carbon::setLocale('zh');
}
```

#### Model中调用
如果你想在某个类型的数据中人性化显示时间，那么就在该Model中添加以下代码：

```
public function getCreatedAtAttribute($date){
    // 默认100天前输出完整时间，否则输出人性化的时间
    if (Carbon::now() > Carbon::parse($date)->addDays(100)) {
        return Carbon::parse($date);
    }

    return Carbon::parse($date)->diffForHumans();
}
```
