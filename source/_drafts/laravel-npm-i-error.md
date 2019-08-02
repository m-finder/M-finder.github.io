---
title: laravel 执行 npm install 报错
date: 2019-08-01 17:03:00
tags: laravel
categories: [larave,码不能停]
---

报错：
```
npm WARN tar ENOENT: no such file or directory, futime
```

解决办法：
```
rm -rf node_modules && npm install
```
