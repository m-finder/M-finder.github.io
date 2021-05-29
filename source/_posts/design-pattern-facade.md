---
title: php 和设计模式 - 门面模式
date: 2021-03-21 14:35:24
categories:
- 设计模式
tags:
- 设计模式
---

门面模式也叫外观模式，主要是为子系统中的一组接口提供一个一致的接口，facade 模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。


一个简单的🌰：
```php
class Facade
{

    private Subsystem $subsystemA;
    private Subsystem $subsystemB;

    public function __construct(Subsystem $subsystemA, Subsystem $subsystemB)
    {
        $this->subsystemA = $subsystemA;
        $this->subsystemB = $subsystemB;
    }

    public function subsystemARun()
    {
        $this->subsystemA->run();
    }

    public function subsystemBRun()
    {
        $this->subsystemB->run();
    }
}


interface Subsystem
{
    public function run();
}

class SubsystemA implements Subsystem
{
    public function run()
    {
        echo '子系统 A 运行', PHP_EOL;
    }
}


class SubsystemB implements Subsystem
{
    public function run()
    {
        echo '子系统 B 运行', PHP_EOL;
    }
}

$subsystemA = new SubsystemA();
$subsystemB = new SubsystemB();
$facade = new Facade($subsystemA, $subsystemB);
$facade->subsystemARun();
$facade->subsystemBRun();
```

当需要为一个复杂子系统提供一个简单的接口时，门面模式非常适用。同时当需要构建一个层次结构的子系统时，门面模式也可以充当每层子系统的入口点，例如 MVC 框架。

这个模式跟在 laravel 框架中看的的还有所不同，在框架中，调用门面时，会通过魔术方法去调用背后真正的功能类方法，而且每个门面只负责一个独立的模块。相对来说，框架中的用法更符合单一职责。