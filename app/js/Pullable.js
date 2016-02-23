function Pullable(option) {
    var el = document.querySelector(option.el);
    var $el = $(option.el);
    var startY;

    el.addEventListener('touchstart', function(e) {
        console.log('---------start-------------');
        e = e.changedTouches ? e.changedTouches[0] : e;
        startY = e.pageY;
    }, false);
    el.addEventListener('touchmove', function(e) {
        e = e.changedTouches ? e.changedTouches[0] : e;
        var offsetY = e.pageY - startY;
        if (offsetY >= 0 && $(window).scrollTop() === 0) {
            var dampen = offsetY > 0 ? 2 : 4;
            console.log(offsetY);
            $el.css({
                top: offsetY / dampen + 'px'
            });
        }
    }, false);
    el.addEventListener('touchend', function(e) {
        console.log('--------end--------');
        e = e.changedTouches ? e.changedTouches[0] : e;
        var offsetY = e.pageY - startY;
        if (offsetY >= 0) {
            $el.animate({
                top: '0px'
            }, 200, 'linear', option.callback);
        }
    }, false);
    el.addEventListener('touchcancel', function(e) {
        console.log('-------cancel---------');
    }, false);
}