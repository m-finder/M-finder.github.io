---
title: PHP 和设计模式 - 对象
date: 2021-03-21 14:35:01
categories:
- 设计模式
tags:
- 设计模式
---

我们经常会用类描述对象，也经常会用对象描述类，但是这有碍于我们对于面向对象的理解，因为类决定了对象。

简而言之，类，是用来生成一个或多个对象的代码模板。

对象是根据类中定义的模板所构建的数据，我们通常会说对象是它的类的实例，对象的类型是由类定义的。

你可以用 `class` 关键字和任意类名来声明一个类，类名可以是任意数字和字母的组合，但不能以数字开头，类体必须定义在一对大括号内：

```php
class Person{

}

$person1 = new Person();
$person2 = new Person();
```

通过关键字 `new` 去创建 Person 类的对象，在上面的代码中，创建了两个实例，它们是由同一个类创建的、具有相同类型的不同对象。

如果将类看作是一个生产用的铸模，那么对象就是用铸模生产出来的具体产品。


#### 类属性

我们可以在类中定义称为 `属性` 的特殊变量。属性也称为 `成员变量`，可以用来保存各个对象中不同的数据。

除了在声明它们时必须指定可见性关键字，成员变量与普通变量看起来非常相似。

可见性关键字为 `private`，`protected` 和 `public`，它们确定类成员变量能够被访问的作用域。

```php
class Person{
  public string $name = 'wu';

}

$person = new Person();
echo $person->name;
```

#### 类方法

类方法是类中的特殊函数，它允许对象执行任务。

方法声明与函数声明类似，但是它必须在类体内。

我们可以给它加上限定词，包括可见性关键字。

```php
class Person{
  public string $name = 'wu';

  public function getName()
  {
    return $this->name;
  }
}

$person = new Person();
echo $person->getName();
```

#### 继承

继承是指从基类中派生出一个或多个类的机制。

如果一个类继承自另外一个类，那么就说它是另外一个类的子类。这种关系通常用父子关系来形容。

子类派生自父类并继承来父类的特性，这些特性包括属性也包括方法。

通常，子类会在父类所提供的功能基础上增加一些新功能，因此，也可以说子类扩展了父类。

继承通常用来 `解决代码重复`，在一个类中提供共通功能，又能在其他类在处理一些方法调用时有所不同。
#### 封装
封装是指隐藏对象内的属性和具体实现，仅对外提供公共访问方式。

封装通过 `可见性关键字` 把一个对象的属性私有化，同时提供一些可以被外界访问属性的方法，如果不想被外界访问，我们大可不提供方法给外界。但如果一个类没有提供给外界访问的方法，那么这个类也就没有意义了。

这样做的好处是：
1. 良好的封装可以减少代码耦合
2. 类内部的结构可以自由修改
3. 可以对成员进行更精确的控制
4. 隐藏信息，实现细节

具体场景如 model 获取数据。

封装可以 `提高灵活性`。使我们更容易地修改类的内部实现，而无需修改使用了该类的客户代码，从而实现对成员变量进行更精确的控制。

#### 多态
可以理解为多种表现形式，即一个对外接口，多种内部实现。

在面向对象的理论中，多态性的一般定义为：同一个操作（函数）作用于不同的类的实例，将产生不同的执行结果。即不同类的对象接收到相同的消息时，将会得到不同的结果。

举个🌰：
```php
class Light
{
    public function show($type)
    {
        switch($type){
            case 0:
                echo '红色', PHP_EOL; 
                break;
            
            case 1:
                echo '蓝色', PHP_EOL; 
                break;
            
            case 2:
                echo '绿色', PHP_EOL; 
                break;
        }
    }
}

class User
{
    public function openLight($type = 0)
    {
        $light = new Light();
        $light->show($type);
    }
}

$user = new User();
$user->openLight();
```

这是一个存在弊端的实现，如果灯光颜色非常多，后期添加就会非常麻烦。

多态实现：
```php
class Light
{
    function show()
    {
        echo '灯光随机', PHP_EOL;
    }
}

class BlueLight extends Light
{
    function show()
    {
        echo '蓝色', PHP_EOL;
    }
}

class User
{
    function openLight(Light $light)
    {
        $light->show();
    }
}
$user = new User();
$light = new Light();
$blueLight = new BlueLight();

$user->openLight($light);
$user->openLight($blueLight);
```

#### 静态方法

前面说过，类是生成对象的代码模板，对象是类的实例。我们可以调用对象的属性和方法。在前边的例子中，也都是通过对象调用属性和方法。

事实上，我们也可以访问类的属性和方法，这种方法和属性都是静态的，需要用关键字 `static` 声明：

```php
class Person{

  public static string $name = 'wu';

  public static function getName()
  {
    return self::$name;
  }
}

echo Person::getName();
```

静态方法拥有类作用域，它们无法访问类的普通属性。因为这些属性是对象的。

静态属性和静态方法是在类上被调用的，而不是在对象上，因此它们也被称为 `类属性` 和 `类方法`。我们也无法在类中通过伪变量 `$this` 调用，而是需要通过对应的 `self`。

静态属性和静态方法可以使我们无需将一个对象传入另一个对象就可以访问而不需要实例。这可以使我们省去实例化对象的麻烦，从而使代码更加整洁。

#### 常量属性

有些属性是不应当被改变的，这个时候就应该用关键字 `const` 去声明常量属性。

与普通属性不同，常量不以 `$` 开头，并且根据约定，通常用大写字母命名。

```php
class Person{

  const LEG_NUMBER = 2;
}
echo Person::LEG_NUMBER;
```

