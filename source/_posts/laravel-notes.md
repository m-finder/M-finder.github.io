---
title: laravel 使用笔记
date: 2017-12-22 09:35:57
tags: [laravel,php]
categories: 码不能停
---

![](laravel.jpg)

<!--more-->
先从最简单的开始：

### 安装
laravel 的安装需要借助 composer ，百度一下，安装，然后去 GitHub 下载 laravel

切换到项目文件夹 ，在不选中任何文件的前提下按住 shift + 鼠标右键，打开 Powershell 或者 cmd

输入：composer install 

将 .env.example 另存为 .env

修改数据库配置信息和邮件系统配置信息

然后在命令行输入：php artisan key:generate 生成密钥

然后配置一个本地域名指向 public 文件夹，然后，就好了。[哈哈] 


### 邮件
邮件系统配置示例：
```
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mxhichina.com
MAIL_PORT=25//465
MAIL_USERNAME=m@m-finder
MAIL_PASSWORD=邮箱密码
MAIL_FROM_NAME=M-finder
MAIL_FROM_ADDRESS=m@m-finder
MAIL_ENCRYPTION=null//ssl #如果用465端口的话，需要参数 MAIL_ENCRYPTION=ssl
```

邮件有 3 种模式（可能更多，暂时只接触到3种）:
一种用 Mail::send 方法
一种用 Mail::raw
另外一种则是官方文档中的，新建一个类，然后发送邮件时实例化这个类。3 种方法实现的功能一样。
Mail::send
```
Mail::send('admin.email', ['orderPrice' => 'laravel'], function ($message) {
    $message->to('m@m-finder');
    $message->subject('我是自定义标题');
});
```

这个方法第一个参数为视图文件，视图文件的用法等同于普通视图，第二个参数为视图中所用到的数据
Mail::raw
```
$content = '这是一封来自Laravel的测试邮件.';
$toMail = 'm@m-finder';
        
 Mail::raw($content, function ($message) use ($toMail) {
	$message->subject('[ 测试 ] 测试邮件SendMail - ' . date('Y-m-d H:i:s'));
	$message->to($toMail);
});
```
基本等同于Mail::send

第三种方法
```
php artisan make:controller MailController

php artisan make:mail OrderShipped

在 OrderShipped 增加内容

return $this->view('admin.email')->with([
            'orderName' => 'test',
            'orderPrice' => 1500,
 ]);
```
然后在要发送邮件的方法中调用：
```
Mail::to('m@m-finder')->send(new OrderShipped());
```
开放路由，访问下就可以了。

如果需要自定义邮件标题，可以试一下以下方法（未测试）：

在你的类中定义一个subject变量：
```
public $subject = '这里是邮件自定义标题';
```

或者在你的view后跟一个subject方法：
```
view('emails.activate-user')->subject('这里定义邮件标题')；
```

### 多视图共享数据
在 app\Providers 文件夹下 boot() 方法中写入要共享的数据即可 , 例如 :
```
public function boot() {
	$links = Link::orderBy('id', 'desc')->get();
	$web_info = SysConfig::first();
	$menus =  Menu::select('id', 'name', 'type', 'seo_title', 'seo_describe', 'link')
        ->where('pid', '=', 0)
        ->where('is_show', '=', '2')
        ->get();

	view()->share('links', $links);
	view()->share('web_info', $web_info);
	view()->share('menus', $menus);
}
```

这样写完以后，你会发现你的 migrate 挂了，哈哈 ，解决办法是使用闭包，即 composer 方法：

```
public function boot() {
        Schema::defaultStringLength(191); //解决数据库版本过低无法执行 migrate

        view()->composer(['layouts.home', 'layouts.userhome','layouts.admin'], function($view) {
            $links = Link::orderBy('id', 'desc')->get();
            $web_info = SysConfig::first();
            $menus = Menu::select('id', 'name', 'type', 'seo_title', 'seo_describe', 'link')
            ->where('pid', '=', 0)
            ->where('is_show', '=', '2')
            ->get();
            $view->with(['links' => $links, 'web_info' => $web_info, 'menus' => $menus]);
        });
    }
```

### 文件上传
config 文件夹下有一个 filesystems.php，里边是默认的上传地址，可以根据自己的需要做修改或者添加

上传的控制器代码：
```
if ($file->isValid()) {
	if ($file->getClientSize() > 2097152) {
		return $this->json_response(1, "请上传小于 2 mb 的图片", 0);
	}
	$ext = $file->getClientOriginalExtension();
	$realPath = $file->getRealPath();
	$type = $file->getClientMimeType();
	$filename = date('Y-m-d-H-i-s') . '-' . uniqid() . '.' . $ext;
	$bool = Storage::disk($path)->put($filename, file_get_contents($realPath));
	$url = Storage::disk($path)->url($filename);
	if ($filename) {
		return ['code' => 0, 'msg' => '', 'src' => $url, 
                 'data'=>['src'=>$url,'title'=>$filename]]; 
         //{"code": 0 ,"msg": "" ,"data": {"src": "图片路径","title": "图片名称"}  layui 图片上传接口
	}
}
```

访问上传到本地的文件资源，需要先创建一个软连接：php artisan storage:link

一个页面中，如果有 ajax 调取数据的，可以把 ajax 使用的路由和页面的路由名称定义为同一个，不同的是页面是 get ，ajax 是 post

### 自定义404页面

在 app\Exceptions文件夹下的Hander中有个render方法，改造一下：
```
public function render($request, Exception $exception){

    if ($exception instanceof ModelNotFoundException) {
        $exception = new NotFoundHttpException($exception->getMessage(), $exception);
    }

    if ( ! config('app.debug')) {
        return response()->view('errors.500', [], 500);
    }

    return parent::render($request, $exception);
}
```
然后在views文件夹新建error文件夹和对应错误代码的blade文件。

