---
title: laravel 导入 excel 报错排查记录
date: 2021-04-21 21:22:13
categories:
- laravel
tags:
- laravel
---

今天公司项目导入 excel 时突遇一个报错：`Undefined index: Sheet1`，一下给我整懵逼了，一通排查，发现是因为执行过 composer update，把一个包升级到了最高，然后，它就不能用了。

看官方 issues 说：
> This is a known bug in PhpSpreadsheet PHPOffice/PhpSpreadsheet#1895. Until they release a new version, you have to lock the phpspreadsheet version to 1.16

 
啥意思呢，翻译一下吧：
这是PhpSpreadsheet PHPOffice / PhpSpreadsheet＃1895中的一个已知错误。在他们发布新版本之前，您必须将phpspreadsheet版本锁定为1.16

版本太高有时候也不是个好事呀！

[issuse](https://github.com/Maatwebsite/Laravel-Excel/issues/3057)