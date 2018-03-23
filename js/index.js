layui.define(['layer', 'util', 'element'], function (exports) {

    var $ = layui.jquery, layer = layui.layer, util = layui.util, element = layui.element;


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

    $(function () {
        $('.dashang').click(function () {
            layer.tab({
                area: ['450px', '493px'],
                tab: [{
                    title: '<img src="/images/alipay.png">',
                    content: '<img style="max-width:100%;height:auto;" src="/images/alipayimg.png">'
                }, {
                    title: '<img  src="/images/wechat.png">',
                    content: '<img style="max-width:100%;height:auto;" src="/images/wechatimg.png">'
                }]
            });
        });
    });
    exports('index');
});