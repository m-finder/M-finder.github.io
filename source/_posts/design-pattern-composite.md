---
title: php 和设计模式 - 组合模式
date: 2021-03-21 14:35:11
categories:
- 设计模式
tags:
- 设计模式
---

将对象组合成`树状`层次结构以表示`部分-整体`的层次结构，使用户对单个对象和组合对象的使用具有一致性。

两个关键词，树状，部分-整体。


举个🌰：
```php
interface Component
{
    public function render();
}

class Composite implements Component
{

    protected array $composites = [];

    public function add(Component $component)
    {
        $this->composites[] = $component;
    }

    public function remove(Component $component)
    {
        $position = 0;
        foreach ($this->composites as $composite) {
            if ($composite === $component) {
                array_splice($this->composites, $position, 1);
            }
            $position++;
        }
    }

    public function getChildren(int $key): Component
    {
        return $this->composites[$key];
    }

    public function render()
    {
        foreach ($this->composites as $composite) {
            $composite->render();
        }
    }
}

class LeafA implements Component
{

    public function render()
    {
        echo 'leaf a render', PHP_EOL;
    }
}

class LeafB implements Component
{
    public function render()
    {
        echo 'leaf b render', PHP_EOL;
    }
}

$leafA = new LeafA();
$leafB = new LeafB();
$composite = new Composite();
$composite->add($leafA);
$composite->add($leafB);
$composite->render();

$composite->remove($leafA);
$composite->render();

$composite->getChildren(0)->render();
```

比较适用于树形菜单、文件和文件夹管理等，感觉场景很有限啊……
