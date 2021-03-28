---
title: mac 默认终端记住 ssh 密码
date: 2021-03-28 09:42:00
categories:
- 码不能停
tags:
- ssh
- terminal
---

前几天，在小伙伴的极力推荐下装了 iTerm2，用了几天，奈何与我八字不合，ssh 后 vi 模式错乱，各种修复无果，但是在自带终端却又正常，无奈只能切回。

iTerm2 用 sh 文件配置过 ssh 记住密码，在默认终端也是可以用的。

配置方式如下：

#### 新建 sh 脚本

```shell
sudo vi /usr/local/bin/terminal.sh
```

然后放入以下内容

```shell
#!/usr/bin/expect

set timeout 30
set host [lindex $argv 0]
set port [lindex $argv 1]
set user [lindex $argv 2]
set pswd [lindex $argv 3]

spawn ssh -p $port $user@$host 

expect {
        "(yes/no)?"
        {send "yes\n";exp_continue;}
          -re "(p|P)ass(word|wd):"
        {send "$pswd\n"}
}

interact
```

再给下运行权限：
```shell
sudo chmod +x /usr/local/bin/terminal.sh
```

#### 配置 terminal
打开终端，左上角选择偏好设置，然后，如下图：
![新建窗口](/images/add_shell.jpg)

![添加脚本](/images/terminal_sh.png)

复制以下内容，注意把 host 和账号密码替换成自己的。
```shell
/usr/local/bin/terminal.sh 127.0.0.1 22 root rootpassword
```

最后，打开终端，左上角选择 shell -> 新建窗口，然后选择目标窗口即可自动登录。

![新建窗口](/images/select_terminall.png)



