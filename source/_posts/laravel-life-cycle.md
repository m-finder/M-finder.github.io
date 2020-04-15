---
title: Laravel 生命周期
date: 2019-03-15 23:00:00
tags: [php, laravel]
categories: 码不能停
---

Laravel 的生命周期主要分为四个阶段：

1. 加载依赖
2. 创建应用实例
3. 接收请求并响应
4. 请求结束进行回调

![](laravel-life-cycle/laravel.jpg)
<!-- more -->

这四个阶段都在 index.php 中完成：
```
<?php
// 加载依赖
require __DIR__.'/../vendor/autoload.php';

// 创建应用实例
$app = require_once __DIR__.'/../bootstrap/app.php';

// 实例化 HTTP 内核
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

// 接收请求，生成响应
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

// 发送响应
$response->send();

// 请求结束，进行回调
$kernel->terminate($request, $response);
```

#### 1. 加载依赖
laravel 框架依赖 composer 管理扩展包，通过引入 composer 的自动加载程序，就可以轻松完成扩展加载：
```
require __DIR__.'/../vendor/autoload.php';
```

#### 2 创建应用实例
这一步主要由以下几个小步骤组成：
* 创建应用实例
* 完成基础注册
  - 基础绑定
  - 基础服务提供者注册
    - event
    - log
    - route
  - 核心类别名注册
* 绑定核心

创建应用实例，由 bootstrap/app.php 完成，然后注册三个核心。

```
<?php
// 第一部分： 创建应用实例
$app = new Illuminate\Foundation\Application(
    realpath(__DIR__.'/../')
);

……
```

##### 2.1 完成基础注册
应用实例创建后，再来看一下具体是怎么工作的，打开 `Illuminate\Foundation\Application`，其代码如下：

```
public function __construct($basePath = null)
{
    // 应用的路径绑定
    if ($basePath) {
        $this->setBasePath($basePath);
    }

    // 将基础绑定注册到容器中，容器名
    $this->registerBaseBindings();
    // 将基础服务提供者注册到容器 Event、Log、Route
    $this->registerBaseServiceProviders();
    // 将核心类别名注册到容器
    $this->registerCoreContainerAliases();
}
```

##### 2.2 内核绑定
接着看 `bootstrap/app.php` 中的代码：
```
……

// 第二步，内核绑定

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);


$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);
```
绑定三个内核，HTTP、Console、Exception内核。

#### 3 接收请求并响应
再次回到 index.php，查看请求和响应的相关代码：
```
……

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

……
```
这一步也是由几个小步骤组成：
* 实例化 HTTP 核心
  - 实例化内核
  - 注册中间件到路由
    - session
    - 共享错误
    - 身份验证请求
    - ……
* 请求处理
  - 创建请求实例
  - 处理请求，返回响应
* 发送响应

##### 3.1 注册中间件到路由

在 `Illuminate\Contracts\Http\Kernel::class` 类的构造方法中，将在 HTTP 内核定义的「中间件」注册到路由，注册完后就可以在实际处理 HTTP 请求前调用这些「中间件」实现过滤请求的目的。

```
protected $middlewarePriority = [
    \Illuminate\Session\Middleware\StartSession::class,
    \Illuminate\View\Middleware\ShareErrorsFromSession::class,
    \Illuminate\Contracts\Auth\Middleware\AuthenticatesRequests::class,
    \Illuminate\Routing\Middleware\ThrottleRequests::class,
    \Illuminate\Session\Middleware\AuthenticateSession::class,
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
    \Illuminate\Auth\Middleware\Authorize::class,
];

public function __construct(Application $app, Router $router)
{
    $this->app = $app;
    $this->router = $router;

    $this->syncMiddlewareToRouter();
}

// 注册中间件到路由
protected function syncMiddlewareToRouter()
{
    $this->router->middlewarePriority = $this->middlewarePriority;

    foreach ($this->middlewareGroups as $key => $middleware) {
        $this->router->middlewareGroup($key, $middleware);
    }

    foreach ($this->routeMiddleware as $key => $middleware) {
        $this->router->aliasMiddleware($key, $middleware);
    }
}

```

