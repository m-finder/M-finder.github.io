---
title: 职业生涯知识回顾-基础篇之网络传输协议
date: 2024-03-02 22:00:00
tags:
- 码不能停
categories:
- 码不能停
---

协议的本质也就是彼此之间的约定和规则。

# HTTP
HTTP 是一个承载于 TCP 协议上的超文本传输协议，明文，无状态。由客户端发起请求，服务器返回响应。

无状态是指协议对于事务处理没有记忆，不会保留之前请求的任何信息，也不会对后续请求进行关联。

为了弥补无状态带来的不便，产生了 Cookie 和 Session 技术。

## Cookie
Cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向服务器请求资源时携带并发送到服务器上，通常用于告知服务端两个请求是否来自同一浏览器，比如用户的登录状态。

Cookie 一般用于以下方面：
1. 会话状态管理（用户登录状态等）
2. 个性化设置（主题、自定义设置等）
3. 浏览器行为跟踪（跟踪分析用户行为等）

## Session
Session 是基于 Cookie 实现的，在服务器进行存储，也是一种会话跟踪技术。

一个 Session 独占一个浏览器，在浏览器关闭前，Session 一直存在。

Session 的使用场景：
1. 用户身份验证
2. 购物车功能
3. 长表单或多步骤操作缓存

## HTTP 的三次握手和四次挥手
三次挥手是指建立一个 TCP 连接时，需要客户端和服务器发送 3 个包，来确认双方的接收能力和发送能力是否正常。

四次挥手是客户端先发送释放报文并且停止发送数据，但是还可以接受数据，服务端收到后先发送确认信息，但是可能还有数据在发送，所以要等数据发完再发送释放报文，客户端收到后再次确认。

## 响应状态码
1xx：提示信息
2xx：成功
3xx：重定向
4xx：客户端报文错误
5xx：服务器有误

# HTTPS
HTTPS 是 HTTP 的加密版本，通过 SSL/TLS 协议对数据进行加密和身份验证。HTTP 直接和 TCP 通信，使用 SSL 后就变成先和 SSL 通信，再由 SSL 和 TCP 通信，所谓的 HTTPS，就是身披 SSL 协议这层外壳的 HTTP；

## HTTP 和 HTTPS 的区别
1. HTTP 是明文传输，容易被抓包泄漏信息，HTTPS 通过 CA 证书对数据进行加密；
2. HTTP 无状态，不进行身份校验，HTTPS 做身份验证；
3. HTTP 直接和 TCP 通信，HTTPS 通过 SSL 与 TCP 通信；

# Socket 和 WebSocket
以前一直以为 WebSocket 就是在 web 端使用的 Socket，所以才叫这个名字，今天重新看资料才发现原来 Socket 和 WebSocket 是两个不同的东西……

具体区别：
1. 协议不同
    1. Socket 是基于传输层 TCP 协议的，WebSocket 基于 HTTP 协议
    2. Socket 通信通过 Socket 套接字实现， WebSocket 通信通过 HTTP 握手实现
2. 持久化连接
    1. Socket 通信是短连接，通信完就断开
    2. WebSocket 是长连接
3. 双向通信
    1. Socket 只支持单向通信，即客户端发送请求，服务器响应
    2. WebSocket 支持双向通行
4. 效率
    1. Socket 通信效率更高，因为不需要 HTTP 的协议头信息
    2. WebSocket 除了 HTTP 协议头，还需要发送额外的数据，效率会相对较低

    
虽然高赞回答屁话很多，但是讲的还算透彻：    
[WebSocket 是什么原理？为什么可以实现持久连接？](https://www.zhihu.com/question/20215561)    
[WebSocket详解（六）：刨根问底WebSocket与Socket的关系](https://zhuanlan.zhihu.com/p/32052530)