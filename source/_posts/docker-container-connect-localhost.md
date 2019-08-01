---
title: docker 容器访问宿主机端口
date: 2019-07-31 21:48:00
categories: docker
tags: docker
---

运行在 docker 容器中的一个项目需要访问宿主机的某个端口，比如容器 A 中的项目访问宿主机 B，在 A 的项目中以下边的地址来访问即可：
```
host.docker.internal
```

之前是可以运行的，但是今天不知道什么情况突然 500 了，重启电脑后，在容器中 ping 这个地址：
```
PING host.docker.internal (192.168.65.2) 56(84) bytes of data.
64 bytes from 192.168.65.2: icmp_seq=1 ttl=37 time=2.09 ms
64 bytes from 192.168.65.2: icmp_seq=2 ttl=37 time=1.05 ms
64 bytes from 192.168.65.2: icmp_seq=3 ttl=37 time=1.05 ms
64 bytes from 192.168.65.2: icmp_seq=4 ttl=37 time=1.16 ms
64 bytes from 192.168.65.2: icmp_seq=5 ttl=37 time=1.03 ms

```

可以看到实际访问的是 192.168.65.2 这个地址，那么在宿主机的 host 加上一行：
```
192.168.65.2  host.docker.internal
```

再次访问，ok！做个记录，防止下次再忘。


#### 安装ping
不指定用户进入容器，然后执行：
```
apt-get update
apt-get install iputils-ping
```
