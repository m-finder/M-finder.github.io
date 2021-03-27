---
title: mac m1 下搭建 php 开发环境
date: 2021-03-20 19:30:00
tags:
- php
categories:
- 码不能停
---

一番挣扎之后，还是下手了 m1，真香。

![macos](/images/macos.png)

<!-- more -->

#### homebrew 安装

```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

网慢的话，host 加映射。

```hosts
199.232.68.133  raw.githubusercontent.com
```

#### php 安装

看到好多人说，要把自带的 php 先卸载掉， 但是我折腾一圈发现，卸着太麻烦，不卸也没啥问题。

```shell
brew install php@7.4
brew link php@7.4
```

然后根据输出的信息添加环境变量：
```shell
echo 'export PATH="/opt/homebrew/opt/php@7.4/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="/opt/homebrew/opt/php@7.4/sbin:$PATH"' >> ~/.zshrc
export LDFLAGS="-L/opt/homebrew/opt/php@7.4/lib"
export CPPFLAGS="-I/opt/homebrew/opt/php@7.4/include"
```

如果错过了这些信息，执行以下命令可以再次查看：

```shell
brew info php@7.4
```

#### php-exc 安装

##### redis
安装扩展需要用到 `pecl`, 先查看有没有正确安装：
```
pecl help version
```

正常情况下，输出信息应该和 php 版本一致，即 php7.4。


```shell
pecl install redis
```

##### mongodb
```
ln -s /opt/homebrew/Cellar/pcre2/10.36/include/pcre2.h /opt/homebrew/Cellar/php@7.4/7.4.16/include/php/ext/pcre/pcre2.h
pech install mongodb
```

##### xdebug

xdebug3 配置有改动，具体如下：
```shell
xdebug.mode = debug
xdebug.client_host = 127.0.0.1
xdebug.client_port = 9003
xdebug.start_with_request=yes
xdebug.log="opt/homebrew/var/www/logs/xdebug.log"
xdebug.idekey = PHPSTORM
xdebug.discover_client_host=false
```

#### nginx 安装

```shell
brew install nginx
```

安装完成后，需要解析 php。
默认文件不动，添加一个新的配置文件：

`vi /opt/homebrew/etc/nginx/services/laravel`:

```vi
server {

    listen  80;
    server_name   laravel.test;
    root html;
    access_log    html/logs/nginx.log;
    error_log     htmle/logs/nginx-error.log;

    index index.php;

    location / {
        # Laravel rewrite rule
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
            fastcgi_pass   127.0.0.1:9000;
            #    fastcgi_pass   unix:/dev/shm/php-cgi.sock;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }
}

```

然后重启或刷新 nginx：

```shell
brew services reload nginx || brew services restart nginx
```

重启以后，记得改下 hosts，把域名加到映射。

```shell
vi /etc/hosts
```

#### redis 安装
```shell
brew install redis
redis-server -v
```

#### composer 安装
```shell
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mkdir /usr/local/bin/
sudo mv /opt/homebrew/var/www/composer.phar /usr/local/bin/composer
```
