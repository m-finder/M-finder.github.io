---
title: php 和设计模式 - 观察者模式
date: 2021-03-21 14:35:17
categories:
- 设计模式
tags:
- 设计模式
---

当对象的状态发生变化时，所有依赖于它的对象都得到通知并被自动更新。它使用的是低耦合的方式。

```php
class DeleteUserSubject implements \SplSubject
{

    protected SplObjectStorage $observers;


    protected $data;

    public function __construct()
    {
        $this->observers = new \SplObjectStorage();
    }

    public function attach(SplObserver $observer)
    {
        $this->observers->attach($observer);
    }

    public function detach(SplObserver $observer)
    {
        $this->observers->detach($observer);
    }

    public function notify()
    {
        foreach ($this->observers as $observer) {
            $observer->update($this);
        }
    }

    public function process()
    {
        $this->data = new class {
            public string $name = 'wu';

            public function delete()
            {
                echo '用户 ', $this->name, ' 被删除', PHP_EOL;
            }
        };

        $this->data->delete();

        echo '开始通知关联处理：', PHP_EOL;
        $this->notify();
    }

    public function getName()
    {
        return $this->data->name;
    }
}

class UserLogDeleteObserver implements \SplObserver
{

    protected SplSubject $subject;

    public function update(SplSubject $subject)
    {
        $this->subject = clone $subject;
        $this->deleteUserLog();
    }

    public function deleteUserLog()
    {
        echo '删除用户', $this->subject->getName(),' 的日志', PHP_EOL;
    }
}

$subject = new DeleteUserSubject();
$subject->attach(new UserLogDeleteObserver());
$subject->process();
```

这个模式代码稍微多一点，但是场景很经典，也很容易理解。
