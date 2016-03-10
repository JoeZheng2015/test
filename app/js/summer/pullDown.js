function pullDown(options) {
    options = $.extend({
        $container: '',
        url: location.href,
        preAjaxing: undefined,
        postAjaxing: undefined,
        data: {
            page: 1
        },
        threshold: 200
    }, options);

    var $window = $(window);
    var ajaxing = false;
    $window.on('scroll', getData);
    getData();

    function check() {
        return $('body').height() - $window.height() - $window.scrollTop() < options.threshold && !ajaxing;
    }
    function getData() {
        if (check()) {
            ajaxing = true;
            if (preAjaxing) {
                preAjaxing();
            }
            $.get(options.url, options.data).done(function(res) {
                if (res.ret === 0) {
                    options.$container.append(res.data[0].html);
                    M.opt.lazyload();
                    if (res.data[0].has_next) {
                        options.data.page++;
                    }
                    else {
                        $window.off("scroll", getData);
                    }
                }
            }).always(function() {
                ajaxing = false;
                if (postAjaxing) {
                    postAjaxing();
                }
            });
        }
    }
}