---
title: php 和设计模式
date: 2021-03-21 14:35:00
categories:
- 设计模式
tags:
- 设计模式
---

#### 场面话

工作几年，复杂的业务场景，重复的 CURD 一直在消耗着我作为程序员的激情与精力，在设计模式这方面的积累从来都不够完善，出去面试时还经常会面临面试官的灵魂拷问，总觉得自己是不是就快被淘汰了。

所以，是时候下功夫整理下这方面的知识了。

开始之前，要考虑一个问题，我们为什么要学习设计模式呢？

首先从概念来讲，设计模式作为一种描述问题及其解决方案的方法，是无数的 IT 前辈在工作中总结出的 `特定场景` 下的 `最佳解决方案`，那么当我们遇到同样的场景时，就可以通过使用模式，来实现符合自己程序的解决方案，以此降低代码的耦合度，提高代码的质量，同时也方便我们后期对程序进行调整或拓展。

第二，现在大部分 PHP 程序都是依托于框架进行开发，一般情况下，我们对于框架的使用，只是局限于在一个强大的程序基础设施上添加一些小装饰。那么学习并掌握设计模式以后，我们就能够理解框架是如何解决问题，以及框架解决问题的策略，随着开发的深入，我们也能够以设计为导向，开发出自己的可复用的代码库，这对我们来说，也是一种极大的积累和提升。

第三，对于团队来说，人来人往是常态，对于从一开始就已经接手项目的成员来说，理解程序的逻辑会很轻松，但是对于新加入的成员来说，采用标准化设计模式的程序才是更容易的理解和掌握的存在，这可以使新成员更快的参与到项目的开发工作中，发挥出他作为项目成员的作用。

第四，设计模式定义了专业词汇，通过这些词汇，开发人员之间的沟通变得更加容易，可以节省很多沟通成本。

设计模式与面向对象密切相关，因此我应该不会简单的复制一堆模式来加以理解，而是从面向对象入手，逐渐向设计模式演深。

#### 目录

{% post_link design-pattern-object  对象 %}


{% post_link design-pattern-principles  设计原则 %}


{% post_link design-pattern-category 设计模式分类 %}


{% post_link design-pattern-factory 工厂模式 %}


{% post_link design-pattern-singleton 单例模式 %}


{% post_link design-pattern-builder 生成器模式 %}


{% post_link design-pattern-prototype 原型模式 %}


{% post_link design-pattern-adapter 适配器模式 %}


{% post_link design-pattern-decorator 装饰器模式 %}


{% post_link design-pattern-bridge 桥接模式 %}


{% post_link design-pattern-proxy 代理模式 %}


{% post_link design-pattern-composite 组合模式 %}


{% post_link design-pattern-flyweight 享元模式 %}


{% post_link design-pattern-di 依赖注入模式 %}


{% post_link design-pattern-registry 注册模式 %}


{% post_link design-pattern-fi 流接口模式 %}


{% post_link design-pattern-strategy 策略模式 %}


{% post_link design-pattern-template-method 模板方法模式 %}


{% post_link design-pattern-observer 观察者模式 %}


{% post_link design-pattern-iterator 迭代器模式 %}


{% post_link design-pattern-cor 责任链模式 %}


{% post_link design-pattern-command 命令行模式 %}


{% post_link design-pattern-memento 备忘录模式 %}


{% post_link design-pattern-state 状态模式 %}


{% post_link design-pattern-visitor 访问者模式 %}


{% post_link design-pattern-mediator 中介者模式 %}
