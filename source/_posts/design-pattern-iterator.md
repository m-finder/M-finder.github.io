---
title: php 和设计模式 - 迭代器模式
date: 2021-03-21 14:35:18
categories:
- 设计模式
tags:
- 设计模式
---

提供一种方法顺序访问一个集合对象中的各种元素,而又不暴露该对象的内部表示。

foreach 的底层就是迭代器。很多编程语言都已经将其作为一个基础类库实现出来了，所以也就有了这个模式目前学习意义大于实际意义的说法。

在 php 中，内部已提供 Iterator 接口，可以直接使用。

```php
class Bookshelf implements \Countable, \Iterator
{
    protected array $books = [];
    protected int $current = 0;


    public function addBook(Book $book)
    {
        $this->books[] = $book;
    }

    public function current()
    {
        return $this->books[$this->current];
    }

    public function next()
    {
        return $this->current++;
    }

    public function key(): int
    {
        return $this->current;
    }

    public function valid(): bool
    {
        return isset($this->books[$this->current]);
    }

    public function rewind()
    {
        $this->current = 0;
    }

    public function count(): int
    {
        return count($this->books);
    }
}

class Book
{
    protected string $author;
    protected string $title;

    public function __construct(string $author, string $title)
    {
        $this->author = $author;
        $this->title = $title;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getAuthorAndTitle(): string
    {
        return $this->getAuthor() . '-' . $this->getTitle();
    }
}

$bookA = new Book('wu', 'php');
$bookB = new Book('wu', 'redis');

$bookshelf = new Bookshelf();
$bookshelf->addBook($bookA);
$bookshelf->addBook($bookB);

foreach ($bookshelf as $book) {
    echo $book->getAuthorAndTitle(), PHP_EOL;
}
```

使用起来还是比较简单的，至于如何实现就不写了。



