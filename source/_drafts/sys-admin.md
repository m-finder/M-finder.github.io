---
title: sys-admin
date: 2019-07-18
tags: [laravel,php]
categories: 码不能停
---

### 插件安装
#### adminLTE
```
npm install admin-lte --save
```

然后在css中导入：
```css
// AdminLTE
@import "~admin-lte/bower_components/bootstrap/dist/css/bootstrap.css";
@import "~admin-lte/bower_components/font-awesome/css/font-awesome.css";
@import "~admin-lte/bower_components/Ionicons/css/ionicons.css";
@import "~admin-lte/dist/css/AdminLTE.css";
@import "~admin-lte/dist/css/skins/_all-skins.css";
@import "~admin-lte/bower_components/morris.js/morris.css";
@import "~admin-lte/bower_components/jvectormap/jquery-jvectormap.css";
@import "~admin-lte/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.css";
@import "~admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker.css";
@import "~admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.css";
```

js:
```javascript
require('admin-lte/dist/js/adminlte.js');
require('admin-lte/dist/js/demo.js');
```

页面布局套进来就可以了。

#### laravel-permission
```
composer require spatie/laravel-permission
```

```
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider" --tag="migrations"
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider" --tag="config"
```

修改UserModel:
```php
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

$role = Role::create(['name' => '超级管理员']);  // 创建角色
$db->assignRole('超级管理员');  
```
