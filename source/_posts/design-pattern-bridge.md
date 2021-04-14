---
title: php 和设计模式 - 桥接模式
date: 2021-03-21 14:35:09
categories:
- 设计模式
tags:
- 设计模式
---

桥接模式也是一个典型的单一职责模式。

在组件设计过程中，如果职责划分不够清晰，当父类发生变更，子类也需要跟着变动，要么违背开闭原则，要么导致子类数量膨胀。桥接模式，就是为了解决这个问题。

桥接模式的做法是，使抽象和实现完全分离，使其能够独立变化。或者也可以直白一点，通过组合/聚合的方式避免继承滥用。

举个🌰：
```php
abstract class Shape
{
    protected Color $color;

    public function setColor(Color $color)
    {
        $this->color = $color;
    }

    public abstract function draw();
}

class Circle extends Shape
{
    public function draw()
    {
        $this->color->setColor();
        echo 'circle', PHP_EOL;
    }
}

interface Color{
    public function setColor();
}

class Blue implements Color{

    public function setColor()
    {
       echo 'blue', PHP_EOL;
    }
}

$shape = new Circle();
$shape->setColor(new Blue());
$shape->draw();
```

抽象部分使用继承，实现部分使用组合。

后续如果我们需要换成另外一个颜色，只需要稍作改动即可实现：
```php
class Red implements Color{
    public function setColor()
    {
        echo 'red', PHP_EOL;
    }
}

$shape = new Circle();
$shape->setColor(new Red());
$shape->draw();
```