常量只能是基本类型的值，无法用来保存对象，并且与静态属性一样，我们需要通过类来访问常量。


#### 抽象类

抽象类无法被实例化，它的作用是为所有子类（继承自它的类）定义接口。

抽象类用关键字 `abstract` 声明。

```php
abstract class Person{

  public string $name;

    public function getName()
    {
        return $this->name;
    }

    public abstract function setName();
}
```

可以像在普通类中一样在抽象类中创建方法和属性，但是当实例化这个类时，就会有报错出现。因为抽象类不能被实例化。

一般情况下，抽象类至少有一个抽象方法，使用同样的关键字声明，但不能有方法体。

任何继承自抽象类的非虚子类都必须实现所有的抽象方法，否则它自己就必须被定义为抽象类。

#### 接口

抽象类允许提供一些实现，但是接口则是纯粹的模板，只提供定义功能，不能有实现。

使用关键字 `interface` 声明接口，其中可以有常量成员和方法的声明，但是不能有方法体。

```php
interface  Person
{
    public function getName(): string;

}

class Man implements Person{

  public string $name;

  public function getName(): string
  {
      // TODO: Implement getName() method.
  }
}
```

PHP 中的类只能有一个继承，但是可以同时实现多个接口。

#### Trait

PHP 不支持多继承，一个类只能有一个父类，但是可以实现多个接口。

接口提供没有任何实现的类型，如果我们希望在继承层次中共享实现，就需要借助于   `trait`。

trait 是类似于类的结构，它本身不能被实例化，但是可以混合到类中，在 trait 中定义的任何方法都可以被使用它的任何类所使用。

#### 延时静态绑定：static 关键字

static 和 self 类似，区别在于前者引用的是被调用的类，而不是包含类。

```php
abstract class DomainObject
{
    public static function create()
    {
        return new static();
    }
}

class User extends DomainObject()
{
    
}

$user = User::create();
```

调用 `User::create()` 会创建一个 User 实例，而不是尝试创建 `DomainObject` 实例。

#### 异常捕获

```php
try{
    $name =  'wu';
}catch(\Exception $e){
    throw $e;
}finally{
    echo 'finally';
}
```

无论 catch 子句是重新抛出异常还是返回一个值，finally 子句都会执行，但如果在 try 或 catch 中调用了 die() 或 exit()，那么程序就会终止，finally 子句也就不会执行。

#### final 类

final 类可以防止类再被继承。final 方法也无法重写。

```php
final class Person{
    public final function getName()
    {
        return 'wu';
    }
}
```

#### 内部错误捕获

可以在 try catch 子句中通过指定 Error 这个父类或它的子类来捕获相匹配的内部错误。

```php
try {
    eval('illegal code');
} catch (\ParseError $e) {
    echo 'parse error', PHP_EOL;
} catch (\Error $e) {
    echo 'error', PHP_EOL;
} finally {
    echo 'finally', PHP_EOL;
}
```

同样的， finally 在这里也可以用。

#### 拦截器

PHP 内置的拦截器方法可以拦截发送给为定义方法和属性的消息。

PHP 支持三个内置的拦截器方法。与 `__construct()`  相似，这些方法也会在适当的条件下自动调用。


| 方法 | 说明 |
|:-----|:-----|
|  __get($property) | 访问未定义属性时会被调用  |
| __set($property, $value)| 对未定义属性赋值时会被调用 |
| __isset($property) | 对未定义属性调用 isset()时调用 |
| __unset($property) | 对未定义属性调用 unset()时调用 |
| __call($method, $args) | 调用未定义非静态方法时调用 |
| __callStatic($method, $args)| 调用未定义静态方法时调用 |

```php
class Person{
    public function __get($property)
    {
        $method = "get{$property}";
        if(method_exists($this, $method)){
            return $this->$method();
        }
    }

    public function getName(): string
    {
        return 'wu';
    }
}

$person = new Person();
echo $person->name;
```

#### 析构方法

析构方法会在类被垃圾回收前，也就是从内存中抹去前调用。
可以用这个方法执行一些必要的清理工作。

析构方法和前边的拦截器都属于魔术方法，使用时应该慎重。

#### 回调、匿名函数和闭包

回调有什么作用呢？它允许程序在运行期间将与组件核心任务没有直接关系的功能插入组件。通过让组件拥有回调能力，可以赋予其他程序员在我们不知道的上下文上获得扩展程序的能力。

```php
class Person{

    protected $callbacks = [];
    protected $name = 'wu';
    public function __construct()
    {
        $log = function ($person){
            echo $person->name, PHP_EOL;
        };

        $this->callbacks[] = $log;
    }

    public function getName(): string
    {
        foreach ($this->callbacks as $callback)
        {
            if(is_callable($callback)){
                call_user_func($callback, $this);
            }
        }
        return $this->name;

    }
}
```

上面的代码中，将匿名函数（闭包函数）赋值给 $log，然后将它作为参数传递给函数和方法，然后在指定的位置进行回调。

匿名函数可以引用那些声明在其父作用域中的变量，通过 `use()` 操作。


#### 匿名类

当需要从很小的类中创建和继承实例，并且这个类很简单而且特定于局部上下文时，匿名类非常有用。

```php
interface PersonWriter{

    public function write(Person $person);
}


class Person{

    public $name = 'wu';
    public function getName(PersonWriter $writer)
    {
        echo $writer->write($this), PHP_EOL;
    }
}

$person = new Person();
$person->getName(new class implements PersonWriter{
    public function write(Person $person)
    {
        echo $person->name, PHP_EOL;
    }
});
```

匿名类不支持闭包，也就无法访问定义在匿名类外的属性，但是可以通过构造函数将参数传入。
