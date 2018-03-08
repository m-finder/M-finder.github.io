layui.define(['layer', 'util', 'element'], function (exports) {

    var $ = layui.jquery
            , layer = layui.layer
            , util = layui.util
            , element = layui.element;

    var gather = {
        photo: function (target) {
            layer.photos({
                photos: target
                , zIndex: 9999999999
                , anim: -1
            });

        }
        , getDomain: function () {
            return window.location.href.split('://')[1].split(/[/]+/, 1)[0];
        }
        , getQueryDir: function () {
            return window.location.href.split('://')[1].split('?', 1)[0].replace(this.getDomain(), '').split(/\/$/, 1)[0];
        }
        , getUrl: function () {
            return window.location.href.split('://')[1];
        }
    };
    
    query_dir = gather.getQueryDir();
    
    //导航选中
    if (query_dir === '') {
        $($(".nav-header-container").find("a[href='/']")).addClass('activity').siblings().removeClass('hover');
    } else {
        $($(".nav-header-container").find("a[href='" + query_dir + "']")).addClass('hover').siblings().removeClass('hover');
    }
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