
// 定义动画中的落叶数量
const NUMBER_OF_LEAVES = 40;

// 初始化函数
function init() {
    var container = document.getElementById('leafContainer');
    for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
        container.appendChild(createALeaf());
    }
}

// 返回在low和high之间的随机的整型
function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low));
}

// 返回low和high间随机的浮点
function randomFloat(low, high) {
    return low + Math.random() * (high - low);
}

// 用来增加px后缀
function pixelValue(value) {
    return value + 'px';
}

// 用来增加s后缀
function durationValue(value) {
    return value + 's';
}

// 用img标签生成树叶。
// 决定树叶旋转方向
function createALeaf() {
    // 用div包含img标签
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');
    
    // 随机选择不同的图片作为树叶
    image.src = '../../files/images/' + randomInteger(1,4) + '.png';
    
    // 定义div的位置、top固定，left随机
    leafDiv.style.top = "-100px";
    leafDiv.style.left = pixelValue(randomInteger(0, 500));
    
    // 随机选择旋转方向
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    
    // 为div元素增加下落和渐隐的动画；为图片增加旋转的动画
    leafDiv.style.webkitAnimationName = 'fade, drop';
    image.style.webkitAnimationName = spinAnimationName;
    
    // 随机生成下落和渐隐动画的时间
    var fadeAndDropDuration = durationValue(randomFloat(5, 11));
    // 随机生成旋转的动画时间
    var spinDuration = durationValue(randomFloat(4, 8));

    // 通过webkitAnimationDuration来设置下落和渐隐的动画时间！
    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    // 设置延时，让树叶在不同时刻后，开始旋转
    var leafDelay = durationValue(randomFloat(0, 5));
    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

    // 设置旋转的动画时间
    image.style.webkitAnimationDuration = spinDuration;

    leafDiv.appendChild(image);
    return leafDiv;
}


/* Calls the init function when the "Falling Leaves" page is full loaded */
//window.addEventListener('load', init, false);
$(function () { init();})