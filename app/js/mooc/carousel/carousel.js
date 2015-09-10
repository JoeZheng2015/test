$(function() {
    function Carousel(poster) {
        var _this = this;
        _this.animated = false;
        _this.poster = poster;
        _this.posterList = poster.find('.poster-list');
        _this.posterItems = poster.find('.poster-item');
        _this.nextBtn = poster.find('.poster-next-btn');
        _this.prevBtn = poster.find('.poster-prev-btn');
        _this.posterFirstItem = _this.posterItems.eq(0);
        if (_this.posterItems.length%2 === 0) {
            _this.posterList.append(_this.posterItems.eq(0).clone());
            _this.posterItems = poster.find('.poster-item');
        }
        _this.size = _this.posterItems.length;
        _this.setting = {
            "width":1000,           //幻灯片的宽度
            "height":270,               //幻灯片的高度
            "posterWidth":640,  //幻灯片第一帧的宽度
            "posterHeight":270, //幻灯片第一帧的高度
            "scale":0.9,                    //记录显示比例关系
            "speed":500,
            "autoPlay":false,
            "delay":5000,
            "verticalAlign": 'middle', //top bottom
            'dir': 'right'
        };
        $.extend(_this.setting, _this.getSetting());
        _this.setValue();
        _this.setPosition();
        $('.poster-next-btn').on('click', function (e) {
            _this.play('right');
        });
        $('.poster-prev-btn').on('click', function (e) {
            _this.play('left');
        });
        if (_this.setting.autoPlay) {
            _this.autoPlay();
        }
    };

    Carousel.prototype = {
        constructor: Carousel, // 不然Carousel.prototype.constructor就是{}原型对象的构造函数，就是Object
        getSetting: function () {
            var setting = this.poster.data('setting'); // this在这表示Carousel,因为是对象Carousel调用getSetting方法，然后this.poster指向的是对象里的属性
            return setting;
        },
        setValue: function () {
            var width = (this.setting.width - this.setting.posterWidth)/2;
            this.poster.css({
                width: this.setting.width,
                height: this.setting.height
            });
            this.posterList.css({
                width: this.setting.width,
                height: this.setting.height
            });
            this.posterFirstItem.css({
                width: this.setting.posterWidth,
                height: this.setting.posterHeight,
                left: width,
                top: 0,
                zIndex: Math.floor(this.size/2)
            });
            this.nextBtn.css({
                width:width,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.size()/2)
            });
            this.prevBtn.css({
                width:width,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.size()/2)
            });
        },
        setPosition: function () {
            var _this = this,
                sliceItems = _this.posterItems.slice(1),
                level = Math.floor(_this.posterItems.length / 2),
                sliceSize = sliceItems.length / 2,
                rightSlice = sliceItems.slice(0, sliceSize),
                leftSlice = sliceItems.slice(sliceSize),
                posterWidth = _this.setting.posterWidth,
                posterHeight = _this.setting.posterHeight,
                gap = (_this.setting.width - _this.setting.posterWidth) / 2 / level,
                fixedOffset = posterWidth + (_this.setting.width - _this.setting.posterWidth) / 2;
            $.each(rightSlice, function (index, el) {
                posterWidth = posterWidth * _this.setting.scale;
                posterHeight = posterHeight * _this.setting.scale;
                var a = fixedOffset + (++index) * gap - posterWidth;
                $(el).css({
                    width: posterWidth,
                    height: posterHeight,
                    left: a,
                    top: _this.setVerticalAlign(posterHeight),
                    zIndex: --level,
                    opacity: 1/(index)
                });
            });
            var level = Math.floor(_this.posterItems.length / 2);
            $.each(leftSlice, function(index, el) {
                $(el).css({
                    width: posterWidth,
                    height: posterHeight,
                    left: index * gap,
                    top: _this.setVerticalAlign(posterHeight),
                    zIndex: index,
                    opacity: 1/level--
                });
                posterWidth = posterWidth/_this.setting.scale;
                posterHeight = posterHeight/_this.setting.scale;
            });
        },
        setVerticalAlign: function (posterHeight) {
            var _this = this;
            var verticalAlign = _this.setting.verticalAlign;
            var height = _this.setting.height;
            if (verticalAlign === 'top') {
                return 0;
            }
            else if (verticalAlign === 'middle') {
                return (height - posterHeight) / 2;
            }
            else if (verticalAlign === 'bottom') {
                return (height - posterHeight);
            }
        },
        play: function (dir) {
            var _this = this;
            if (_this.animated) {
                return;
            }
            _this.animated = true;
            if (dir === 'left') {
                $.each(_this.posterItems, function (index, el){
                    var prev = $(el).prev().length ? $(el).prev() : _this.posterItems.last();
                    $(el).animate({
                        width: prev.width(),
                        height: prev.height(),
                        left: prev.css('left'),
                        top: prev.css('top'),
                        opacity: prev.css('opacity'),
                        zIndex: prev.css('zIndex')
                    },
                    _this.setting.speed,
                    function () {
                        _this.animated = false;
                    });
                });
            }
            else if (dir === 'right') {
                $.each(_this.posterItems, function (index, el){
                    var next = $(el).next().length ? $(el).next() : _this.posterItems.first();
                    $(el).animate({
                        width: next.width(),
                        height: next.height(),
                        left: next.css('left'),
                        top: next.css('top'),
                        opacity: next.css('opacity'),
                        zIndex: next.css('zIndex')
                    },
                    _this.setting.speed,
                    function () {
                        _this.animated = false;
                    });
                });
            }
        },
        autoPlay: function () {
            var _this = this,
                setting = _this.setting;
            _this.handler = setInterval(function () {
                _this.play(setting.dir);
            }, setting.delay);
        }
    };
    Carousel.init = function (posters) {
        var _this = this;
        $.each(posters, function () {
            new _this($(this));
        });
    };

    window['Carousel'] = Carousel;
});