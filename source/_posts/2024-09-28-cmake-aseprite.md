---
title: Mac m1 编译安装 Aseprite
date: 2024-09-28 09:51:13
categories:
- 码不能停
tags:
- 码不能停
---

> !!!需要用到 `brew` 和 `xcode`，如果没安装要先装好。

## 克隆源码

```
git clone --recursive https://github.com/aseprite/aseprite.git
```

## 下载 skia

```
https://github.com/aseprite/skia/releases
```

选择对应平台的文件下载，解压后重命名文件夹为 `skia`。

## 安装 cmake && ninja

```
brew install cmake
brew install ninja
```

## 编译
```
cd aseprite
nkdir build
cd build

cmake \
  -DCMAKE_BUILD_TYPE=RelWithDebInfo \
  -DCMAKE_OSX_ARCHITECTURES=arm64 \
  -DCMAKE_OSX_DEPLOYMENT_TARGET=11.0 \
  -DCMAKE_OSX_SYSROOT=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk \
  -DLAF_BACKEND=skia \
  -DSKIA_DIR=/opt/homebrew/var/www/myself/skia \
  -DSKIA_LIBRARY_DIR=/opt/homebrew/var/www/myself/skia/out/Release-arm64 \
  -DSKIA_LIBRARY=/opt/homebrew/var/www/myself/skia/out/Release-arm64/libskia.a \
  -DPNG_ARM_NEON:STRING=on \
  -G Ninja \
  ..
ninja aseprite  
```

！！！一定要注意 `skia` 的相关路径

编译完成后可以做成应用程序，以下两种方案二选一，建议采用第二种方法，因为第一种在启动台不显示应用。

## 组装APP
访达进入应用程序目录，新建 `Aseprite.app` 目录，`build/bin/data/icons`目录下有各种图标，右键 `Aseprite.app` 目录，选择显示简介，把心仪的图标拖到左上角。

然后继续右键目录，选择显示包内容，新建目录 `Contents/MacOS`，进入目录，把编译好的 `build/bin` 目录下的 `data` 和 `aseprite` 复制进去即可。

## 替换试用版
从 [Aseprite](https://www.aseprite.org/trial/) 官网下载其提供的免费测试版，重命名为 `Aseprite.dmg`，和刚才的源码放在同一个文件夹。

```
# 将免费测试版安装包挂载至 mount 目录
mkdir mount
yes qy | hdiutil attach -quiet -nobrowse -noverify -noautoopen -mountpoint mount Aseprite.dmg
# 复制得到 App 包
cp -rf mount/Aseprite.app .
# 卸载免费测试板安装包
hdiutil detach mount
rm -rf mount
# 删除免费测试板 App 包中的可执行程序以及相关数据文件
rm -rf Aseprite.app/Contents/MacOS/aseprite
rm -rf Aseprite.app/Contents/Resources/data
# 用刚编译好的可执行程序以及相关数据文件替换
cp -rf Aseprite/build/bin/aseprite Aseprite.app/Contents/MacOS/aseprite
cp -rf Aseprite/build/bin/data Aseprite.app/Contents/Resources/data

# 将替换好的 App 包复制到 Applications/ 目录下
cp -rf Aseprite.app /Applications/
```
如果一切顺利的话，可在启动台看到安装好的 App，点击启动已确认是否可以正常打开。

## 汉化
[字体下载](https://github.com/J-11/Aseprite-Simplified-Chinese/blob/master/README.md)

## 参考
[在 Mac 上编译安装 Aseprite](https://www.newverse.wiki/knows/aseprite/)