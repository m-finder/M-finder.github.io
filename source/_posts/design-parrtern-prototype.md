---
title: php 和设计模式 - 原型模式
date: 2021-03-21 14:35:06
categories:
- 设计模式
tags:
---

原型模式通常用于大对象的创建。因为每次 new 一个对象会造成很大开销，原型模式仅需内存拷贝即可。

比较简单，直接上🌰：
```php
interface Book
{
    public function setTitle(string $title);

    public function getTitle(): string;
}

class eBook implements Book
{

    protected string $title;

    public function setTitle(string $title)
    {
        $this->title = $title;
    }

    public function getTitle(): string
    {
        return $this->title;
    }
}


$book1 = new eBook();
$book1->setTitle('1 号电子书');
echo $book1->getTitle(), PHP_EOL;

$book2 = new eBook();
$book2->setTitle('2 号电子书');
echo $book2->getTitle(), PHP_EOL;
```


常规情况下，我们会用 new 创建两个对象，然后分别设置各自的书名。现在用原型模式改造一下：
```php
$prototype = new eBook();

foreach(range(1, 10) as $index){
    $book = clone $prototype;
    $book->setTitle($index. ' 号电子书');
    echo $book->getTitle(), PHP_EOL;
}
```

类保持不变，只在创建时该用 clone 即可。