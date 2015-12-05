/**
 * 瀑布流
 * @param {Object} options 瀑布流的参数
 * {string} options 为需要使用瀑布流的元素
 * {number} width 元素的宽度
 * {number} hGap 水平间隙
 * {number} vGap 垂直间隙
 * {number} num 行数
 */
function Waterfall(options) {
    this.options = options;
    this.colTop = [];
    this.colLeft = [];
    // 记录瀑布流已经排序过的dom，避免加载后重排
    this.count = 0;
    this.init();
}
Waterfall.prototype = {
    constructor: Waterfall,
    init: function() {
        var that = this,
            options = that.options,
            defaults = {},
            containerWidth, width;
        that.el = typeof options === 'string' ? options : options.el;
        that.$el = $(that.el);
        that.$container = that.$el.parent().css({position: 'relative'});

        containerWidth = that.$container.width();
        width = that.$el.eq(0).width();
        defaults = {
            width: width,
            hGap: 15,
            vGap: 15
        };
        // 如果定义的行数
        if (options && options.num) {
            defaults.hGap = Math.floor((containerWidth - options.num * width) / (options.num - 1));
        }
        // 如果定义了水平间距
        else if (options && options.hGap) {
            defaults.num = Math.floor((containerWidth + options.hGap) / (width + options.hGap));
        }
        // 都没定义，则根据默认的水平间距来得出行数
        else {
            defaults.num = Math.floor((containerWidth + defaults.hGap) / (width + defaults.hGap));
        }
        that.options = $.extend(defaults, options);
        that.apply();
    },
    apply: function() {
        var that = this,
            options = that.options;
        $.each(that.$el, function(i, item) {
            if (i >= that.count) {
                var $item = $(item),
                    height = $(item).height(),
                    index = i;
                if (i < options.num) {
                    that.colLeft.push(i * (options.width + options.hGap));
                    that.colTop.push(0);
                }
                else {
                    var minHeight = Math.min.apply(null, that.colTop);
                    index = $.inArray(minHeight, that.colTop);
                }
                $item.css({
                    position: 'absolute',
                    top: that.colTop[index],
                    left: that.colLeft[index]
                }).attr('index', options.hGap);
                that.colTop[index] += height + options.vGap;
                that.count++;
            }
        });
    },
    refresh: function() {
        this.$el = $(this.el);
        this.apply();
    }
};