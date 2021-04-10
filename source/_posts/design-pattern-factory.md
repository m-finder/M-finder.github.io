---
title: php 和设计模式 - 工厂模式
date: 2021-03-21 14:35:04
categories:
- 设计模式
tags:
---

#### 工厂模式

工厂模式是一种类，它具有为你创建对象的某些方法，你可以通过工厂创建对象，而不是直接 new，这样当你需要替换创建的对象类型时，只需要修改工厂即可。

根据抽象程度不同，工厂模式又分为简单工厂、工厂方法和抽象工厂三种。

##### 简单工厂
简单工厂又称为静态工厂，因为它一般借助于静态方法实现。

```php
interface Car
{
    public function makeCar();

}

class BMWCar implements Car
{

    public function makeCar()
    {
        echo '来一辆别摸我', PHP_EOL;
    }
}


class VolvoCar implements Car
{
    public function makeCar()
    {
        echo '来一辆沃尔沃', PHP_EOL;
    }
}

class Factory
{
   public static function createBMW(): BMWCar
   {
       return new BMWCar();
   }

   public static function createVolvo(): VolvoCar
   {
       return new VolvoCar();
   }
}

$bmw = Factory::createBMW();
$bmw->makeCar();

$volvo = Factory::createVolvo();
$volvo->makeCar();
```
实现比较简单，但是当我们要新增一种车🚗时，就必须修改工厂，这在一定程度上违反了开闭原则。所以严格意义上简单工厂不属于 23 种设计模式。

##### 工厂方法
工厂方法是针对每一种产品提供一个工厂类，通过不同的工厂实例来创建不同的产品实例。解决了简单工厂新增具体实现需要修改工厂的问题，支持增加任意同一种抽象产品，不修改原有工厂。

那么，把刚才的简单工厂改造一下吧：
```php
interface Car
{
    public function makeCar();

}

class BMWCar implements Car
{

    public function makeCar()
    {
        echo '来一辆别摸我', PHP_EOL;
    }
}


class VolvoCar implements Car
{
    public function makeCar()
    {
        echo '来一辆沃尔沃', PHP_EOL;
    }
}

interface Factory
{
    public static function getInstance(): Car;
}

class BMwFactory implements Factory
{

    /**
     * @return BMWCar
     */
    public static function getInstance(): Car
    {
        return new BMWCar();
    }
}

class VolvoFactory implements Factory{
    public static function getInstance(): Car
    {
        return new VolvoCar();
    }
}

$bmw = BMwFactory::getInstance();
$bmw->makeCar();

$volvo = VolvoFactory::getInstance();
$volvo->makeCar();
```

不同的工厂生产不同的产品，新增产品类型时，只需要新建一个工厂即可，不再需要改动原有工厂，符合了开闭原则。

##### 抽象工厂
抽象工厂与工厂方法的区别是，抽象工厂用于生产一系列产品，工厂方法只生产一个产品，会产生大量的工厂类。

宝马生产跑车、轿车还有 mini，宝马是一个产品族，跑车、轿车等是产品的等级。那么，也就是说一个工厂，可以生产相同品牌的不同产品。

那就不写🌰了吧。懒。


#### 总结
简单工厂增加产品不方便。
工厂方法增加产品很方便，但是会产生大量的工厂类。
抽象工厂可以生产多个产品，但是新增产品也需要修改工厂。

