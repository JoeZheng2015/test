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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var len = this.number; len--;) {
            this.circles[len].draw();
        }
        requestAFrame = requestAnimationFrame
            || webkitRequestAnimationFrame
            || mozRequestAnimationFrame
            || oRequestAnimationFrame
            || msRequestAnimationFrame
            || function (callback) {
                return setTimeout(callback, 1000 / 60);
            };
        requestAFrame(this.animate.bind(this));
    }
};
function Circle(option) {
    this.option = option;
    this.init();
}
Circle.prototype = {
    constructor: Circle,
    init: function () {
        this.x = Math.random() * this.option.width;
        this.y = -Math.random() * this.option.height;
        this.opacity = 1;
        this.scale =  this.option.scale + Math.random() * 0.5;
        this.speed = this.option.speed + Math.random();
    },
    draw: function() {
        if (this.opacity <= 0 || this.y >= this.option.height) {
            this.init();
        }
        this.y += this.speed;
        // this.opacity -= 0.0005;
        this.option.ctx.beginPath();
        if (this.option.img) {
            if (!this.img) {
                var arr = [1, 1, 1, 1, 1, 2, 2, 2, 0, 0];
                var index = parseInt(Math.random() * 10);
                var type = arr[index];
                this.img = document.querySelector('.leaf' + type);
            }
            this.option.ctx.drawImage(this.img, this.x, this.y, this.option.imgWidth, this.option.imgHeight);
        }
        else {
            this.option.ctx.arc(this.x, this.y, this.scale * 10, 0, 2 * Math.PI, false);
            this.option.ctx.fillStyle = 'rgba(255,255,255,'+ this.opacity+')';
        }
        this.option.ctx.fill();
    }
};