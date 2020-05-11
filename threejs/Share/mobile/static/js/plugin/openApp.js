var openApp=function(){


    //判读点击打开是不是从 下载页面点击的！
    var flag =window.location.pathname=='/Mobile/Join/downloads.html';
    var valuee='I2DESIGN';

    // var localUrl="launchapp://"+encodeURI(JSON.stringify(valuee));
    var localUrl='http://a.app.qq.com/o/simple.jsp?pkgname=com.colyst.i2wenwen';

    var openIframe=createIframe();
    var u = navigator.userAgent;
    var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid= u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;


    var isWeixin = is_weixin();


    // if(isWeixin && !flag){
    //     loadHtml();
    //     loadStyleText(cssText);
    //     return;
    // }
    //




    if(isIos){
        window.location.href = 'https://itunes.apple.com/cn/app/i2%E9%97%AE%E9%97%AE/id1300460162?mt=8';
        // window.location.href = localUrl;
        // window.location.href = 'I2DESIGN:';
        var loadDateTime = Date.now();
        setTimeout(function () {
            var timeOutDateTime = Date.now();
            if (timeOutDateTime - loadDateTime < 1000) {
                if(!flag){
                    window.location.href = app.iosDownload;
                }
            }
        }, 25);
    }else if(isAndroid){
        if (isChrome) {
            window.location.href = localUrl;
        } else {
            openIframe.src = localUrl;
        }
        setTimeout(function () {
            if(!flag){
                window.location.href ="https://i2design.colyst.com/Mobile/Join/downloads.html";
            }
        }, 500);
    }else{
        openIframe.src = localUrl;
        setTimeout(function () {
            window.location.href = "https://i2design.colyst.com/Mobile/Join/downloads.html";
        }, 500);
    }
};

function is9() {
    var getOsv = function () {
        var reg = /OS ((\d+_?){2,3})\s/;
        if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
            var osv = reg.exec(navigator.userAgent);
            if (osv.length > 0) {
                return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
            }
        }
        return '';
    };
    var osv = getOsv();
    var osvArr = osv.split('.');
    if (osvArr && osvArr.length > 0) {
        if (parseInt(osvArr[0]) >= 9) {
            return true
        }
    }
    return false
}
var  createIframe=(function(){
    var iframe;
    return function(){
        if(iframe){
            return iframe;
        }else{
            iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.security = 'restricted';
            iframe.sandbox = '';
            document.body.appendChild(iframe);
            return iframe;
        }
    }
})();





//遮蔽层
function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
function loadHtml(){
    var div = document.createElement('div');
    div.id = 'weixin-tip';
    div.innerHTML = '<p><img src="./assets/img/live_weixin.png" alt="微信打开"/></p>';
    document.body.appendChild(div);
}

function loadStyleText(cssText) {
    var style = document.createElement('style');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    try {
        style.appendChild(document.createTextNode(cssText));
    } catch (e) {
        style.styleSheet.cssText = cssText; //ie9以下
    }
    var head=document.getElementsByTagName("head")[0]; //head标签之间加上style样式
    head.appendChild(style);
}
var cssText = "*{margin:0; padding:0;} img{max-width: 100%; height: auto;} #weixin-tip{position: fixed; left:0; top:0; background: rgba(0,0,0,0.8); filter:alpha(opacity=80); width: 100%; height:100%; z-index: 100;} #weixin-tip p{text-align: center; margin-top: 0%; padding:0 5%;}";
