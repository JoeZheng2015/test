$(function () {
	var handler, height, startY, baseY, slides = $('.slides');
	$(window).on('resize, load', function () {
		clearTimeout(handler);
		handler = setTimeout(function () {
			height = window.document.documentElement.clientHeight;
			$('#wrapper, .slide').css({'height': height + 'px'});
			$('.slide').removeClass('hide').first().addClass('curr');
			$('.slides').css(prefixer('transform', 'translateY', 0));
		}, 300);
	}, false);
	$('.descend').on('click', function () {
		swipe('down');
	});
	slides.on('touchstart', function (e) {
		e.preventDefault();
		startY = e.changedTouches[0].clientY;
		var translate = slides.css('transform') || slides.css('-webkit-transform');
		baseY = parseFloat(translate.match(/translateY\((.*)px\)/)[1]);
	})
	slides.on('touchmove', function (e) {
		e.preventDefault();
		var moveY = e.changedTouches[0].clientY,
			offset = moveY - startY;
		if (offset > 30 || offset <-30) {
			move(offset);
		}
	})
	slides.on('touchend', function (e) {
		e.preventDefault();
		var endY = e.changedTouches[0].clientY,
			offset = endY - startY;
		if (offset > 30 || offset <-30) {
			move(offset < 0 ? -height : height, true);
		}
	});
	$('.skills .slide-2').on('click', 'li', function (e) {
		$(this).find('img').toggleClass('pt-page-flipOutRight').toggle();
		$(this).find('div').toggleClass('pt-page-flipInRight').toggle();
	});
	$('.skills .slide-2').on('touchend', 'li', function (e) {
		e.preventDefault();
		$(this).find('img').toggleClass('pt-page-flipOutRight').toggle();
		$(this).find('div').toggleClass('pt-page-flipInRight').toggle();
	});
	function move(offset, isTouchEnd) {
		var y = baseY + offset,
			dir = offset > 0 ? 'down' : 'up';
		if (isTouchEnd) {
			if (y > 0 || y <= -height * $('.slide').length) {
				y = baseY;
				slides.animate(prefixer('transform', 'translateY', y), {duration: 200});
			}
			else {
				slides.animate(prefixer('transform', 'translateY', y), {duration: 200}, changeCurr(dir));
			}
		}
		else {
			slides.css(prefixer('transform', 'translateY', y))
		}
	};
	function swipe(dir) {
		var translate = slides.css('transform') || slides.css('-webkit-transform'),
			currY = parseFloat(translate.match(/translateY\((.*)px\)/)[1]),
			y = dir === 'up' ? currY - height : currY + height;
		if (y > 0 || y <= -height * $('.slide').length) {
			return;
		}
		else {
			slides.animate(prefixer('transform', 'translateY', y), {duration: 200}, changeCurr(dir))
		}
	};
	function changeCurr(dir) {
		var currIndex = parseInt($('.curr').attr('data-index')),
			nextIndex = dir === 'up' ? currIndex + 1 : currIndex - 1,
			next = '[data-index="' + nextIndex + '"]';
		$('.curr').removeClass('curr');
		$(next).addClass('curr');
	};
	function prefixer(cssAttr, cssValue, value, unite) {
		var unite = unite || 'px',
			ob = {};
		['', '-ms-', '-moz-', '-webkit-', '-o-'].forEach(function (item) {
			ob[item + cssAttr] = cssValue + '(' + value + '' + unite + ')';
		});
		return ob;
	}
});