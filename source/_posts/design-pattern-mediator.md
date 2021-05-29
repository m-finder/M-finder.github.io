---
title: php 和设计模式 - 中介者模式
date: 2021-03-21 14:35:24
categories:
- 设计模式
tags:
- 设计模式
---

最近太忙，拖更好多天，难受……

废话不多说，先来看看概念：用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地互相引用，从而使其耦合松散，而且可以肚里地改变它们之间的交互。

也就相当于你租了个房子，但是房东常年旅居国外，有事情你也不需要找房东，因为房东把所有事情都委托给了中介。

令人羡慕的房东啊……


举个🌰：
```php
<?php

// 中介者模式

interface MediatorInterface
{
    public function send($service, string $message);
}

class Mediator implements MediatorInterface
{

    public function send($service, string $message)
    {
        $service->notify($message);
    }
}

abstract class Colleague
{
    private MediatorInterface $mediator;

    protected Colleague $colleague;

    public function setColleague(Colleague $colleague)
    {
        $this->colleague = $colleague;
    }

    public function getColleague(): Colleague
    {
        return $this->colleague;
    }

    public function setMediator(MediatorInterface $mediator)
    {
        $this->mediator = $mediator;
    }

    public function getMediator(): MediatorInterface
    {
        return $this->mediator;
    }

    public abstract function notify(string $message);
}


class ClientA extends Colleague
{

    public function send($message)
    {
        return $this->getMediator()->send($this, $message);
    }

    public function notify(string $message)
    {
        echo get_class($this->getColleague()), ' 收到消息：',  $message, PHP_EOL;
    }
}

class ClientB extends Colleague
{

    public function send($message)
    {
        return $this->getMediator()->send($this, $message);
    }

    public function notify(string $message)
    {
        echo get_class($this->getColleague()), ' 收到消息：', $message, PHP_EOL;
    }

}

$mediator = new Mediator();
$clientA = new ClientA();
$clientB = new ClientB();


$clientA->setMediator($mediator);
$clientB->setMediator($mediator);

$clientA->setColleague($clientB);
$clientB->setColleague($clientA);

$clientA->send('吃饭了没？');
$clientB->send('没呢，要请客？');
```

这个模式比较适用于通讯类产品，聊天啊、直播什么的，可以实现用户与用户之间的结偶，不需要让一个用户去维护所有管理的用户对象，但是同时也存在一些问题，比如当业务逻辑更加复杂时，中介类就会更加复杂和庞大，所以应用的同时也要考虑该如何取舍。

ok，以上就是终结者模式了，代码还是比较通透的。