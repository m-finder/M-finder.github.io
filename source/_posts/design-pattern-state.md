---
title: php 和设计模式 - 状态模式
date: 2021-03-21 14:35:22
categories:
- 设计模式
tags:
- 设计模式
---

通过改变类的状态来实现对它行为的切换。


看代码还是比较好理解的：
```php
abstract class State
{
    protected string $state;

    public function getState(): string
    {
        return $this->state;
    }

    abstract public function handle();
}

class StateContext
{
    protected State $state;


    public function setState(State $state)
    {
        $this->state = $state;
    }

    public function getState(): string
    {
        return $this->state->getState();
    }

    public function handle()
    {
        $this->state->handle();
    }
}

class CreateOrder extends State
{
    public function __construct()
    {
        $this->state = 'create';
    }

    public function handle()
    {
        echo '创建订单', PHP_EOL;
    }
}

class FinishOrder extends State
{

    public function __construct()
    {
        $this->state = 'finish';
    }


    public function handle()
    {
        echo '结束订单', PHP_EOL;
    }
}

$stateContext = new StateContext();
$stateContext->setState(new CreateOrder());
$stateContext->handle();
echo $stateContext->getState(), PHP_EOL;

$stateContext->setState(new FinishOrder());
$stateContext->handle();
echo $stateContext->getState(), PHP_EOL;
```

将状态独立，然后在外部控制状态切换，已实现对其行为控制。

