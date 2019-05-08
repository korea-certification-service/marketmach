function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isMobile() {
    var tempUser = navigator.userAgent;
    var isMobile = false;

    // userAgent 값에 iPhone, iPad, ipot, Android 라는 문자열이 하나라도 존재한다면 모바일로 간주됨.
    if (tempUser.indexOf("iPhone") > 0 || tempUser.indexOf("iPad") > 0
        || tempUser.indexOf("iPot") > 0 || tempUser.indexOf("Android") > 0) {
        isMobile = true;
    }
    return isMobile;
};

function isIos() {
    var tempUser = navigator.userAgent;
    var isMobile = false;

    // userAgent 값에 iPhone, iPad, ipot, Android 라는 문자열이 하나라도 존재한다면 모바일로 간주됨.
    if (tempUser.indexOf("iPhone") > 0 || tempUser.indexOf("iPad") > 0
        || tempUser.indexOf("iPot") > 0) {
        isMobile = true;
    }
    return isMobile;
};


function fnMove() {
    let offset = $(".dorne-welcome-area").offset();
    $('html, body').animate({scrollTop : offset.top - 50}, 100);
}

function checkStrNum(value) {
    let idReg = /^[A-Za-z0-9]{6,20}$/g;
    if( !idReg.test( value ) ) {
        return false;
    }
    return true;
}

function checkXss(value) {
    let xssList = ['&','<','>','/','\"', '\''];
    //문제 있으면 false
    if( !xssList.indexOf( value ) > -1 ) {
        return false;
    }
    return true;
}

function makeToken1()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
