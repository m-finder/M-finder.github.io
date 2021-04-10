---
title: php 和设计模式 - 单例模式
date: 2021-03-21 14:35:05
categories:
- 设计模式
tags:
---

对于一些全局使用的类，我们希望在应用中只实例化一个，避免因重复创建和销毁造成资源浪费，例如数据库连接、redis 连接等操作，这个时候就需要用到单例模式。

```php
class DB{
    /**
     * @var DB $db
     */
    private static $db;

    public static function getInstance(): DB
    {
        if (!(static::$db instanceof self)) {
            static::$db = new static();
        }
        return self::$db;
    }

    // 防止从外部实例化
    private function __construct()
    {

    }

    // 防止实例被克隆
    private function __clone()
    {

    }

    // 防止实例被反序列化
    private function __wakeup()
    {

    }

    public function connect()
    {
       echo 'connected', PHP_EOL;
    }

}

$db = DB::getInstance();
$db->connect();
```

单例模式是比较简单的一种模式，但是一定程度上违反了单一职责原则，所以也被认为是一种反模式，即经常出现，但存在一定问题的模式。