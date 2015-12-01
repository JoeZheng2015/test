require.config({
    paths: {
        'jquery': 'jquery-2.1.4.min'
    }
});
define(['jquery'], function ($) {
    $('aside a').on('mouseover', function (e) {
        var me = $(this);
        me.children().hide().eq(1).show();
        me.stop(true, false).animate({'width': '110px'}, 150);

    });
    $('aside a').on('mouseout', function (e) {
        var me = $(this);
        me.children().hide().eq(0).show();
        $(this).stop(true, false).animate({'width': '80px'}, 150);
    });
});