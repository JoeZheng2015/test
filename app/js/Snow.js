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
            var win = window,
                that = this;
            that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
            for (var len = that.number; len--;) {
                that.circles[len].draw();
            }

            var requestAFrame = win.requestAnimationFrame
                || win.webkitRequestAnimationFrame
                || win.mozRequestAnimationFrame
                || win.oRequestAnimationFrame
                || win.msRequestAnimationFrame
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
            var numbers = [0, 0, 1, 1, 1, 1, 2, 2, 2, 3];
            var index = Math.floor(Math.random() * 10);
            // 雪的速度
            var speeds = [6, 3, 2, 2];

            this.type = numbers[index];
            this.x = Math.random() * this.option.width;
            this.y = -Math.random() * this.option.height;
            this.opacity = 1 - Math.random() * this.option.opacityC;
            this.scale =  this.option.scale + Math.random() * 0.5;
            this.speed = speeds[this.type];
        },
        draw: function() {
            var that = this;
            if (that.opacity <= 0 || that.y >= that.option.height) {
                that.init();
            }
            that.y += that.speed;
            that.opacity -= 0.0005;
            that.option.ctx.beginPath();
            if (that.option.img) {
                if (!that.img) {
                    that.img = document.querySelector('.snow' + that.type);
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