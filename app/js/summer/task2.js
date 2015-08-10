$(function () {
	var handler, height, startY, baseY;
	$(window).on('resize, load', function () {
		clearTimeout(handler);
		handler = setTimeout(function () {
			height = window.document.documentElement.clientHeight;
			$('#wrapper, .slide').css({'height': height + 'px'});
			$('.slides').css(prefixer('transform', 'translateY', 0));
		}, 300);
	}, false);
	var slides = $('.slides');
	$('.ascend, .descend').on('click', function () {
		swipe(this.className === 'ascend'? 'up' : 'down');
	});
	slides.on('touchstart', function (e) {
		e.preventDefault();
		var translate = slides.css('transform') || slides.css('-webkit-transform');
		startY = e.changedTouches[0].clientY;
		baseY = parseFloat(translate.match(/translateY\((.*)px\)/)[1]);
	})
	slides.on('touchmove', function (e) {
		e.preventDefault();
		var moveY = e.changedTouches[0].clientY;
		var offset = moveY - startY;
		move(offset);
	})
	slides.on('touchend', function (e) {
		e.preventDefault();
		var endY = e.changedTouches[0].clientY;
		var offset = endY - startY;
		move(offset < 0 ? -height : height, true);
	});
	
	function move(offset, isAnimate) {
		var y = baseY + offset;
		if (isAnimate) {
			if (y > 0 || y <= -height * $('.slide').length) {
				y = baseY;
			}
			slides.animate(prefixer('transform', 'translateY', y), 
			{
				duration: 200
			})
		}
		else {
			slides.css(prefixer('transform', 'translateY', y))
		}
	};
	function swipe(dir) {
		var translate = slides.css('transform') || slides.css('-webkit-transform');
		var currY = parseFloat(translate.match(/translateY\((.*)px\)/)[1]);
		var y = dir === 'up' ? currY - height : currY + height;
		if (y > 0 || y <= -height * $('.slide').length) {
			return;
		}
		else {
			slides.animate(prefixer('transform', 'translateY', y), {duration: 200})
		}
	};
	function prefixer(cssAttr, cssValue, value, unite) {
		var unite = unite || 'px';
		var ob = {};
		['', '-ms-', '-moz-', '-webkit-', '-o-'].forEach(function (item) {
			ob[item + cssAttr] = cssValue + '(' + value + '' + unite + ')';
		});
		return ob;
	}
})