layui.define(['jquery', 'element', 'util', 'laytpl', 'form'], function (exports) {

    var $ = layui.jquery
            , element = layui.element
            , layer = layui.layer
            , util = layui.util
            , laytpl = layui.laytpl;


    var gather = {
        waterfall: function () {
            var box = $(".layui-col-md3");
            var boxWidth = box.eq(0).width();

            var num = Math.floor($("#zone-list").width() / boxWidth);
            var boxArr = [];
            box.each(function (index, value) {
                var boxHeight = box.eq(index).height();
                if (index < num) {
                    boxArr[index] = boxHeight;
                } else {

                    var minboxHeight = Math.min.apply(null, boxArr), minboxIndex = $.inArray(minboxHeight, boxArr);
                    $(value).css({
                        "position": "absolute",
                        "top": minboxHeight + 15,
                        "left": box.eq(minboxIndex).position().left
                    });

                    boxArr[minboxIndex] += box.eq(index).height() + 15;

                    if (boxHeight + minboxHeight > $("#zone-list").height()) {
                        $("#zone-list").height(150 + boxArr[minboxIndex]);
                    }

                }

            });

        },
        json: function (url, data, func, options) {
            var that = this, type = typeof data === 'function';

            if (type) {
                options = func
                func = data;
                data = {};
            }

            options = options || {};

            return $.ajax({
                type: options.type || 'post',
                dataType: options.dataType || 'json',
                data: data,
                url: url,
                success: function (res) {
                    func && func(res);
                }, error: function (e) {
                    layer.msg('请求异常，请重试', {shift: 6});
                    options.error && options.error(e);
                }
            });
        },
   

    };

    exports('common', gather);
});