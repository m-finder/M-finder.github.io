---
title: php 和设计模式 - 访问者模式
date: 2021-03-21 14:35:23
categories:
- 设计模式
tags:
- 设计模式
---

这个模式就比较复杂，首先从概念来说，就是将对象的操作外包给其他对象，也就是访问者，从而实现在不改变个元素的前提下定义作用于这些元素的新操作。

当一个基类可以被访问，并具有名为 acceptVisitor 的公共方法，改方法接受参数 Visitor，然后根据传递 Visitor 对象调用公共方法 visit。

```php
interface  Visitor
{
    public function visit($visitor);
}

class Element
{
    protected Visitor $visitor;

    public string $name;

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public function getName(): string
    {
        return $this->name;
    }


    public function acceptVisitor(Visitor $visitor)
    {
        $visitor->visit($this);
    }

}

class NameVisitor implements Visitor
{

    public function visit($visitor)
    {
        echo $visitor->getName(), PHP_EOL;
    }
}

$element = new Element('wu');
echo $element->getName(), PHP_EOL;
$element->acceptVisitor(new NameVisitor());
```

我们可以看到，通过调用 acceptVisitor 方法接收一个访问者，具体对象可以把访问者的getName 能力也扩展为自己能力。当然如果你需要多个扩展能力，你可以有多个访问者。而 acceptVisitor 方法调用访问者的visit 方法时，传入 $this 是为了能使用 Element 的属性和方法，使其感觉扩展完就是 Element 的真正一部分。
