$(window).load(function(){
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	waterfall();
	$(window).on("scroll",function () {
		if(checkLoad()) {
			$.each(dataInt.data, function(index,value) {
				var pin = $("<div>").addClass("pin").appendTo($("#main"));
				var box = $("<div>").addClass("box").appendTo(pin);
				$("<img>").attr("src","../../../../images/mooc/waterfall/"+$(value).attr("src")).appendTo(box);

			});
			waterfall();
		}
		
	});
});
function waterfall() {
	var pin = $(".pin");
	var pinWidth = pin.eq(0).outerWidth();
	var num = Math.floor($(window).width()/pinWidth);
	$("#main").css({
		"width": num * pinWidth +"px",
		"margin": "0 auto"
	});
	var pinH = [];
	pin.each(function (index, value) {
		if(index < num) {
			pinH[index] = pin.eq(index).outerHeight();
		}
		else {
			var minH = Math.min.apply(this, pinH);
			var minHIndex = $.inArray(minH, pinH);
			$(value).css({
				"position": "absolute",
				"top": minH,
				"left" :minHIndex * pinWidth + "px",
			});
			pinH[minHIndex] += pin.eq(index).outerHeight();
		}
	});
};
function checkLoad() {
	var last = $(".pin").last();
	var elementH = Math.floor(last.outerHeight()/2) + last.offset().top;
	// jQuery里面是offset().top/left
	var screenH = $(window).scrollTop() + $(window).height();
	return (elementH < screenH)? true: false;
}