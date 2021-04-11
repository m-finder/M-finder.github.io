---
title: php 和设计模式 - 适配器例模式
date: 2021-03-21 14:35:07
categories:
- 设计模式
tags:
- 设计模式
---

适配器模式主要用于将一个类的接口转换为客户端所期望的另一个接口，也就是处理接口的兼容问题。

比如说数据库操作，有 mysql，sqllite，mongodb 等，缓存操作有 redis，memcache，file 等，都可以通过适配器模式将其统一成一致。

查阅资料的过程中，看到一个很生动的例子：[🌰](https://www.cnblogs.com/DeanChopper/p/4770572.html)

某公司生产一批动物形玩具，可以张嘴闭嘴，实现如下：
```php
interface Toy{
    public function openMouse();

    public function closeMouse();
}

class Dog implements Toy{

    public function openMouse()
    {
        echo 'dog open mouse', PHP_EOL;
    }

    public function closeMouse()
    {
        echo 'dog close mouse', PHP_EOL;
    }
}
$dog = new Dog();
$dog->openMouse();
```

某一天，该公司决定与另外一家公司合作，因为该公司的玩具可以遥控控制张嘴闭嘴，但是合作公司用的是 doOpenMouse 和 doCloseMouse 两个方法来控制玩具，这个时候，开发人员怎么办呢，直接在接口添加两个新方法？那岂不是违背了开闭原则，而且两组方法的功能高度重合，以后岂不是很难维护。

所以，适配器模式就可以大展身手了。

```php
interface RemoteControlToy
{

    public function doOpenMouse();

    public function doCloseMouse();
}

class RemoteControlDog implements RemoteControlToy{

    public function doOpenMouse()
    {
        echo 'remote control dog open mouse', PHP_EOL;
    }

    public function doCloseMouse()
    {
        echo 'remote control dog close mouse', PHP_EOL;
    }
}

class RemoteControllerToyAdapter implements Toy
{
    protected RemoteControlToy $adapter;

    public function __construct(RemoteControlToy $target)
    {
        $this->adapter = $target;
    }

    public function openMouse()
    {
       $this->adapter->doOpenMouse();
    }

    public function closeMouse()
    {
        $this->adapter->doCloseMouse();
    }
}
$adapterDog = new RemoteControllerToyAdapter(new RemoteControlDog());
$adapterDog->openMouse();
```

首先，我们定义并实现了遥控玩具接口，然后通过遥控玩具适配器进行接口转换，完成了接口统一。

那么像参考例子中提到的，如果这时候再来一个通过传入参数控制玩具张嘴的公司，只需要再添加一个适配器即可。

