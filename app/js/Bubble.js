/**
 * 初始化泡泡类
 * @param {Object} options 规定画布的参数
 * {string}options 指定画布元素
 * {number}options.width 画布的宽度，默认为300
 * {number}options.height 画布的高度，默认为300
 * {number}options.number 泡泡的数量，默认为画布宽度的一半
 * {string}options.img 在页面上图片的类，用来替换泡泡
 * {number}options.opacityC 泡泡的透明度系数，原始值为0.3，越大越透明
 * {number}options.scale 泡泡大小的基数
 * {number}options.speed 泡泡下降速度的基数
 */
function Bubble(options) {
    this.el = typeof options === 'string' ? options : options.el;
    this.$el = $(this.el);
    this.canvas = this.$el[0];
    this.canvas.width = options.width || this.$el.parent().width();
    this.canvas.height = options.height || this.$el.parent().height();
    this.number = options.number || parseInt(this.canvas.width * 0.5);
    this.ctx = this.canvas.getContext('2d');
    this.circles = [];
    for(var i = 0; i < this.number; i++) {
        this.circles.push(new Circle({
                ctx: this.ctx,
                width: this.canvas.width,
                height: this.canvas.height,
                img: options.img,
                opacityC: options.opacityC || 0.3,
                scale: options.scale || 0.1,
                speed: options.speed || 0,
                imgWidth: options.imgWidth,
                imgHeight: options.imgHeight
            })
        );
    }
    this.animate();
}
Bubble.prototype = {
    constructor: Bubble,
    animate: function() {
        var that = this;
        that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
        for (var len = that.number; len--;) {
            that.circles[len].draw();
        }
        var requestAFrame = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (callback) {
                return setTimeout(callback, 1000 / 60);
            };
        requestAFrame(that.animate.bind(that));
    }
};
function Circle(option) {
    this.option = option;
    this.init();
}
Circle.prototype = {
    constructor: Circle,
    init: function () {
        var that = this;
        that.x = Math.random() * that.option.width;
        that.y = -Math.random() * that.option.height;
        that.opacity = 1;
        that.scale =  that.option.scale + Math.random() * 0.5;
        that.speed = that.option.speed + Math.random();
    },
    draw: function() {
        var that = this;
        if (that.opacity <= 0 || that.y >= that.option.height) {
            that.init();
        }
        that.y += that.speed;
        // that.opacity -= 0.0005;
        that.option.ctx.beginPath();
        if (that.option.img) {
            if (!that.img) {
                var arr = [1, 1, 1, 1, 1, 2, 2, 2, 0, 0];
                var index = parseInt(Math.random() * 10);
                var type = arr[index];
                that.img = document.querySelector('.leaf' + type);
            }
            that.option.ctx.drawImage(that.img, that.x, that.y, that.option.imgWidth, that.option.imgHeight);
        }
        else {
            that.option.ctx.arc(that.x, that.y, that.scale * 10, 0, 2 * Math.PI, false);
            that.option.ctx.fillStyle = 'rgba(255,255,255,'+ that.opacity+')';
        }
        that.option.ctx.fill();
    }
};