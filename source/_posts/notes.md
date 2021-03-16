---
title: 代码备忘录
date: 2017-12-22 09:38:12
tags: [php,js]
categories: 码不能停
---

杂七杂八大乱炖。

![](/notes/st.jpg)
<!--more-->
### 计算两个日期的差值
```
$datetime1 = new DateTime('2009-10-11');  
//new DateTime = date_create , 在某些框架中用 new DateTime 需要加 '\' ;
$datetime2 = new DateTime('2009-10-13');  
$interval = $datetime1->diff($datetime2);  
echo $interval->format('%R%a days'); 
```
 
### 新建文件夹
```
$dir = iconv("UTF-8", "GBK", "C:/www/report/"); //linux下可不转码
if (!file_exists($dir)){
      mkdir ($dir,0755,true);
}
```

### Ascii 码转换
```
function stringFromColumnIndex($pColumnIndex = 0) {
    static $_indexCache = array();
    if (!isset($_indexCache[$pColumnIndex])) {
        // Determine column string
        if ($pColumnIndex < 26) {
            $_indexCache[$pColumnIndex] = chr(65 + $pColumnIndex);
        } elseif ($pColumnIndex < 702) {
            $_indexCache[$pColumnIndex] = chr(64 + ($pColumnIndex / 26)) .
                    chr(65 + $pColumnIndex % 26);
        } else {
            $_indexCache[$pColumnIndex] = chr(64 + (($pColumnIndex - 26) / 676)) . chr(65 + ((($pColumnIndex - 26) % 676) / 26)) . chr(65 + $pColumnIndex % 26);
        }
    }
    return $_indexCache[$pColumnIndex];
}
echo stringFromColumnIndex(37);
```

### 计算时间过去了多久 天\时\分\秒
```
function secsToStr($secs) {
    $r = '';
    if ($secs >= 86400) {
        $days = floor($secs / 86400);
        $secs = $secs % 86400;
        $r = $days . ' 天';
    }
    if ($secs >= 3600) {
        $hours = floor($secs / 3600);
        $secs = $secs % 3600;
        $r .= $hours . ' 小时';
    }
    if ($secs >= 60) {
        $minutes = floor($secs / 60);
        $secs = $secs % 60;
        $r .= $minutes . ' 分钟';
    }
    $r .= $secs . ' 秒';
    return $r;
}
echo secsToStr(545517.1111111111);
```

### win10 配置 pthreads 多线程扩展

pthreads 只支持 ts 版本的 php , 即线程安全版

phpstudy 自定义版本时总在报错 , 所以换了 xmapp

pthreads 下载地址 : [没错，点我](http://windows.php.net/downloads/pecl/releases/pthreads/)

要对应版本号和位数  位数以 php 的为准

下载解压后 , 把 php_pthreads.dll 和  pthreadVC2.dll 复制到 php\ext 下边

php.ini 最后边新增 : extension=php_pthreads.dll

然后再复制一个 pthreadVC2.dll 到系统目录

系统为 32 位的就复制进 C:\Windows\System32

64 位的就复制进 C:\Windows\SysWOW64

重启 xmapp , 新建一个 test.php
```
class AsyncOperation extends \Thread {
    public function __construct($arg){
        $this->arg = $arg;
    }
    public function run(){
        if($this->arg){
            printf("Hello %s\n", $this->arg);
        }
    }
}

$thread = new AsyncOperation("World");

if($thread->start()){
    $thread->join();
}
```
通过 url 访问 test 文件 , 出现 Hello World 就成功了

或者查看 phpinfo 里边有没有 pthreads 扩展

### Js调用系统桌面通知:
```
if (window.Notification && Notification.permission !== "denied") {
	Notification.requestPermission(function (status) {
		var n = new Notification("sir, you got a message", {
			icon: '/img/logo.png',
			body: 'you will have a meeting 5 minutes later.'
		});
	});
}
```
### js声音提醒
```  
audioElementHovertree = document.createElement('audio');  
audioElementHovertree.setAttribute('src', 'http://w.qq.com/audio/classic.mp3');  
audioElementHovertree.setAttribute('autoplay', 'autoplay');
```

### 数据分配：
```
$max_worker_num = 30;
$data_num = 74;

if ($data_num == 0) {
	return;
}

for ($i = 0; $i < $data_num; $i++) {
	$data[$i] = $i;
}

$min_worker_num = min($data_num, $max_worker_num);

$data_arr = array_chunk($data, ceil($data_num / $min_worker_num), true);

$worker_num = ceil($data_num / ceil($data_num / $min_worker_num));
```
