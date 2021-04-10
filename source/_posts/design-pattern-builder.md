---
title: php 和设计模式 - 生成器模式
date: 2021-03-21 14:35:06
categories:
- 设计模式
tags:
- 设计模式
---

生成器模式也叫建造者模式，主要用于将一个复杂对象的构造与它的表示分离。该模式允许你使用相同的代码生成不同类型和形式的对象。

什么是复杂对象呢？举个🌰，人类，都有个脑袋，有个身体，又有两条胳膊腿儿，那么，我们就可以把人看作是一个复杂对象。

那么，对于生成器模式来说，我们要把人类对象的创建与它的实例表示进行分离。

```php
class Human
{

    public function setHead(string $head)
    {
        echo 'head:', $head, PHP_EOL;
    }

    public function setBody(string $body)
    {
        echo 'body:', $body, PHP_EOL;
    }

    public function setArms(string $leftArm, string $rightArm)
    {
        echo 'left arm:', $leftArm, ' right arm:', $rightArm, PHP_EOL;
    }
}

interface Builder
{
    public function buildHead();

    public function buildBody();

    public function buildArms();

    public function getResult(): Human;
}


class HumanBuilder implements Builder{
    private Human $human;

    public function __construct()
    {
        $this->human = new Human();
    }

    public function buildHead()
    {
        $this->human->setHead('ai');
    }

    public function buildBody()
    {
        $this->human->setBody('body');
    }

    public function buildArms()
    {
        $this->human->setArms('left', 'right');
    }

    public function getResult(): Human
    {
        return $this->human;
    }
}

class Director{


    public function builder(Builder $builder): Human
    {
        $builder->buildHead();
        $builder->buildBody();
        $builder->buildArms();
        return $builder->getResult();
    }
}

$director = new Director();
$human = $director->builder(new HumanBuilder());
```    

好了，生成器模式到此结束。

