---
title: redis 学习一
date:
categories:
- redis
tags:
---

redis 是一个远程内存数据库（或者说内存数据结构）服务器。

redis 一共 5 种数据类型，string，hash，list，set，zset

#### 使用场景
单值缓存，key，value，MSET，MGET
对象缓存，key，json:
```shell
MSET user:1:name wu user:1:balance 1000
MGET user:1:name user:1:balance
HMSET user 1:name wu 1:balance 10000
// 分段
HMSET user1000 1:name wu 1:balance 1000
HMSET user2000 10001:name wu 10001:balance 1000
```

分布式锁，SETNX
```shell
SETNX product:1 true    //返回 1 表示成功
SETNX product:1 false   //返回 0 表示失败
DELETE product:1        // 执行完释放锁
SETNX product:1 true ex 10 nx //防止程序意外终止导致死锁
```

购物车
```shell
HSET cart:1001 10091 1  // 用户 1001 添加商品 10091 1件
HSET cart:1001 10021 2  // 用户 1001 添加商品 10021 2件
HINCRBY cart:1001 10091 1 // 增加商品
HLEN cart:1001  //获取商品总数
HDEL cart:1001 10091 // 删除商品
HGETALL cart:1001
```    
哈希结构优点：
1. 同类数据可以归类整合存储，方便数据管理
2. 相比 string 操作消耗更小
3. 相比 string 更节省空间

缺点：
1. 过期功能只能用在 key 上
2. 集群架构下不适合大规模使用


数据持久化、性能测试、故障恢复以及防止数据丢失。
