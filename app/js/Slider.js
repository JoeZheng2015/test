(function(exports) {
	exports.Slider = Slider;

	/**
	 * 幻灯片的构造函数，需要2个必须参数和1个可选参数
	 * @param {Object} options 参数对象
	 * {Object} options.el 【必须】要挂载幻灯片的Dom对象
	 * {Array} options.list 【必须】图片对象组成数组
	 * 		{number} height 规定图片的高度，方便在图片过大时，正确的压缩方向
	 * 		{number} width 规定图片的宽度，方便在图片过大时，正确的压缩方向
	 * 		{string} img 图片的路径
	 * {number} options.index 【可选】指定初始化时，幻灯片的位置
	 */
	function Slider(options) {
		this.el = options.el;
		this.list = options.list;
		this.index = options.index || 0;

		this.init();
		this.render();
		this.bindEvent();
	}
	Slider.prototype = {
		constructor: Slider,
		init: function() {
			this.innerWidth = exports.innerWidth;
			this.innerHeight = exports.innerHeight;
			this.threshold = this.innerWidth / 6;
			this.ratio = this.innerWidth / this.innerHeight;
		},
		render: function() {
			var innerHeight = this.innerHeight;
			var innerWidth = this.innerWidth;
			var ratio = this.ratio;
			var list = this.list;
			var index = this.index;

			// 把子元素插入文档片段不会引起页面回流，所以性能优越
			// 但是这里的DOM元素ul还没插入页面中，所以性能应该并没有优化，只是想起有这个方法而已
			var docFrc = document.createDocumentFragment();

			for(var i = 0, l = list.length; i < l; i++) {
				var li = document.createElement('li');
				// 以index作为起点，来初始化
				// 实现可定义初始化指定的图片作为起点
				li.style.cssText = 'transform: translate3d(' + (i - index) * innerWidth + 'px, 0,0);';

				if (list[i].width && list[i].height) {
					if (list[i].width / list[i].height > ratio) {
						li.innerHTML = '<img src="' + list[i]['img']+'" style="width: ' + innerWidth + 'px">';
					}
					else {
						li.innerHTML = '<img src="' + list[i]['img']+'" style="height: ' + innerHeight + 'px">';
					}
				}
				else {
					li.innerHTML = '<img src="' + list[i]['img']+'">';
				}
				docFrc.appendChild(li);
			}

			this.ul = document.createElement('ul');
			this.ul.style.width = innerWidth + 'px';
			this.ul.appendChild(docFrc);
			this.lis = this.ul.childNodes;
			this.el.style.height = innerHeight + 'px';
			this.el.appendChild(this.ul);
		},
		bindEvent: function() {
			var self = this;
			var startX, offsetX, startTime;

			document.addEventListener('touchstart', touchstart, false);
			document.addEventListener('touchmove', touchmove, false);
			document.addEventListener('touchend', touchend, false);

			function touchstart(e) {
				startX = e.touches[0].pageX;
				startTime = new Date() * 1;
				offsetX = 0;
			}
			function touchmove(e) {
				e.preventDefault();

				var innerWidth = self.innerWidth;
				var lis = self.lis;

				offsetX = e.touches[0].pageX - startX;

				for (var begin = self.index - 1, end = begin + 3; begin < end; begin++) {
					var nowX = (begin - self.index) * self.innerWidth;
					lis[begin] && (lis[begin].style.cssText = 'transition: transform 0 ease-out;transform: translate3d(' + (nowX + offsetX) + 'px,0,0);');
				}
			}
			function touchend(e) {
				e.preventDefault();

				var duration = new Date() * 1 - startTime;
				if (duration > 300) {
					if (offsetX > self.threshold) {
						self.go('-1');
					}
					else if (offsetX < -self.threshold) {
						self.go('+1');
					}
					else {
						self.go('0');
					}
				}
				else {
					if (offsetX > 50) {
						self.go('-1');
					}
					else if (offsetX < 50) {
						self.go('+1');
					}
					else {
						self.go('0');
					}
				}
			}
		},
		go: function(num) {
			var lis = this.lis;
			var innerWidth = this.innerWidth;
			var index = this.index;

			if (typeof num === 'string') {
				var nextIndex = index +  num * 1;
			}
			else if (typeof num === 'number') {
				var nextIndex = num;
			}

			if (nextIndex < 0) {
				nextIndex = 0;
			}
			else if (nextIndex > lis.length - 1) {
				nextIndex = lis.length - 1;
			}
			
			for (var begin = nextIndex - 1, end = begin + 3; begin < end; begin++) {
				lis[begin] && (lis[begin].style.cssText = 'transition: transform 0.2s ease-out; transform: translate3d(' + (begin - nextIndex) * innerWidth +'px, 0 , 0);');
			}
			this.index = nextIndex;
		}
	};
})(window);