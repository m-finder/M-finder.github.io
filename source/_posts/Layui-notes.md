---
title: Layui使用备忘
date: 2017-12-22 09:39:12
tags: [js,layui]
categories: 码不能停
---

一个关于 form 渲染特殊用法的解决方案。
![](layui.png)

<!--more-->
### 需求 :
项目中需要做一个带参导入功能 , 画面效果如下图:
![效果图](2017-11-16-10-48-47-5a0cfc8febf33.png)

### 遇到的问题 : 
1. 弹窗中 select 不显示
2. select 显示后 , 选中某项时无法把值传入后台

### 解决办法 :
1. 在弹窗的 success 中使用 form.render('select') 重新渲染select
2. 在弹窗的 success 中增加 select 切换事件监听 , 然后使用变量 uploader 承接 upload.render , 在监听到 select 切换时 , 使用 uploader.config.data = {'asset_type': data.value} 来更新 upload 中的 data 参数 , 最后再给 upload 增加 before 参数 , 来接收不切换 select 时的 data 值 .

### 代码 :
html :
```
<script id="importTpl" type="text/html">
    <form class="layui-form layui-form-pane " method="POST"  onsubmit="return false" >
        <div style="padding: 15px;width:400px;margin:0 auto;">
            <div class="layui-form-item" >
                <label class="layui-form-label">导入文件类型</label>
                <div class="layui-input-block">
                    <select name="asset_type" id='asset_type' lay-filter="asset_type">
                        <option value="1" selected>个人贷款</option>
                        <option value="4">票据</option>
                    </select>
                </div>
            </div>
            <div class="layui-form-item" >
                <button type="button" class="layui-btn layui-btn-primary" id="import">
                    <i class="layui-icon"></i>
                    选择文件
                </button>
            </div>

            <div class="layui-row" >
                <button class="layui-btn do-import layui-btn-danger " type="button">
                    确定导入
                </button>
            </div>
        </div>
    </form>
</script>
```

javascript :
```
$('#asset-import').click(function () {
    layer.open({
        area: ['450px', '250px'],
        title: '项目导入',
        type: 1,
        content: $('#importTpl').html(),
        success: function (layero, index) {
            form.render('select');

            form.on('select', function (data) {
                uploader.config.data = {'asset_type': data.value};
            });
            var uploader = upload.render({
                url: '/reg/asset-import'
                , elem: '#import'
                , accept: 'file'
                , auto: false
                , bindAction: '.do-import'
                , before: function (obj) {
                        uploader.config.data = {'asset_type': $('#asset_type').val()};
                }
                , done: function (res) {
                    layer.close(index);
                    if (res.code == 0) {
                        layer.msg(res.msg, {icon: 1});
                    } else {
                        layer.alert(res.msg, {icon: 2});
                    }
                }
            });
        }
    });
});
```