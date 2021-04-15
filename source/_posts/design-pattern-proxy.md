---
title: php 和设计模式 - 代理模式
date: 2021-03-21 14:35:10
categories:
- 设计模式
tags:
- 设计模式
---

说到代理这个词，首先想到的是梯子，它帮助我们解决了网络问题，但是怎么处理的，我们不关心，因为这对大多数人来说属于相对生疏的专业领域。那么代理模式也是一样的道理：为其他对象提供一种代理以控制对这个对象的访问，并允许在将请求提交给对象前后进行一些处理。

按照惯例，来个🌰：
```php

interface RequestInterface
{
    public function getRequest();

}

class Request implements RequestInterface{

    public function getRequest()
    {
        echo 'get request', PHP_EOL;
    }
}

class Proxy implements RequestInterface
{

    protected Request $request;

    public function __construct()
    {
        $this->request = new Request();
    }


    public function getRequest()
    {
        echo 'add log in proxy', PHP_EOL;
        $this->request->getRequest();
    }
}


$proxy = new Proxy();
$proxy->getRequest();
```

代理模式和适配器模式的区别：
1. 适配器模式是为了改变和适配代理类的接口
2. 代理模式不改变所代理类接口。


代理模式和装饰模式的区别：
1. 装饰模式是为了增强功能
2. 代理模式是为了加以控制
