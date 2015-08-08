$(function () {
	var handler;
	$('.slide').css({'height': window.document.documentElement.clientHeight}).first().addClass('curr');
	window.addEventListener('resize', function () {
		clearTimeout(handler);
		handler = setTimeout(function () {
			$('.slide').css({'height': window.document.documentElement.clientHeight});
		}, 300);
	}, false);
	$('.arrow').on('tap', function () {
		var index = $('.curr').index();
		var l = $('.slide').length;
		if (index < l - 1)  {
			$('.slide').removeClass('curr').eq(index + 1).addClass('curr');
			if (index  === l - 2) {
				$('.arrow').css('backgroundColor', 'gray');
			}
		}
	});
})