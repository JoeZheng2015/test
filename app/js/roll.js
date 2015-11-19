window.$ = $;
roll()
function roll() {
	$('.red .bg').click();
	setTimeout(function() {
		if ($('[clk*=":close"]')) {
			$('[clk*=":close"]').click();
			roll();
		}
		else {
			setTimeout(function() {
				$('[clk*=":close"]').click();
				roll();
			}, 6000);
		}
	},1000);
}
setInterval(function(){
	if($('.btn.show.s2')){
		$('.btn.show.s2').click();
	}if($('.btn.show.s1')){
		$('.btn.show.s1').click()
	}
}, 100)
click();
function click() {
	if($('.btn.show.s2')){
		$('.btn.show.s2').click();
	}if($('.btn.show.s1')){
		$('.btn.show.s1').click()
	}
	var num = Math.random() * 1000;
	setTimeout(click, num);
};
window.$=$;
hua();
function hua() {
	$('#J_LotteryBTN').click();
	setTimeout(function() {
		if ($('.J_Close') ) {
			$('.J_Close').click();
			hua();
		}
		else {
			return false;
		}
	}, 5000);
}