##### 3.2 处理请求
处理请求实际包含两个阶段：
* 创建请求实例
* 处理请求

###### 3.2.1 创建请求实例
通过 Symfony 实例创建一个 Laravel 请求实例。

```
public static function capture()
{
    static::enableHttpMethodParameterOverride();

    return static::createFromBase(SymfonyRequest::createFromGlobals());
}

public static function createFromBase(SymfonyRequest $request)
{
    $newRequest = (new static)->duplicate(
        $request->query->all(), $request->request->all(), $request->attributes->all(),
        $request->cookies->all(), $request->files->all(), $request->server->all()
    );

    $newRequest->headers->replace($request->headers->all());

    $newRequest->content = $request->content;

    $newRequest->request = $newRequest->getInputSource();

    return $newRequest;
}
```

###### 3.2.2 处理请求
在 HTTP 核心的 handdle 方法内，接收一个请求，也就是上一步创建的请求实例，最终生成一个响应。

主要步驟如下：
* 注册请求到容器
* 运行引导程序
  - 环境检测，将 env 中的配置读取到变量中
  - 配置文件加载
  - 加载异常处理
  - 注册门面
  - 注册服务提供者
  - 服务启动
* 发送请求到路由
  - 查找路由
  - 运行控制器或匿名函数
* 返回响应

HTTP 核心的 handle 方法：
```
public function handle($request)
{
    try {
        $request->enableHttpMethodParameterOverride();

        $response = $this->sendRequestThroughRouter($request);
    } catch (Throwable $e) {
        $this->reportException($e);

        $response = $this->renderException($request, $e);
    }

    $this->app['events']->dispatch(
        new RequestHandled($request, $response)
    );

    return $response;
}
```

再往下深入，查看 `$response = $this->sendRequestThroughRouter($request);`  的具体实现：

```
protected function sendRequestThroughRouter($request)
{
   // 将请求注册到容器
    $this->app->instance('request', $request);

    Facade::clearResolvedInstance('request');

    // 启动引导程序
    $this->bootstrap();

    // 发送请求至路由
    return (new Pipeline($this->app))
                ->send($request)
                ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
                ->then($this->dispatchToRouter());
}
```

首先，将 request 注册到容器内，然后清除掉之前的 request 实例缓存，启动引导程序，然后将请求发送到路由。

接下来，看一下引导程序是做什么的：

```
protected $bootstrappers = [
    \Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables::class,
    \Illuminate\Foundation\Bootstrap\LoadConfiguration::class,
    \Illuminate\Foundation\Bootstrap\HandleExceptions::class,
    \Illuminate\Foundation\Bootstrap\RegisterFacades::class,
    \Illuminate\Foundation\Bootstrap\RegisterProviders::class,
    \Illuminate\Foundation\Bootstrap\BootProviders::class,
];

public function bootstrap()
{
    if (! $this->app->hasBeenBootstrapped()) {
        $this->app->bootstrapWith($this->bootstrappers());
    }
}

protected function bootstrappers()
{
    return $this->bootstrappers;
}

// src/Illuminate/Foundation/Application.php
public function bootstrapWith(array $bootstrappers)
{
    $this->hasBeenBootstrapped = true;

    foreach ($bootstrappers as $bootstrapper) {
        $this['events']->dispatch('bootstrapping: '.$bootstrapper, [$this]);

        $this->make($bootstrapper)->bootstrap($this);

        $this['events']->dispatch('bootstrapped: '.$bootstrapper, [$this]);
    }
}
```

在容器内的具体实现方法中，会先解析引导程序，然后再通过调用引导程序的  `bootstrap` 方法来启动服务。
引导程序功能：
* 环境检测，将 env 配置文件载入到 `$_ENV` 变量中
* 加载配置文件
* 加载异常处理
* 加载 Facades，注册完成后可以用别名的方式访问具体的类
* 注册服务提供者，在这里我们会将配置在 app.php 文件夹下 providers 节点的服务器提供者注册到 APP 容器，供请求处理阶段使用
* 服务启动

