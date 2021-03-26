---
title: openssl_pkey_get_private 内存泄漏
date: 2018-02-08 07:31:16
tags: [php,openssl,swoole]
categories: 码不能停
---

从前，有一块使用 swoole_process 做多线程处理的程序，这个程序有一个奇怪的问题：每运行一个星期左右都会因为内存爆表而停掉。

因为爆表的时间关系，开发的小伙伴们都认为是这段使用 swoole_process 的程序有问题，几经更新改版，代码已经趋于完美，平稳的运行了几天后，小伙伴们终于都松了一口气，终于解决了这个问题。

然而，伴随着百年难遇的血月，这块程序还是在一个意想不到的时间又爆了一次，小伙伴们终于意识到，问题的根本并不在这里，想要找出并改掉这个问题，是何等艰难！但是他们知道，真相只有一个！

又经过几天的排查，凶手终于浮出水面！

呐，就是这孙子：openssl_pkey_get_private

抽出的测试代码：
```
while(true){
    $key = file_get_contents('mock_A.pem');
	echo $m=memory_get_usage(),PHP_EOL;
	$getkey = openssl_pkey_get_private($key, '');
	openssl_pkey_free($getkey);
	echo $mm = memory_get_usage(),PHP_EOL;
        echo "Before unset:  ",$mm-$m ,PHP_EOL;
	sleep(3);
}
```

结果：
![运行结果](/images/2018-02-08-07-30-12-5a7bfc84465bf.png)

审判结果：该阉的就赶紧阉了吧

行刑后长相：
```
$key = file_get_contents('mock_A.pem');
$getkey = openssl_pkey_get_private($key, '');

while(true){
	echo $m=memory_get_usage(),PHP_EOL;
	openssl_pkey_free($getkey);
	echo $mm = memory_get_usage(),PHP_EOL;
        echo "Before unset:  ",$mm-$m ,PHP_EOL;
	sleep(3);
}
```
前线专家点评：纯属冤案，哪儿特么这么容易泄漏，都是因为自己写的不规范！

注：生成公私钥是需要消耗内存的，每次脚本执行结束后会释放掉，但是常驻内存的脚本没有释放的机会，所以每次循环调用都会造成内存增加，持续增加到一定量后系统也就崩了。
所以解决办法是在循环开始之前就把密钥生成好。