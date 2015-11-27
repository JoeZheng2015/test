/**
 * 初始化泡泡类
 * @param {Object} options 规定画布的参数
 * {string}options 指定画布元素
 * {number}options.width 画布的宽度，默认为300
 * {number}options.height 画布的高度，默认为300
 * {number}options.number 泡泡的数量，默认为画布宽度的一半
 */
function Bubble(options) {
    this.el = typeof options === 'string' ? options : options.el;
    this.canvas = document.querySelector(this.el);
    this.canvas.width = options.width || 1000;
    this.canvas.height = options.height || 300;
    this.number = options.number || this.canvas.width * 0.5;
    this.ctx = this.canvas.getContext('2d');
    this.circles = [];
    for(var i = 0; i < this.number; i++) {
        this.circles.push(new Circle(this.ctx, this.canvas.width));
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
function Circle(ctx, width) {
    this.ctx = ctx;
    this.width = width;
    this.init();
}
Circle.prototype = {
    constructor: Circle,
    init: function () {
        this.x = Math.random() * this.width;
        this.y = -Math.random() * 100;
        this.alpha = 0.1 + Math.random() * 0.3;
        this.scale = 0.1 + Math.random() * 0.3;
        this.velocity = Math.random();
    },
    draw: function() {
        if (this.alpha <= 0) {
            this.init();
        }
        this.y += this.velocity;
        this.alpha -= 0.0005;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.scale * 10, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'rgba(255,255,255,'+ this.alpha+')';
        this.ctx.fill();
    }
};