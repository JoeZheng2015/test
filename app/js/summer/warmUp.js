    window.onload = function () {
    var boxs = document.querySelectorAll('.box');
    var imgs = document.querySelectorAll('.bg img');
    var items = document.querySelectorAll('.item');
    var contents = document.querySelectorAll('.zoom dl');
    var boxHeight = [];
    var offsetLeft = [0];
    var index;
    var count = 1;
    var handler = setInterval(brocast, 5000);
    waterfall();
    var boxTable = getBoxTable();
    for (var i = 0, l = boxs.length; i < l; i++) {
        addEvent(boxs[i], 'click', function (e) {
            if (this.classList[1] === 'zoom') {
                return;
            }
            var zoom =document.querySelector('.zoom');
            tabAnimation(this);
            this.className = 'box zoom';
            zoom.className = 'box item';
        })
    }
    function waterfall() {
        var colNum = 5;
        for (var i = 0, l = boxs.length; i < l; i++) {
            if ( i < colNum) {
                boxs[i].style.cssText = 'position: absolute; top: 0px; left:' + offsetLeft[i] +'px;';
                offsetLeft.push(offsetLeft[i] + boxs[i].offsetWidth);
                boxHeight[i] = boxs[i].offsetHeight;
            }
            else {
                index = getIndex();
                boxs[i].style.cssText = 'position: absolute; top:' + boxHeight[index] +'px; left:' + offsetLeft[index] +'px;';
                boxHeight[index] += boxs[i].offsetHeight;
            }
        }
    }
    function getBoxTable() {
        return {
            zoom: {
                width: document.querySelector('.zoom').clientWidth,
                height: document.querySelector('.zoom').clientHeight
            },
            item: {
                width: document.querySelector('.item').clientWidth,
                height: document.querySelector('.item').clientHeight
            }
        }
    }
    function getIndex() {
        var minHeigth = Math.min.apply(this, boxHeight);
        return boxHeight.indexOf(minHeigth);
    }
    function brocast() {
        var index = count % 5;
        var pre = (count - 1) % 5;
        hide(imgs[pre]);
        show(imgs[index]);
        count++;
    }
    function show(el, duration) {
        var duration = duration || 2;
        el.style.cssText = 'animation:show ' + duration + 's forwards; -moz-animation:show ' + duration + 's forwards; -webkit-animation:show ' + duration + 's forwards; -o-animation:show ' + duration + 's forwards;';
    }
    function hide(el) {
        var duration = duration || 2;
         el.style.cssText = 'animation: hide ' + duration +'s forwards; -moz-animation: hide ' + duration +'s forwards; -webkit-animation: hide ' + duration +'s forwards; -o-animation: hide ' + duration +'s forwards;';
    }
    function addEvent(element, event, listener) {
        if (element.addEventListener) {
            element.addEventListener (event, listener, false);
        }   
        else if (element.attachEvent) {
            element.attachEvent('on' + event, listener);
        }
        else {
            element['on' + event] = listener;
        }
    }
    function tabAnimation(el) {
        var zoom = document.querySelector('.zoom');
        var zoomParam = getPara(zoom).concat('#fff');
        zoomParam.unshift(el);
        transition.apply(null, zoomParam);

        var itemParam = getPara(el).concat('#414141');
        itemParam.unshift(zoom);
        transition.apply(null, itemParam);
    }
    function getPara(el) {
        var width = boxTable[el.classList[1]].width;
        var height = boxTable[el.classList[1]].height;
        var offsetLeft = el.offsetLeft;
        var offsetTop = el.offsetTop;
        return [width, height, offsetLeft, offsetTop];
    }
    function transition(el, width, height, left, top, color) {
        console.log(arguments);
          el.style.cssText += 'transition: all 0.5s; width: ' + width + 'px; height: ' + height + 'px; left: ' + left +'px;top: ' + top + 'px;-webkit-transition: all 0.5s; width: ' + width + 'px; height: ' + height + 'px; left: ' + left +'px;top: ' + top + 'px';
    }
}