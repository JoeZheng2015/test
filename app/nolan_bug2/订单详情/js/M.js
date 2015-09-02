if (typeof(M) == "undefined" || !M){
	window.M = {};
}

;!function(a){"use strict";var b="";b=b?b:document.scripts[document.scripts.length-1].src.match(/[\s\S]*\//)[0];var c=document,d="querySelectorAll",e="getElementsByClassName",f=function(a){return c[d](a)};var g={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:!0};var ready={extend:function(a){var b=JSON.parse(JSON.stringify(g));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};var h=0,i=["layermbox"],j=function(a){var b=this;b.config=ready.extend(a),b.view()};j.prototype.view=function(){var a=this,b=a.config,d=c.createElement("div");a.id=d.id=i[0]+h,d.setAttribute("class",i[0]+" "+i[0]+(b.type||0)),d.setAttribute("index",h);var g=function(){var a="object"==typeof b.title;return b.title?'<h3 style="'+(a?b.title[1]:"text-align:center;")+'">'+(a?b.title[0]:b.title)+'</h3>':""}(),j=function(){var a,c=(b.btn||[]).length;return 0!==c&&b.btn?(a='<span type="1">'+b.btn[0]+"</span>",2===c&&(a+='<span type="0">'+b.btn[1]+"</span>"),'<div class="layermbtn">'+a+"</div>"):""}();if(b.fixed||(b.top=b.hasOwnProperty("top")?b.top:100,b.style=b.style||"",b.style+=" top:"+(c.body.scrollTop+b.top)/50+"rem"),2===b.type&&(b.content='<i></i><i class="laymloadtwo"></i><i></i><div>'+(b.content||"")+"</div>"),d.innerHTML=(b.shade?'<div class="laymshade"></div>':"")+'<div class="layermmain" '+(b.fixed?"":'style="position:static;"')+'><div class="section"><div class="layermchild '+(b.type||b.shade?"":"layermborder ")+(b.anim?"layermanim":"")+'" '+(b.style?'style="'+b.style+'"':"")+">"+g+'<div class="layermcont">'+b.content+"</div>"+j+"</div></div></div>",!b.type||2===b.type){var l=c[e](i[0]+b.type),m=l.length;m>=1&&k.close(l[0].getAttribute("index"))}document.body.appendChild(d);var n=a.elem=f("#"+a.id)[0];setTimeout(function(){try{n.className=n.className+" layermshow"}catch(a){return}b.success&&b.success(n)},1),a.index=h++,a.action(b,n)},j.prototype.action=function(a,b){var c=this;if(a.time&&(ready.timer[c.index]=setTimeout(function(){k.close(c.index)},1e3*a.time)),a.btn)for(var d=b[e]("layermbtn")[0].children,f=d.length,g=0;f>g;g++)$(d[g]).on('click',function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),k.close(c.index)):a.yes?a.yes(c.index):k.close(c.index)});if(!a.btn){var s=b[e]('laymshade')[0];s.onclick=function(){k.close(c.index,a.end)};s.ontouchmove=function(){k.close(c.index,a.end)}};a.end&&(ready.end[c.index]=a.end)};function open(a){k.closeAll();var b=new j(a||{});return b.index} var k={v:"1.2",index:h,wait:function(option){option=option||{};option.type=2;open(option);},popup:function(option){option=option||{};option.type=1;open(option);},msg:function(option){option=option||{};open(option);},close:function(a){var b=f("#"+i[0]+a)[0];b&&(b.innerHTML="",c.body.removeChild(b),clearTimeout(ready.timer[a]),delete ready.timer[a],"function"==typeof ready.end[a]&&ready.end[a](),delete ready.end[a])},closeAll:function(){for(var a=c[e](i[0]),b=0,d=a.length;d>b;b++)k.close(a[b].getAttribute("index"))}};"function"==typeof define?define(function(){return k}):a.layer=k}(M);

M.is = {};
M.is.inApp = (function(){
    return navigator.userAgent.indexOf('meila') >= 0 ? true : false;
})();
M.is.inWechat = (function(){
    return navigator.userAgent.indexOf('MicroMessenger') >= 0 ? true : false;
})();

M.url = {};
M.url.getParam = function(name,url){
    var reg=new RegExp("(^|&|\\?|#)"+name+"=([^&]*?)(&|#|$)"),
        url=url||location.href,
        tempHash=url.match(/#.*/)?url.match(/#.*/)[0]:"";

    url=url.replace(/#.*/,"");
    if(reg.test(tempHash)){
        return decodeURIComponent(tempHash.match(reg)[2]);
    }else if(reg.test(url)){
        return decodeURIComponent(url.match(reg)[2])
    }else return"";
}

M.url.setParam = function(name,value,url,isHashMode){
    if(typeof name == 'undefined' || typeof value == 'undefined' || typeof url == 'undefined'){
        return url;
    }
    var reg = new RegExp("(^|&|\\?|#)"+name+"=([^&]*?)(&|#|$)"),
        tempHash=url.match(/#.*/)?url.match(/#.*/)[0]:"";

    url=url.replace(/#.*/,"");
    if(isHashMode===true){
        if(reg.test(tempHash)){
            tempHash=tempHash.replace(reg,function(m,r1,r2,r3){return r1+name+"="+encodeURIComponent(value)+r3});
        }else{
            var separator=tempHash.indexOf("#")===-1?"#":"&"; 
            tempHash=tempHash+separator+name+"="+encodeURIComponent(value)}
            tempHash=tempHash.replace(reg,function(m,r1,r2,r3){return r1+name+"="+encodeURIComponent(value)+r3})
    }else if(reg.test(url)){
        url=url.replace(reg,function(m,r1,r2,r3){return r1+name+"="+encodeURIComponent(value)+r3});
    }else{
        var separator=url.indexOf("?")===-1?"?":"&";
        url=url+separator+name+"="+encodeURIComponent(value)
    }
    return url+tempHash
}

M.dom = {};

M.dom.getPosition = function(elem){
    var box,s,doc;
    elem = elem.get ? elem.get(0) : elem;
    if(box=M.dom.getRect(elem)){
        if(s=$(doc=elem.ownerDocument).scrollLeft()){
            box.left+=s,box.right+=s;
        }
        if(s=$(doc).scrollTop()){
            box.top+=s,box.bottom+=s;
        }
        return box;
    }
}

M.dom.getRect = function(elem){
    if(elem = elem.get ? elem.get(0) : elem) { 
        var box = $.extend({}, elem.getBoundingClientRect()), s; 
        if (typeof box.width == 'undefined') { 
            box.width = box.right - box.left; 
            box.height = box.bottom - box.top; 
        } 
        return box; 
    }
}

M.app = {};
/*
 * 获取当前app的版本
 */
M.app.getVersion = function(){
    var NoVersion = '',
        match = navigator.userAgent.match(/meila\/(\d+\.\d+(\.\d+)?)/);
    if (match){
        return match[1]; 
    }
    return NoVersion;
};

M.opt = {};
M.opt.lazyload = function(){
    function lazyload() {
        this.config = {"attrName": "relSrc","nodeName": "img","threshold": 100};
        this.lazyloader = function() {
            var a = $('img['+this.config.attrName+']'),
                len = a.length,
                node = null;
            if (len == 0) {
                $(window).off('scroll',$.proxy(this.lazyloader,this));
                $(window).off('resize',$.proxy(this.lazyloader,this));
                $(document.body).off('touchmove',$.proxy(this.lazyloader,this));
                return;
            }
            var height = this.config.threshold + $(document.body).scrollTop() + document.documentElement.clientHeight;
            for (var i = 0; i < len; ++i) {
                node = $(a[i]);
                var nodeTop = M.dom.getPosition(node).top;
                if (height >= nodeTop) {
                    var src = node.attr(this.config.attrName);
                    node.attr("src", src);
                    node.removeAttr(this.config.attrName);
                }
            }
        };
        this.bindEvent = function() {
            $(window).on('scroll',$.proxy(this.lazyloader,this));
            $(window).on('resize',$.proxy(this.lazyloader,this)); 
            $(document.body).on('touchmove',$.proxy(this.lazyloader,this));
        }
    }

    var loader = new lazyload();
    loader.lazyloader();
    loader.bindEvent();
}

M.ware={};
/*
 * 打开商品详情页，兼容各版本app和网页
 * option.topicSlug 可选 与商品关联的话题slug
 * option.wareSlug 可选 商品slug
 */
M.ware.goto = function(option){
    var appVersion;
    if(M.is.inApp){
        appVersion = M.app.getVersion();
        if (option.wareSlug && appVersion >= '4.2.0'){
            if (window.meilaWebviewJsBridge && window.meilaWebviewJsBridge.client_jumpToPage){
                meilaWebviewJsBridge.client_jumpToPage('waredetail', {"data1": option.wareSlug});
            }else{
                location.href =  '/ware/'+ option.wareSlug+'/'+location.search;
            }
        }else if(option.wareSlug && appVersion >= '4.1.0'){
            location.href = 'meilapp://waredetail/'+option.wareSlug;
        }else if (option.topicSlug){
            location.href = 'meilapp://vtalk/'+ option.topicSlug;
        }
    }else{
        if (option.wareSlug){
            location.href =  '/ware/'+ option.wareSlug+'/'+location.search;
        }
    }
}

/*
M.lang = {};

M.lang.dateFormat = function(date,format){ 
    function LenFix(i, n) { 
        var s = i.toString(); 
        while (s.length < n) { 
            s = "0" + s; 
        } 
        return s; 
    } 

    var mapData = {
                    "%Y": date.getFullYear(),
                    "%m": LenFix(date.getMonth() + 1, 2),
                    "%d": LenFix(date.getDate(), 2),
                    "%H": LenFix(date.getHours(), 2),
                    "%M": LenFix(date.getMinutes(), 2),
                    "%S": LenFix(date.getSeconds(), 2)
                }; 

    return format.replace(/%[YmdHMS]/g, function(data) { 
        return (mapData[data]); 
    }); 
}
*/

M.user = {};

M.user.isLogin = function(){
    // var key = navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/)===null ? 'sc0' : 'Mud'; 
    if($.fn.cookie('sc0')===null && $.fn.cookie('Mud')===null){ 
        return false; 
    }

    return true;
};

/**
  * 登录组件
 **/
M.user.login = function(option){ 
    var url = location.pathname+location.search+location.hash;
    option = option || {};
    url = option.nextUrl || url;

    if(url.indexOf('//') !=0 && url.indexOf('http://') != 0){
        url = 'http://' + location.host + url;
    }

    function webLogin(){
        M.layer.msg({
            content : option.content || '亲 请先登录',
            btn: option.btn || ['确认', '取消'], 
            yes: function(){
                if(navigator.userAgent.indexOf('MicroMessenger') != -1){
                    location.href='http://www.meilapp.com/login/?next='+encodeURIComponent(url);
                }else{
                    location.href='/login/?next='+encodeURIComponent(url);
                }   
            }
        });
    }

    if(window.meilaWebviewJsBridge && window.meilaWebviewJsBridge.client_login){
        meilaWebviewJsBridge.client_login(function(o){
            var obj = $.parseJSON(o);
            if(obj.code == 0){
                $.fn.cookie('Mud', obj.mud, { domain: '.meilapp.com',path:'/', raw: true });   
                location.href = url;
            }
        });
    }else{
        webLogin();
    }
}

/**
  * 分享组件
  * 调用客户端的分享接口，若不是在客户端打开的h5页面，则无法分享
  * option.title和option.url必传
 */
M.user.share = function(option){
    var match = navigator.userAgent.match(/meila\/(\d+\.\d+(\.\d+)?)/),
        shareUrl = 'meilapp://share?callback=M.callback';

    option = option || {};
    option.title = option.title || '美啦';
    option.url = option.url || location.href;
    option.url = option.url.indexOf('http://') == 0 ? option.url : 'http://'+location.host + option.url; 
    option.imageUrl = option.imageUrl || 'http://www.meilapp.com/resource/images/logo32.png';
    option.cha = typeof option.cha == 'undefined' ? 0 : option.cha;

    M.callback = option.callback || M.callback;

    if(window.meilaWebviewJsBridge && window.meilaWebviewJsBridge.client_share){
        meilaWebviewJsBridge.client_share(function(o){
            var obj = $.parseJSON(o);
            if(obj.code == 0){
                (option.callback || M.callback)(obj);
            }else{
                M.layer.msg({content:'系统繁忙，请稍后再试',btn:['确定']});
            }
        },option);
    }else if(match){
        if(match[1] >= '3.16'){
            for(var key in option){
                if(key == 'callback'){
                    continue;
                }
                shareUrl = typeof option[key] == 'undefined' ? shareUrl : M.url.setParam(key,option[key],shareUrl);
            }

            location.href = shareUrl;
        }else{
            M.layer.msg({
                content : '亲 请点击右上角分享哦',
                btn: ['确认']
            });
        }
    }else{
        M.layer.msg({
            content : '亲 请下载客户端再分享活动哦',
            btn: ['确认']
        });
    }
}

M.callback = function(){};

M.footer = function(){
    $('.wrapper').append('<footer class="copyright">Copyright &copy; 2013-2015，品汇科技版权所有 著作权保护声明</footer>');
}

/**
  * 底部下载条
 **/
;(function(){

    var now = + new Date(),
        // tomorrow = now + 86400000,
        tomorrow = now + 1200000,  // new expire time 20mins
        key = '__downloadbar_hide_expire__';

    function isExpire(){
        var expire= ( localStorage && localStorage.getItem(key) ) || 0;

        if(!expire || expire < now){
            localStorage.removeItem(key);
            return true;
        }

        return false;
    }

    if(!M.is.inApp && isExpire()){
        var paramObj = {
                            'utm_source'    : '',
                            'utm_activity'  : '',
                            'utm_user'      : '',
                            'utm_medium'    : '',
                            'utm_channel'   : ''
                        },
            downloadUrl = '/getapp/',
            flag = false; 
    
        for(var param in paramObj){
            paramObj[param] = M.url.getParam(param);

            if(paramObj[param] != ''){
                flag = true;
            }
        }

        if(flag == false){
            paramObj.utm_source = M.url.getParam('from');

            if(paramObj.utm_source == ''){
                for(param in paramObj){
                    paramObj[param] = $.fn.cookie(param);
                }
            }
        }

        for(param in paramObj){
            if(paramObj[param]!== null && paramObj[param]!== ''){
                downloadUrl = M.url.setParam(param,paramObj[param],downloadUrl);
            }
        } 

        $(document.body).append('<div class="footer">\
                                    <div class="download-bar">\
                                        <div>\
                                            <img src="/resource/web/images/mobile/global/downloadbar.png" />\
                                            <a id="download_app" href="'+downloadUrl+'" title="下载美啦" >下载美啦</a>\
                                            <span class="close-download-bar"></span>\
                                        </div>\
                                    </div>\
                                </div>');

        $('.footer .close-download-bar').on('click',function(){
            $(this).parents('.footer').hide(); 
            localStorage.setItem(key,tomorrow);
            return false;
        });
    }
})();


/**
  * 微信内，分享页面和提示
 **/

M.wechat = {};
M.wechat.settings = function(o){
    var defaultSettings = {
        imgUrl : "http://"+location.host+"/resource/web/images/new-logo-64.png",
        lineLink : location.href,
        descContent : "美啦App，美女聚集最多的美妆社区",
        shareTitle : '美啦',
        signature_info : {},
        debug : false,
        success_callback : function(res){},
        cancel_callback : function(res){},
        error_callback: function(res){}
    };

    o = o || {};

    return $.extend(true,defaultSettings,o);
};
/**
  * 在微信内，显示分享提示
  * option.content 提示分享的文案，可选，默认值是"点击右上角分享给朋友吧"
  * option.seconds 提示分享延迟几秒出现，可选，默认值是0，立即出现
  * option.func    额外的处理过程，可选
 **/
M.wechat.showWechatSharePrompt = function(option){
    var defaultConent = '点击右上角分享给朋友吧',
        defaultSeconds = 0;
    if (typeof(option) == 'undefined'){
        var content =  defaultConent, 
            seconds = defaultSeconds,
            func = null;
    }else{
        var content = option.content || defaultConent,
            seconds = option.seconds || defaultSeconds,
            func = option.func || null; 
    }
    var html = '<div class="wechat-share-prompt">\
                    <img class="point-share" src="/resource/web/images/mobile/spring_tour/point-share.png" alt="指向分享"/>\
                    <p>' + content + '</p>\
                    <img class="i-know" src="/resource/web/images/mobile/spring_tour/i-know.png" alt="我知道了" />\
                </div>';
    setTimeout(
        function(){
            $('.wrapper').append(html);
        },
        seconds
    );
    $('body').on('click', '.wechat-share-prompt',  function(){
        $(this).hide();
        if (func){
            func();
        }
    });
};
/* 设置分享的标题，描述，链接和图片 */
M.wechat.settingShare = function(option){
    if(M.wechat.is_new_version()){
        M.wechat.set_new_version_share(option);
    }
};
/* 判断当前微信是否支持新版sdk */
M.wechat.is_new_version = function(){
    /*
    var ua = navigator.userAgent.toLowerCase();  
    if (ua.match(/windows\ phone/)){
        return false;  
    }else if (ua.match(/MicroMessenger/i)=="micromessenger"){  
        var v_weixin = ua.split('micromessenger')[1];  
        v_weixin = v_weixin.substring(1,6);  
        v_weixin = v_weixin.split(' ')[0];  
        if(v_weixin.split('.').length == 2){  
            v_weixin = v_weixin + '.0';  
        }  
        if(v_weixin < '6.0.2'){  
            return false;  
        }else{  
            return true;  
        }  
    }
    */
    return true; 
};
/* 初始化老版微信分享  */
/*
M.wechat.set_old_version_share = function(){
    // for wechat (version < 6.0.2)  
    WeixinJSBridge.on('menu:share:appmessage', function(argv){  
        WeixinJSBridge.invoke(
            'sendAppMessage',
            {  
                "img_url": M.wechat.imgUrl,  
                "link": M.wechat.lineLink,  
                "desc": M.wechat.descContent,  
                "title": M.wechat.shareTitle  
            }, 
            function(res) {  
                 _report('send_msg', res.err_msg);  
            }
        );  
    });  
    // 分享到朋友圈  
    WeixinJSBridge.on('menu:share:timeline', function(argv){  
        WeixinJSBridge.invoke(
            'shareTimeline',
            {  
                "img_url": M.wechat.imgUrl,  
                "link": M.wechat.lineLink,  
                "desc": M.wechat.descContent,  
                "title": M.wechat.shareTitle  
            }, 
            function(res) {  
                _report('timeline', res.err_msg);  
            }
        );  
    });  
    // 分享到微博  
    WeixinJSBridge.on('menu:share:weibo', function(argv){  
        WeixinJSBridge.invoke(
            'shareWeibo',
            {
                "content": M.wechat.descContent,  
                "url": M.wechat.lineLink,  
            }, 
            function(res) {  
                _report('weibo', res.err_msg);  
            }
        );  
    });  
}
*/
/* 初始化新版微信分享 */
M.wechat.set_new_version_share = function(option){
    if (typeof(wx) == 'undefined'){
        return;
    }
    var config = {
        title: option.shareTitle,
        link: option.lineLink,
        desc: option.descContent,
        imgUrl: option.imgUrl,
        success: option.success_callback,
        cancel: option.cancel_callback,
        fail: option.error_callback
    };
    wx.onMenuShareTimeline(config);
    wx.onMenuShareAppMessage(config);
    wx.onMenuShareQQ(config);
    wx.onMenuShareWeibo(config);
}
/* 初始化微信分享 */
M.wechat.initShare = function(option){
    if (typeof(option) == 'undefined'){
        return;
    }
    option = M.wechat.settings(option);
    if (M.wechat.is_new_version()){
        if(option.signature_info){
            wx.config({
                debug: option.debug || false,
                appId: option.signature_info.app_id,
                timestamp: option.signature_info.timestamp,
                nonceStr: option.signature_info.noncestr,
                signature: option.signature_info.signature,
                jsApiList: [
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'onMenuShareQQ',
                  'onMenuShareWeibo',
                ]
            });
            wx.ready(function(){
                wx.checkJsApi({
                    jsApiList: [
                      'onMenuShareTimeline',
                      'onMenuShareAppMessage',
                      'onMenuShareQQ',
                      'onMenuShareWeibo',
                    ],
                    success: function(res) {
                        return;
                    },
                });
                M.wechat.settingShare(option);
            });
        }
    }else{
        /* 老版本微信兼容存在问题
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {  
            M.wechat.set_old_version_share();
        }, false);
        */
    }
};


/**
  * 去除运营商广告
 **/
setTimeout(function(){

    var isReport = false;

    /**
    ** filter(string) => boolean
    ** true:符合规则,false:不符合规则
    **/
    function filter(src){
        var whiteList = ['http://meilapp.com/','meilapp://','http://meilapp.qiniudn.com/','http://www.google-analytics.com/','http://hm.baidu.com/','javascript:false;'];

        src = $.trim(src);

        //iframe没有src默认是正常的iframe
        if(!src){
            return true;
        }   

        src = src.indexOf('//') == 0 ? 'http:'+src : src;
        if(src.indexOf('/')==0){
            return true;
        }

        for(var i=0;i<whiteList.length;++i){
            if(src.indexOf(whiteList[i])===0){
                return true;
            }   
        }

        isReport = true;
        return false;
    }

    function getSrc(cb){
        var iframeList = $('iframe'),
            domList = $('script');

        for(var i = 0;i<iframeList.length;++i){
            domList.push(iframeList[i]);
        }

        for(var i=0;i<domList.length;++i){
            if(filter($(domList[i]).attr('src'))==false){
                cb($(domList[i]));
            }
        }
    }

    function checkDiv(cb){
        var domList = $('div[style*="bottom:"][style*="0"][style*="position:"][style*="fixed"]');       
        if(domList.length){
            cb(domList);
            isReport = true;
        }
    }

    function cb(dom){
        dom.remove();
    }

    //getSrc(cb);
    //checkDiv(cb);

},1000);

/*
M.layer.wait();
window.addEventListener('pageshow',function(){
    M.layer.close(0);
    $('.wrapper').css('visibility','visible');
},false);
*/

function viewWillDisappear(){
}
function viewWillAppear(){
}
function web_viewWillDisappear(){
}
function web_viewWillAppear(){
}
