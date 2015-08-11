$(function () {
    var handler;
    $(window).on('resize, load', function () {
        clearTimeout(handler);
        handler = setTimeout(function () {
            height = window.document.documentElement.clientHeight;
            $('#wrapper').css({'height': height + 'px'});
            $('.slide').addClass('hide').first().addClass('curr').removeClass('hide');
        }, 300);
    }, false);
    // $('.curr').on('touchstart', function (e) {
    //     e.preventDefault();
    //     debugger;
    //     var translate = slides.css('transform') || slides.css('-webkit-transform');
    //     startY = e.changedTouches[0].clientY;
    //     baseY = parseFloat(translate.match(/translateY\((.*)px\)/)[1]);
    // })
    $('.ascend').on('click', decideDir);
    $('.descend').on('click', decideDir);
    function decideDir(e) {
        if($('.curr').hasClass('animated')){
            return;
        }
        var index = parseInt($('.curr').attr('data-index'));
        if (this.className.slice(6) === 'ascend' && index < $('.slide').length) {
            decideAnimate('up');
        }
        else if (this.className.slice(6) === 'descend' && index > 1) {
            decideAnimate('down');
        }
        return;
    };
    function decideAnimate(dir) {
        var action = {
            'up': {
                currClass: 'pt-page-moveToTop',
                nextClass: 'pt-page-moveFromBottom'
            },
            'down': {
                currClass: 'pt-page-moveToBottom',
                nextClass: 'pt-page-moveFromTop'
            }
        };
        var currentIndex = parseInt($('.curr').attr('data-index'));
        var nextIndex = dir === 'up' ? currentIndex + 1 : currentIndex - 1;
        var next = '[data-index="'+ nextIndex + '"]';
        animate($('.curr'), $(next), action[dir].currClass, action[dir].nextClass);
    };
    function animate(curr, next, currClass, nextClass) {
        curr.addClass(currClass);
        next.removeClass('hide').addClass(nextClass + ' curr animated');
        setTimeout(function () {
            curr.addClass('hide').removeClass(currClass + ' curr');
            next.removeClass(nextClass + ' animated');
        }, 600);
    };
});