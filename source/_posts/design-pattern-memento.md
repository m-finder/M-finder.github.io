---
title: php 和设计模式 - 备忘录模式
date: 2021-03-21 14:35:21
categories:
- 设计模式
tags:
- 设计模式
---

在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存该对象的内部状态。这样就可以方便的恢复到之前保存的状态。


```php
class Memento
{

    protected string $state;

    public function __construct(string $state)
    {
        $this->state = $state;
    }


    public function getState(): string
    {
        return $this->state;
    }
}

class Originator
{

    protected Memento $memento;

    protected string $state;

    public function setMemento(Memento $memento): Memento
    {
        $this->memento = $memento;
       return $this->memento;
    }

    public function getMemento(): Memento
    {
        return $this->memento;
    }

    public function getState(): string
    {
        $this->state = $this->memento->getState();
        return $this->state;
    }
}

$state = 'new state';
$originator = new Originator();
$memento = new Memento('memento state');
echo $memento->getState(), PHP_EOL;

$originator->setMemento($memento);
echo $originator->getState(), PHP_EOL;
```

好了，以上就是一个简易版的备忘录模式了，还是比较好理解的。