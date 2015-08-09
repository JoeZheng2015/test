$(function () {
	var handler, height, startY, baseY;
	$(window).on('resize, load', function () {
		clearTimeout(handler);
		handler = setTimeout(function () {
			height = window.document.documentElement.clientHeight;
			$('#wrapper, .slide').css({'height': height + 'px'});
		}, 300);
	}, false);

	var slides = $('.slides');
	var arrow = $('.ascend, .descend');
	arrow.on('click, touchstart', function () {
		swipe(this.className === 'ascend'? 'up' : 'down');
	});
	slides.on('touchstart', function (e) {
		startY = e.changedTouches[0].clientY;
		baseY = parseFloat(slides.css('transform').match(/translateY\((.*)px\)/)[1]);
	})
	slides.on('touchmove', function (e) {
		var moveY = e.changedTouches[0].clientY;
		var offset = moveY - startY;
		move(offset);
	})
	slides.on('touchend', function (e) {
		var endY = e.changedTouches[0].clientY;
		var offset = endY - startY;
		move(offset < 0 ? -height : height, true);
	});
	function move(offset, isAnimate) {
		var y = baseY + offset;
		if (isAnimate) {
			slides.animate({
				'transform': 'translateY(' + y + 'px)', 
				'-webkit-transform': 'translateY(' + y + 'px)'
			}, 
			{
				duration: 200
			})
		}
		else {
			slides.css({
				'transform': 'translateY(' + y + 'px)', 
				'-webkit-transform': 'translateY(' + y + 'px)'
			})
		}
	}
	function swipe(dir) {
		var currY = parseFloat(slides.css('transform').match(/translateY\((.*)px\)/)[1]);
		var y = dir === 'up' ? currY - height : currY + height;
		slides.css({
			'transform': 'translateY(' + y + 'px)', 
			'-webkit-transform': 'translateY(' + y + 'px)'
		})
	}
})