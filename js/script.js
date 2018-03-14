(function ($) {
    // Search
    var $searchWrap = $('#search-form-wrap'),
        isSearchAnim = false,
        searchAnimDuration = 200;

    var startSearchAnim = function () {
        isSearchAnim = true;
    };

    var stopSearchAnim = function (callback) {
        setTimeout(function () {
            isSearchAnim = false;
            callback && callback();
        }, searchAnimDuration);
    };

    $('#nav-search-btn').on('click', function () {
        if (isSearchAnim)
            return;

        startSearchAnim();
        $searchWrap.addClass('on');
        stopSearchAnim(function () {
            $('.search-form-input').focus();
        });
    });

    $('.search-form-input').on('blur', function () {
        startSearchAnim();
        $searchWrap.removeClass('on');
        stopSearchAnim();
    });

    // Caption
    $('.article-entry').each(function (i) {
        $(this).find('img').each(function () {
            if ($(this).parent().hasClass('fancybox'))
                return;

            var alt = this.alt;

            if (alt)
                $(this).after('<span class="caption">' + alt + '</span>');

            $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
        });

        $(this).find('.fancybox').each(function () {
            $(this).attr('rel', 'article' + i);
        });
    });

    if ($.fancybox) {
        $('.fancybox').fancybox();
    }

    // Mobile nav
    var $container = $('#container'), isMobileNavAnim = false, mobileNavAnimDuration = 200;

    var startMobileNavAnim = function () {
        isMobileNavAnim = true;
    };

    var stopMobileNavAnim = function () {
        setTimeout(function () {
            isMobileNavAnim = false;
        }, mobileNavAnimDuration);
    }

    $('#main-nav-toggle').on('click', function () {
        if (isMobileNavAnim) {
            return;
        }
        startMobileNavAnim();
        $container.toggleClass('mobile-nav-on');
        stopMobileNavAnim();
    });

    $('#wrap').on('click', function () {
        if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) {
            return;
        }
        $container.removeClass('mobile-nav-on');
    });

    //百度统计
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?524d4ff49c442d1db8994544cccacfc7";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    //百度推送
    (function () {
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();

    
})(jQuery);