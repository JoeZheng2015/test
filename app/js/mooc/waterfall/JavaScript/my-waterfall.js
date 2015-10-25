window.onload = function () {
	waterfall();	
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	window.onscroll = function () {
		if(checkLoad()) {
			var Parent = document.getElementById("main");
			for (var i = 0; i < dataInt.data.length; i++) {
				var pinDiv = document.createElement("div");
				pinDiv.className = "pin";
				Parent.appendChild(pinDiv);
				var boxDiv = document.createElement("div");
				boxDiv.className = "box";
				pinDiv.appendChild(boxDiv);
				var img = document.createElement("img");
				img.src = "../../../../images/mooc/waterfall/"+dataInt.data[i].src;
				boxDiv.appendChild(img);
			}
			waterfall();
		}
	};
	
}
// 检查是否加载
function checkLoad() {
	var oParent = document.getElementById("main");
	var oPin = getClass(oParent, "pin");
	var elementH = Math.floor(oPin[oPin.length - 1].offsetHeight/2) + oPin[oPin.length - 1].offsetTop;
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var screenH = document.body.clientHeight || document.documentElement.clientHeight;
	return (screenH+scrollTop > elementH)?true:false;
	// 下滑到指定高度后，返回true
}

// 找到最矮的index
function getIndex(pinH) {
	var min = Math.min.apply(this, pinH);
	for(var i = 0; i < pinH.length; i++) {
		if(min == pinH[i]) {
			return i;
		}
	}
}
// 获得6排的高度
function getHeight(oPin, num) {
	var height = [];
	for(var i  = 0; i < num; i++) {
		height.push(oPin[i].offsetHeight);
	}
	return height;
}
// 通过父类和类名找到照片的框
function getClass(Parent, className) {
	var obj = Parent.getElementsByTagName("*");
	var pins = [];
	for(var i = 0; i < obj.length; i++) {
		if(obj[i].className == className) {
			pins.push(obj[i]);
		}
	}
	return pins;
}	
function waterfall() {
	var oParent = document.getElementById("main");
	var oPin = getClass(oParent, "pin");
	var oPinWidth = oPin[0].offsetWidth;
	var clientWidth = document.documentElement.clientWidth;
	// 用户的频宽
	var num = Math.floor(clientWidth/oPinWidth);
	// 通过频宽确定一排的数量
	oParent.style.cssText = "width:"+num *oPinWidth +"px; margin: 0 auto";
	// cssText跟css一样，用：来设定css样式

	var oPinHeight = getHeight(oPin, 6);
	var opinH = oPinHeight;
	for(var i = num; i < oPin.length; i++) {
		var index = getIndex(opinH);
		var minH = Math.min.apply(this, opinH);
		oPin[i].style.cssText = "position: absolute; top:"+ minH +"px;left:"+ oPin[index].offsetLeft +"px";
		opinH[index] += oPin[i].offsetHeight;	
	}
}