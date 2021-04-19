---
title: php 和设计模式 - 依赖注入模式
date: 2021-03-21 14:35:13
categories:
- 设计模式
tags:
- 设计模式
---

依赖注入是控制反转的一种实现方式。要实现控制反转，需要将创建被调用者实例的工作交由 IOC 容器完成，然后在调用者中注入被调用者，通常使用构造器或方法注入实现。这样我们舅实现了调用者和被调用者的解偶，这个过程就是依赖注入。

那么控制反转是什么呢？其实也就是 A 依赖于 B，常规做法是在 A 中直接实例化 B，那么控制反转就是将 B 在外部势力话，然后传入 A 去使用。看完以后，其实对依赖注入也就有了理解。

```php
class Computer
{

    protected HardDisk $hardDisk;

    public function __construct(HardDisk $disk)
    {
        $this->hardDisk = $disk;
    }

    public function run()
    {
        $this->hardDisk->run();
        echo '一台没有感情的电脑开始运行', PHP_EOL;
    }
}

class  HardDisk
{
    public function run()
    {
        echo '一块没有感情的硬盘开始运行', PHP_EOL;
    }
}

$disk = new HardDisk();
$computer = new Computer($disk);
$computer->run();
```

以上代码就是一个简单的依赖注入，你以为这就结束了？并没有，咱们在学一下 IOC 容器：

```php
class Container
{

    public array $bindings = [];

    public function bind($key, Closure $value)
    {
        $this->bindings[$key] = $value;
    }

    public function make($key)
    {
        $new = $this->bindings[$key];
        return $new();
    }

}

$container = new Container();

$container->bind('disk', function (){
    return new HardDisk();
});
$container->bind('computer', function () use($container){
    return new Computer($container->make('disk'));
});

$computer = $container->make('computer');
$computer->run();
```

ok，以上就是依赖注入的全部代码了。