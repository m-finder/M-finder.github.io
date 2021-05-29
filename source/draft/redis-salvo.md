---
title: redis 连环炮
date: 2021-05-25 23:59:59
categories:
- redis
tags:
---

#### 1. 什么是 redis

redis 是一个基于内存且支持持久化的高性能 key-value 数据库。

#### redis 优点

1. 读写速度快
2. 支持持久化
3. 支持事务
4. 数据类型丰富
5. 支持主从，读写分离

#### 2. redis 支持的数据类型

redis 一共 5 种数据类型：string，hash，list，set，zset。

##### string 字符串

string 是最简单的类型，支持`字符串`，`浮点数`，`整数`。

1. 获取值：get key
2. 设置值：set key value
3. 删除值：del key
4. 自增：incr key
5. 自减：decr key
6. 按值自增：incrby key value
7. 按值自减：decryby key value

![redis-string](/images/redis-string.png)

###### 使用场景

1. 用户 session
2. 统计计数器

##### hash 散列

hash 可以存储多个键值对之间的映射，可以方便的对同类数据进行归类整合存储。

值的类型同字符串，也可以进行自增操作。

1. 设置值：hset user 1:name wu
2. 获取值：hget user 1:age 18
3. 按值自增：hincrbr user 1:age 2
4. 获取所有：hgetall user
5. 获取多个：hmget user 1:name 1:age
6. 设置多个：hmset user 2:name xu 2:age 18
7. 删除一个：hdel user 1:age
8. 删除全部：del user

![redis-hash](/images/redis-hash.png)

###### 使用场景：

1. 购物车

```shell
hset cart:1001 10091 1  // 用户 1001 添加商品 10091 1件
hset cart:1001 10021 2  // 用户 1001 添加商品 10021 2件
hincrby cart:1001 10091 1 // 增加商品
hlen cart:1001  // 获取商品总数
hdel cart:1001 10091 // 删除商品
hgetall cart:1001
```
##### set 集合

字符串的无序集合，每个字符串都是唯一的。可以方便的对数据进行交集、并集、差集等操作。

1. 设置值：sadd key value


###### 使用场景：

1. 好友/关注/粉丝/感兴趣的人集合
2. 随机展示数据
3. 黑白名单



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


    
哈希结构优点：
1. 同类数据可以归类整合存储，方便数据管理
2. 相比 string 操作消耗更小
3. 相比 string 更节省空间

缺点：
1. 过期功能只能用在 key 上
2. 集群架构下不适合大规模使用


数据持久化、性能测试、故障恢复以及防止数据丢失。
