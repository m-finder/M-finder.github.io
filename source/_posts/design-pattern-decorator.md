---
title: php 和设计模式 - 装饰器模式
date: 2021-03-21 14:35:08
categories:
- 设计模式
tags:
- 设计模式
---

装饰器模式主要用于动态添加修改类的功能。

一般情况下，一个类提供了某些功能，如果要扩展或修改该类，我们可以扩展一个子类出来。但是装饰器模式可以使我们更为灵活的实现。

那么，装饰器模式相对继承灵活在哪儿呢？

举个🌰，我们有一个发送短信的类，现在要在发送短信前增加一些校验，发送短信后我们要记录 log：
```php
interface SendSms
{
    public function Send();
}


interface Decorator
{

    public function beforeSend();

    public function afterSend();

}


class SmsDecorator implements Decorator{

    public function beforeSend()
    {
        echo 'check', PHP_EOL;
    }

    public function afterSend()
    {
        echo 'log', PHP_EOL;
    }
}

class AuthSms implements SendSms
{

    protected $decorators = [];

    public function addDecorator(Decorator $decorator)
    {
        array_push($this->decorators, $decorator);
    }

    protected function beforeSend()
    {
        /**
         * @var Decorator $decorator
         */
        foreach ($this->decorators as $decorator) {
            $decorator->beforeSend();
        }
    }

    protected function afterSend()
    {

        $decorators = array_reverse($this->decorators);
        /**
         * @var Decorator $decorator
         */
        foreach ($decorators as $decorator) {
            $decorator->afterSend();
        }
    }

    public function Send()
    {
        $this->beforeSend();
        echo 'auth sms is send', PHP_EOL;
        $this->afterSend();
    }

}


$sms = new AuthSms();
$sms->addDecorator(new SmsDecorator());
$sms->send();
```