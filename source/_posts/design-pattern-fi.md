---
title: php 和设计模式 - 流接口模式
date: 2021-03-21 14:35:14
categories:
- 设计模式
tags:
- 设计模式
---


流接口模式通常用来编写易于阅读的代码，就像自然语言一样（如英语）。

```php
class Sql
{

    private array $fields = [];
    private array $from = [];
    private array $where = [];

    public function select(array $fields): Sql
    {
        $this->fields = $fields;

        return $this;
    }

    public function from(string $table, string $alias): Sql
    {
        $this->from[] = $table . ' AS ' . $alias;

        return $this;
    }

    public function where(string $condition): Sql
    {
        $this->where[] = $condition;

        return $this;
    }

    public function __toString(): string
    {
        return sprintf(
            'select %s from %s where %s',
            join(', ', $this->fields),
            join(', ', $this->from),
            join(' AND ', $this->where)
        );
    }
}

$query = (new Sql())->select(['foo', 'bar'])->from('foobar', 'f')->where('f.bar = foo');
echo $query, PHP_EOL;
```

这个模式跟前一个模式都有点说不出的诡异，可能不是新模式，属于没被正式划分到设计模式中的模式？？？
