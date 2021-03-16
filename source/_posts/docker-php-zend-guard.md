---
title: 在 docker 容器中安装 zend guard
date: 2019-08-18 15:12:21
tags: docker
categories: 码不能停
---

在 docker 容器中安装 zend guard。
![docker](docker.jpg)

<!-- more -->

#### 进入容器
```
docker-compose exec php-fpm bash
```


#### 更新环境
```
apt-get update
apt-get install wget -y
```

#### 下载文件
```
wget http://downloads.zend.com/guard/7.0.0/zend-loader-php5.6-linux-x86_64_update1.tar.gz
```

#### 解压
```
tar -xzvf zend-loader-php5.6-linux-x86_64_update1.tar.gz
```

#### 查看扩展路径
在 php-info 中搜索路径：
```
extension_dir
```
![path](path.png)

#### 移动扩展包并使之生效
```
cp *.so /usr/local/lib/php/extensions/no-debug-non-zts-20131226
docker-php-ext-enable ZendGuardLoader
```

#### 安装成功
重启环境。
![](done.png)
