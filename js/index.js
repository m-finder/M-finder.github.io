layui.define(['layer', 'util', 'element'], function (exports) {

    var $ = layui.jquery , layer = layui.layer , util = layui.util , element = layui.element;


    //右下角固定Bar
    util.fixbar({
        bar1: false
        , bgcolor: 'rgb(0, 150, 136)'
        , click: function (type) {
            if (type === 'bar1') {
                layer.msg('bar1');
            }
        }
    });

    exports('index');
});