// 定义两个脚本的依赖
define(["jquery", "jquery.alpha", "jquery.beta"], function($) {
    $(function() {
        $('body').alpha().beta();
    });
});
