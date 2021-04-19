---
title: php 和设计模式 - 享元模式
date: 2021-03-21 14:35:12
categories:
- 设计模式
tags:
- 设计模式
---

享元模式会尽量使相似的对象共享内存，能让你在有限的内存中载入更多对象。

当一个应用程序需要创建大量对象，并且这些对象的大多数状都可变为外部状态时，就很适合享元模式。

一如既往的举个🌰：
```php
interface Message
{
    public function send(User $user);
}

class AliMessage implements Message
{

    // 内部状态
    protected Template $template;

    public function __construct(Template $template)
    {
        $this->template = $template;
    }

    // user 属于外部状态
    public function send(User $user)
    {
        echo 'use ', $this->template->getTemplate(), ' send msg ', 'to user ', $user->getName(), ' by ali', PHP_EOL;;
    }
}

class MessageFactory
{
    protected array $messages = [];

    public function getMessage(Template $template)
    {
        $key = md5($template->getTemplate());
        if (!array_key_exists($key, $this->messages)) {
            echo 'message create', PHP_EOL;
            $this->messages[$key] = new AliMessage($template);
        }

        return $this->messages[$key];
    }
}

class Template
{
    protected string $template;

    public function setTemplate(string $template)
    {
        $this->template = $template;
    }

    public function getTemplate(): string
    {
        return $this->template;
    }
}

class User
{
    protected string $name;

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getName(): string
    {
        return $this->name;
    }
}

$templateA = new Template();
$templateA->setTemplate('template a');

$templateB = new Template();
$templateB->setTemplate('template b');

$userA = new User();
$userA->setName('wu');

$userB = new User();
$userB->setName('yf');


$factory = new MessageFactory();
$flyweightA = $factory->getMessage($templateA);
$flyweightA->send($userA);
$flyweightA->send($userB);

$flyweightB = $factory->getMessage($templateB);
$flyweightB->send($userA);
```

这次来点不一样的，贴张截图帮助理解：
![flyweight](/images/flyweight.png)

可以看到，在享元工厂中，一共创建了两次 message，当我们重复用一个模板发送消息时，模板作为内部状态已经被缓存了，调用的时候直接取出即可，避免了重复创建造成的资源浪费。

例子虽然不太贴切，但是看完应该也能总结出，享元模式需要依赖于一个享元工厂以及一个享元角色，也就是咱们代码中的 AliMessage 类。

