---
title: php 和设计模式 - 模板方法模式
date: 2021-03-21 14:35:16
categories:
- 设计模式
tags:
- 设计模式
---

这个模式是对继承的最好诠释。当子类有重复动作时，将其重复动作放入父类统一处理，这就是模板方法最简单通俗的解释。

```php
abstract class BaseController
{
    public function baseMethod()
    {
        echo 'base method', PHP_EOL;
    }

    public abstract function operate();
}

class UserController extends BaseController {

    public function operate()
    {
        echo 'user operate', PHP_EOL;
    }
}

$user = new UserController();
$user->baseMethod();
$user->operate();
```

这个模式太简单了，就不多说了。
