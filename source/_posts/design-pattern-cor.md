---
title: php 和设计模式 - 责任链模式
date: 2021-03-21 14:35:19
categories:
- 设计模式
tags:
- 设计模式
---

建立一个对象链来按指定顺序处理调用。如果其中一个对象无法处理命令，它会委托这个调用给它的下一个对象来进行处理，以此类推。

```php
abstract class Handler
{

    protected ?Handler $successor;

    public function __construct(Handler $handler = null)
    {
        $this->successor = $handler;
    }

    abstract public function handle($request);
}

class HttpInNumeric extends Handler
{

    public function __construct(Handler $successor = null)
    {
        parent::__construct($successor);
    }

    public function handle($request)
    {
        if (is_numeric($request)) {
            echo '数字请求', PHP_EOL;
        } else {
            if ($this->successor) {
                return $this->successor->handle($request);
            }
        }

    }
}

class HttpInArray extends Handler
{

    public function handle($request)
    {
        echo '数组请求', PHP_EOL;
    }
}

$handler = new HttpInNumeric(new HttpInArray());
$handler->handle(1);
$handler->handle([1]);
```

还算简单，就是依次往下传递。
