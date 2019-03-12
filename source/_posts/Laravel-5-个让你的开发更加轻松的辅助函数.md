---
title: Laravel 5 个让你的开发更加轻松的辅助函数
date: 2018-04-09 16:58:01
tags: laravel
categories: 码不能停
---

#### data_get() 
------
*data_get()* 辅助方法能够让你更轻松的获取数组或者对象中的值。如果数组或者对象的key不存在的话，这个方法的第三个可选参数设置一个默认值。

```
#数组
$array = ['albums' => ['rock' => ['count' => 75 ]]];
$count = data_get($array, 'albums.rock.count'); #75
$avgCost = data_get($array, 'albums.rock.avg_cost', 0); #0

#对象
$object->albums->rock->count = 75;
$count = data_get($object, 'albums.rock.count');#75
$avgCost = data_get($object, 'albums.rock.avg_cost', 0); #0
```
<!--more-->

返回一个数组：
```php
$array = ['albums' => ['rock' => ['count' => 75], 'punk' => ['count' => 12]]];
$counts = data_get($array, 'albums.*.count'); #[75, 12]
```

*data_get()* 辅助方法能够让你轻松的再数组或者对象中使用相同的语法来查找数据。
这样你就不必检查你之前使用的变量是什么类型了。

#### str_plural()
-----
*str_plural()* 是将字符串变成对应的复数形式，只对英文的单词有效，第二个可选的参数能够让开发者来自己决定返回单数还是复数。

```php
str_plural('dog'); #dogs
str_plural('cat'); #cats

str_plural('dog', 2); #dogs
str_plural('cat', 1); #cat
```
#### route()
-----

*route()* 方法能够生成已经命名的路由，可选的第二个参数将会传递给路由的参数。

```php
Route::get('burgers', 'BurgersController@index')->name('burgers');
route('burgers'); #http://example.com/burgers
route('burgers', ['order_by' => 'price']); #http://example.com/burgers?order_by=price

Route::get('burgers/{id}', 'BurgersController@show')->name('burgers.show');
route('burgers.show', 1); #http://example.com/burgers/1
route('burgers.show', ['id' => 1]); #http://example.com/burgers/1

Route::get('employees/{id}/{name}', 'EmployeesController@show')->name('employees.show');
route('employees.show', [5, 'chris']);#http://example.com/employees/5/chris
route('employees.show', ['id' => 5, 'name' => 'chris']);#http://example.com/employees/5/chris
route('employees.show', ['id' => 5, 'name' => 'chris', 'hide' => 'email']);#http://example.com/employees/5/chris?hide=email
```

如果将第三个可选参数设为false的话，那么将会返回一个相对地址而不是一个绝对地址

```php
route('burgers.show', 1, false); #/burgers/1
```

设置了子域名的也是同样的道理， 并且你也可以将Eloquent模型传参给route()方法。

```php
Route::domain('{location}.example.com')->group(function () {
    Route::get('employees/{id}/{name}', 'EmployeesController@show')->name('employees.show');
});

route('employees.show', ['location' => 'raleigh', 'id' => 5, 'name' => 'chris']); 

route('burgers.show', Burger::find(1)); #http://example.com/burgers/1
```

#### abort_if()
-----

*abort_if()* 这个辅助方法将会抛出一个异常如果符合满足的要求。第三个可选参数为抛出异常的消息，第四个为header数组。

```php
abort_if(! Auth::user()->isAdmin(), 403);
abort_if(! Auth::user()->isAdmin(), 403, 'Sorry, you are not an admin');
abort_if(Auth::user()->isCustomer(), 403);
```

这个方法最主要的用处就是精简类似下面的代码，通过使用 abort_if() 能够只用一行代码实现同样的功能。

```php
public function index(){
    if (! Auth::user()->isAdmin()) {
        abort(403, 'Sorry, you are not an admin');
    }
}

#better
public function index(){
    abort_if(! Auth::user()->isAdmin(), 403);
}
```

#### optional()
----

*optional()* 这个方法允许你来获取对象的属性或者调用方法。如果该对象为null，那么属性或者方法也会返回null而不是引起一个错误。

```php
$user1 = User::find(1);
$accountId = $user1->account->id;#123
$accountId = $user2->account->id ?? null; #null

$accountId = optional($user2->account)->id;#null
```

这几个方法是不是很有用呢，快点试试熟悉一下吧