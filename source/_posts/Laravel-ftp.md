---
title: Laravel使用ftp传输文件时报错ftp_put() No data connection的解决
date: 2018-06-12 17:00:50
tags:
- laravel
- php
categories:
- 码不能停
---

代码：
```
<?php
$file = "test.dat";

$ftp_server="ftp.server.com";
$ftp_user = "myname";
$ftp_pass = "mypass";
$destination_file = "test.dat";


$cid=ftp_connect($ftp_server);
if(!$cid) {
    exit("Could not connect to server: $ftp_server\n");
}

$login_result = ftp_login($cid, $ftp_user, $ftp_pass);
if (!$login_result) {
    echo "FTP connection has failed!";
    echo "Attempted to connect to $ftp_server for user $ftp_user";
    exit;
} else {
echo "Connected to $ftp_server, for user $ftp_user";
}

$upload = ftp_put($cid, $destination_file, $file, FTP_BINARY);
if (!$upload) {
    echo "Failed upload for $source_file to $ftp_server as $destination_file<br>";
    echo "FTP upload has failed!";
} else {
    echo "Uploaded $source_file to $ftp_server as $destination_file";
}

ftp_close($cid);
?>
```

原因是没有定义ftp的主被动模式，true是被动模式：
```
ftp_pasv($cid, true);
```