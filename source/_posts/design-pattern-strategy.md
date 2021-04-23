---
title: php 和设计模式 - 策略模式
date: 2021-03-21 14:35:15
categories:
- 设计模式
tags:
- 设计模式
---

定义一组算法，把它们一个个封装起来，并使它们能够快速切换。本模式使得算法可以独立于使用它的客户而变化。一般用于避免多重条件判断和在运行时进行更改。

```php
interface Strategy
{
    public function algorithm();
}

class AlgorithmA implements Strategy
{

    public function algorithm()
    {
        echo '算法 A', PHP_EOL;
    }
}

class AlgorithmB implements Strategy
{

    public function algorithm()
    {
        echo '算法 B', PHP_EOL;
    }
}

class Context
{
    protected Strategy $strategy;

    public function __construct(Strategy $strategy)
    {
        $this->strategy = $strategy;
    }

    public function callAlgorithm()
    {
        $this->strategy->algorithm();
    }
}

$algorithmA = new AlgorithmA();
$contextA = new Context($algorithmA);
$contextA->callAlgorithm();

$algorithmB = new AlgorithmB();
$contextB = new Context($algorithmB);
$contextB->callAlgorithm();
```

跟工厂模式非常相似，但是策略模式属于行为型模式，并不会返回一个具体的对象，而是强调其行为。通过调用上下文将要调用的方法封装起来，客户端只要调用上下文的方法就可以了。

那么，跟工厂结合一下是不是更好呢？




