---
title: php 和设计模式 - 注册模式
date: 2021-03-21 14:35:13
categories:
- 设计模式
tags:
- 设计模式
---

注册模式通常将对象注册到一个全局的对象树上，需要的时候从对象树上取下需要的实例，就像卖糖葫芦的有木有。不过不一样的是糖葫芦会摘完，对象树摘下后并不会销毁该对象。

注册模式通常通过一个只有静态方法的抽象类来存放这些对象。或者通过单例模式。

```php
abstract class registry
{
    const LOGGER = 'logger';

    public static array $objects = [];

    public static function set($key, $value)
    {
        self::$objects[$key] = $value;
    }

    public static function get($key)
    {
        return self::$objects[$key];
    }
}

$key = Registry::LOGGER;
$logger = new stdClass();

Registry::set($key, $logger);
$storedLogger = Registry::get($key);
var_dump($storedLogger);
```
