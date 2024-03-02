---
title: 职业生涯知识回顾-关于抽象类和接口的思考
date: 2024-03-03 01:54:00
tags:
- 码不能停
categories:
- 码不能停
---

抽象类和接口是两个很容易产生疑惑的概念，分不清它们的使用场景，其实只要记住两点就比较好理解：
1. 接口是对行为的抽象
2. 抽象类是对子类有哪些属性和行为的抽象

当你需要对一个类有哪些行为进行约束时，使用接口；需要为其他类提供一个模板以及一些通用的属性和行为，使用抽象类。

在理解什么是抽象类和接口的前提下，延伸出一些思考：在一定程度上，接口似乎是比抽象类更底层的存在，是否可以理解为先有行为，对行为进行组合才能有类？

那么下面代码中，抽象类对接口的实现有没有实际意义？

```php
<?php

interface IAnimal
{
    public function move(): void;

    public function sleep(): void;

    public function eat(): void;
}

interface Wag
{
    public function wag();
}

interface Climb
{
    public function climb();
}

abstract class AbstractAnimal implements IAnimal
{
    abstract function move(): void;

    public function sleep(): void
    {
        echo 'sleeping', PHP_EOL;
    }

    public function eat(): void
    {
        echo 'eating', PHP_EOL;
    }
}

class Dog extends AbstractAnimal implements Wag
{
    function move(): void
    {
        echo 'dog running', PHP_EOL;
    }

    public function wag(): void
    {
        echo 'wagging', PHP_EOL;
    }
}

class Cat extends AbstractAnimal implements Climb
{
    function move(): void
    {
        echo 'cat walking quietly', PHP_EOL;
    }

    public function climb(): void
    {
        echo 'climbing', PHP_EOL;
    }
}
```

如果更进一步，抽象类的方法和接口相同，并且都是抽象方法的情况下，接口和抽象类谁更有存在的意义？

抽象类是为了提高代码复用，定义类之间的层次关系，接口是为了实现多态性和解耦。我们要知道两者并不是对立关系，甚至目标一致，都是为了提高代码质量。

工具是死的，但人是活的，所以我认为使用者并不用太过于纠结，代码没有百分百完美，也不是死板的教条。只要在需求和设计目标明确的前提下，选择抽象类或接口，甚至组合起来使用都是可以的，解决实际问题才是我们最终的目的……

最后，再来回答一下前边的三个问题：
1. 抽象类和接口的层级关系：抽象类可以被视为介于接口和类之间的一种中间形式。
2. 抽象类实现接口的意义：统一接口规范，确保抽象类和子类都遵循接口的约束。
3. 全抽象方法的抽象类和接口谁更有意义：如果只是定义方法契约而不提供具体实现，接口更有意义；抽象类有明确扩展目标时，保留抽象类。