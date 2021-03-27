---
title: hexo多设备支持
date: 2018-02-26 14:35:02
tags:
- hexo
categories:
- 码不能停
---

测试时未知原因，markdown格式的图片标签无法识别，只能用下边hexo推荐的标签。
各种尝试，最后推掉重来，好了。

mmp，可能是中间有什么步骤没做好。

```
{% img [class names] /path/to/image [width] [height] [title text [alt text]] %}
```

多设备什么的把源码丢在.io的分支上就好了。
```
git init   #初始化本地仓库
git add .  #添加文件
git commit -m "Blog Source Hexo"
git branch hexo  #新建hexo分支
git checkout hexo  #切换到hexo分支上
git remote add origin git@github.com:yourname/yourname.github.io.git  #将本地与Github项目对接
git push origin hexo  #push到Github项目的hexo分支上
```

![效果图](/images/截图.png)

别的设备只需要拉下代码，然后切换下分支，再执行下 "npm install" 就可以愉快的玩耍了。

后来测试下把源码放在码云也可以的，为了安全起见，把源码放在码云的私有项目去了。
```
新建私有仓库
克隆到本地
然后把博客源文件丢进去
提交
搞定
```
![test](/images/x.gif)

