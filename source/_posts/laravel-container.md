---
title: Laravel 服务容器
date: 2019-03-15 23:00:00
tags: [php, laravel]
categories: 码不能停
---

在 Laravel 生命周期中，我们了解到框架运行过程中，会通过创建应用实例来完成很多事情，这个应用实例，也就是我们今天的主角，服务容器。

Laravel 的服务容器，是用于管理类的依赖和执行依赖注入的工具。

![](laravel-container/laravel.jpg)

<!-- more -->

#### 依赖注入 DI
开始之前，需要我们先了解一下，什么是依赖注入。

简单来说，就是将类的依赖通过参数或其他方式注入。

比如：
```
interface Storage{
  public function set($key, $value);
  public function get($key);
}

class SessionStorage implements Storage{
    function __construct($cookieName='PHPSESSID'){
        session_name($cookieName);
        session_start();
    }

    function set($key, $value){
        $_SESSION[$key] = $value;
    }

    function get($key){
        return $_SESSION[$key];
    }
}

class User{
  private $storage;

  function __construct(Storage $storage){
      $this->storage = $storage;
  }

  function setLanguage($language){
    $this->storage->set('language', $language);
  }
}

$storage = new SessionStorage('SESSION_ID');
$user = new User($storage);
```

`依赖注入` 并不局限于构造函数，也可以通过设值方法注入，或者类成员变量方式，通过构造函数注入适用于必要的依赖，设值注入适用于可选依赖，比如项目需要一个缓存功能的实现。
在上面的例子中，我们如果需要改用 Redis 或者 MongoDB 来存储数据，只需要继承并实现 Storage 接口，然后在外部就可以很轻松的切换服务了。

#### 依赖注入容器 IOC
在实际的开发中，用上边的依赖注入方式还是很累的，所以，我们还需要了解一个新的概念，依赖注入容器，也可以叫控制反转。

简单来说，依赖注入容器就是将组件间的依赖关系由程序内部提到外部容器来管理，也就是将依赖的配置和使用分开，原本是程序控制执行流程，现在程序反倒成了被控制的对象，也就形成了控制反转。

通常用于管理大量依赖组件的实例。比如一个框架。

首先，我们可以定义一个容器：
```
class Container
{
    public function getStorage()
    {
        return new SessionStorage();
    }

    public function getUser()
    {
        return new User($this->getStorage());
    }
}
// 更改实例化方式
$container = new Container();
$user = $container->getUser();
```

在这个容器中，我们只需要调用容器 `getUser` 方法，既可以获取到 User 实例，并不需要关心它是怎么创建出来的。

但是，这个容器还存在一些问题，Storage 的实例化还是硬编码，如果要切换其他服务，只能通过改代码的方式。

对此，我们可以再次升级容器：
```
class Container
{
    protected $binds;

    protected $instances;

    // 绑定
    public function bind($abstract, $concrete)
    {
        // 判断是否为匿名函数
        if ($concrete instanceof Closure) {
            $this->binds[$abstract] = $concrete;
        } else {
            $this->instances[$abstract] = $concrete;
        }
    }

    // 实例化
    public function make($abstract, $parameters = [])
    {
        if (isset($this->instances[$abstract])) {
            return $this->instances[$abstract];
        }

        array_unshift($parameters, $this);

        return call_user_func_array($this->binds[$abstract], $parameters);
    }
}

$container = new Container;

$container->bind('Storage', function($container){
    return new SessionStorage;
});

$container->bind('User',function($container,$module){
    return new User($container->make($module));
});

$user = $container->make('User',['Storage']);
```

一个类似于 laravel 的服务容器就好了，当然 larave 的服务容器比这个要复杂的多。

总的来说，laravel 的服务容器有两大功能：
* 注册基础服务
* 管理需要实例化的类及其依赖


#### Laravel 服务容器的使用方法
laravel 服务容器在使用时一般分为两个阶段：使用之前进行绑定（bind）完成将实现绑定到接口；使用时对通过接口解析（make）出服务。

laravel 内置多种不同的绑定方法以用于不同的使用场景：
* bind 简单绑定
* singleton 单例绑定
* instance 实例绑定
* contextual-binding 上下文绑定
* 还有好几种，看文档吧

它们的最终目标是一致的：绑定接口到实现。

这样的好处是在项目的编码阶段建立起接口和实现的映射关系，到使用阶段通过抽象类（接口）解析出它的具体实现，这样就实现了项目中的解耦。

##### bind
bind 方法的功能是将实现与接口进行绑定，然后在每次执行服务解析操作时，Laravel 容器都会重新创建实例对象。

例如：
```
$this->app->bind(
    UserRepositoryInterface::class,
    UserRepository::class
);

class UserController extends Controller
{
    private $repository;

    function __construct(UserRepositoryInterface $userRepository)
    {
        $this->repository = $userRepository;
    }

    function users(){
        return $this->repository->all();
    }
}
```
在服务提供者中，将 `User` 仓库的具体实现与接口进行绑定，使用时可以直接通过接口注入依赖。

##### singleton
采用单例绑定时，仅在首次解析时创建实例，后续使用 `make` 进行解析服务操作都将直接获取这个已解析的对象，实现共享操作。

绑定处理类似 `bind` 绑定，只需将 `bind` 方法替换成 `singleton` 方法即可。

##### instance
将已经创建的实例对象绑定到接口以供后续使用，这种使用场景类似于注册表。

比如用于存储用户模型：
```
// 创建一个用户实例
$artisan = new User();

// 将实例绑定到服务容器
App::instance('login-user', $artisan);

// 获取用户实例
$artisan = App::make('login-user');
```

##### contextual-binding
主要用于一个接口多处实现，然后根据不同控制器去进行判断具体应该用哪个实现。

```
$this->app->when(PhotoController::class)
  ->needs(Filesystem::class)
  ->give(function () {
      return Storage::disk('local');
  });
```