在发送请求至路由这行代码中，完成了：管道（pipeline）创建、将 request 传入管道、对 request 执行中间件处理和实际的请求处理四个不同的操作。
```
return (new Pipeline($this->app))
    ->send($request)
    ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
    ->then($this->dispatchToRouter());
```


继续深入 `$this->dispatchToRouter()`，分析程序是如何处理请求的：
* 注册请求
* 查找路由
* 运行控制器
* 返回响应结果


```
protected function dispatchToRouter()
{
    return function ($request) {
        // 将请求注册到容器
        $this->app->instance('request', $request);

        return $this->router->dispatch($request);
    };
}

public function dispatch(Request $request)
{
    $this->currentRequest = $request;

    return $this->dispatchToRoute($request);
}

public function dispatchToRoute(Request $request)
{
  return $this->runRoute($request, $this->findRoute($request));
}

// 查找路由
protected function findRoute($request)
{
    $this->current = $route = $this->routes->match($request);

    $this->container->instance(Route::class, $route);

    return $route;
}

protected function runRoute(Request $request, Route $route)
{
    $request->setRouteResolver(function () use ($route) {
        return $route;
    });

    $this->events->dispatch(new RouteMatched($route, $request));

    return $this->prepareResponse($request,
        $this->runRouteWithinStack($route, $request)
    );
}

protected function runRouteWithinStack(Route $route, Request $request)
{
    $shouldSkipMiddleware = $this->container->bound('middleware.disable') &&
                            $this->container->make('middleware.disable') === true;

    $middleware = $shouldSkipMiddleware ? [] : $this->gatherRouteMiddleware($route);

    // 返回运行结果
    return (new Pipeline($this->container))
                    ->send($request)
                    ->through($middleware)
                    ->then(function ($request) use ($route) {
                        // 运行匹配到的路由控制器或匿名函数
                        return $this->prepareResponse(
                            $request, $route->run()
                        );
                    });
}

```
执行 `$route->run()` 的方法定义在 `Illuminate\Routing\Route` 类中：
```
public function run()
{
    $this->container = $this->container ?: new Container;

    try {
        if ($this->isControllerAction()) {
            return $this->runController();
        }

        return $this->runCallable();
    } catch (HttpResponseException $e) {
        return $e->getResponse();
    }
}
```
如果路由的实现是一个控制器，会完成控制器实例化并执行指定方法；如果是一个匿名函数就会直接调用。最终响应通过 `prepareResponse` 返回。


##### 3.2.3 发送响应
绕了一大圈，最后终于回到了开始的地方
```
// 发送响应
$response->send();
```
最终发送，由 `src/Illuminate/Http/Response.php` 的父类 `Symfony\Component\HttpFoundation\Response` 完成：
```
public function send()
{
  $this->sendHeaders();
  $this->sendContent();

  if (\function_exists('fastcgi_finish_request')) {
      fastcgi_finish_request();
  } elseif (!\in_array(\PHP_SAPI, ['cli', 'phpdbg'], true)) {
      static::closeOutputBuffers(0, true);
  }

  return $this;
}
```

#### 4 请求结束，进行回调
```
$kernel->terminate($request, $response);
```
继续往下看，核心的  `terminate` 方法：
```
public function terminate($request, $response)
{
    $this->terminateMiddleware($request, $response);

    $this->app->terminate();
}
```
`terminateMiddleware` 中，进行终止中间件，`$this->app->terminate()` 终止程序。

#### 总结
创建应用实例，完成项目路径注册、基础服务注册、核心类别名注册，然后将 HTTP 和 Console， Exception 核心注册到容器。

然后再实例化内核，将中间件加载到路由，再将请求注册到容器，然后运行引导程序，进行环境检测、加载系统配置等系统环境配置。

然后进行中间件校验，通过校验后才会最终处理实际的控制器或匿名函数并生成响应。

最终，发送响应给用户，清理项目中的中间件，完成一个请求周期。
