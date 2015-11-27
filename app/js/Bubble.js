function Bubble(options) {
    this.el = typeof options === 'string' ? options : options.el;
    this.canvas = document.querySelector(this.el);
    this.canvas.width = options.width || 300;
    this.canvas.height = options.height || 300;
    this.ctx = this.canvas.getContext('2d');
    this.circles = [];
    this.number = options.number || this.canvas.width * 0.5;
    for(var i = 0; i < this.number; i++) {
        var c = new Circle(this.ctx, this.canvas.width, this.canvas.height);
        this.circles.push(c);
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
        requestAFrame = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
        // 第二次调用时，this变为window。所以this.ctx是undefined
        requestAFrame(this.animate.bind(this));
    }
};
function Circle(ctx, width, height, velocity) {
    this.constructor.prototype.ctx = ctx;
    this.constructor.prototype.width = width;
    this.constructor.prototype.height = height;
    this.constructor.prototype.velocity = velocity;
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