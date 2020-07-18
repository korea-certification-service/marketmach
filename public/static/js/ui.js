/***********************************************************************
* KCS: http://www.onlykcs.com/
* since: 20190311 
* end: 20191120
* Author: Jongmin Kim
******************************** Notice ********************************
* 퍼포먼스 이슈때문에 slick을 쓰는 부분을 제외한 모든 부분 vanilla.js로 해결
* 현재 사용중인 클래스형 객체 설명
* MainUi : 메인화면 및 include 영역에 공통적으로 적용되는 로직 메서드화
* SubUI : 서브페이지에서 쓰이는 로직 메서드화
* _PopupUI : 공통적으로 쓰이는 모달창
* _ModalUI : ontology DAPP에서 사용하는 confirm, alert창 모달창으로 구현
************************************************************************/
document.addEventListener("DOMContentLoaded", function () { 

var MainUi = {
    isMobSideMenu: false,
    init: function(){
        this.floatHeader();
        this.navMenu();
        this.navHiddenMenu();
        this.showMobSideMenu();
        this.slickSlide();
        // this.showSiblingNode({btn: ".btnGame", sec: ".secGame"});   // GAME
        // this.showSiblingNode({btn: ".btnOtc", sec: ".secOtc"});     // OTC
        // this.showSiblingNode({btn: ".btnNoti1", sec: ".secNoti1"}); // Notice
        // this.showSiblingNode({btn: ".btnNoti2", sec: ".secNoti2"}); // Notice
        this.linkMACHAdventure();
        this.hoverChatbotImg();
    },
    floatHeader: function() {
        var lastPos = 0;
        var ticking = false;
        var topMenu = null;
        var schSec = null;
        var device = navigator.userAgent;
        var computer = "win16|win32|win64|mac|macintel";

        var that = this;
        window.addEventListener("scroll", function(e){
            //console.log(e.target, e)

            lastPos = window.scrollY;

            if (!ticking) {
            window.requestAnimationFrame(function() {
                if(navigator.platform){
                    if(0 > computer.indexOf(navigator.platform.toLowerCase())){
                        if(that.isMobSideMenu === false){
                            showOnlyNav({top: ".mob_sch_sec .search_bar", sch: ".mob_sch_sec .search_bar"});
                        }
                    }else{
                        showOnlyNav({top: ".top_menu", sch: ".top_menu"});
                        //console.log(navigator.platform.toLowerCase());
                    }
                }
                ticking = false;
            });
        
            ticking = true;
            } 
        });

        function showOnlyNav(_tgt) {
            if(_tgt.top !== undefined && _tgt.sch !== undefined) {
                topMenu = document.querySelector(_tgt.top);
                schSec = document.querySelector(_tgt.sch);
                //console.log(lastPos)
                if(lastPos > 15) {
                    //topMenu.classList.remove("fadeOut");
                    //schSec.classList.remove("fadeOut");
                    topMenu.style.display = "none";
                    schSec.style.display = "none";
                    setTimeout(function(){
                    }, 300);
                } else {
                    topMenu.style.display = "block";
                    schSec.style.display = "block";                
                    //topMenu.classList.add("fadeIn");
                    //schSec.classList.add("fadeIn");
                }
            }
        }
    },

    // navigation Common Function
    navMenu: function() {
        /** if you click anywhere */ 
        document.querySelector("#wrap").addEventListener("click", function(e) {
            //console.log(e.target);
            
            function fnRemoveClass(depth2) {
                for(var j = 0; j < depth2.length; j++) {
                    //depth2[j].style.display = "none";
                    depth2[j].classList.remove("show");
                }
            }

            // Hide PC navigation depth Menu 
            fnRemoveClass(document.querySelectorAll(".nav .nav_menu .depth2"));
            
            // Hide Mobile navigation depth Menu 
            fnRemoveClass(document.querySelectorAll(".mob_dep2_menu > dl"));          
        });

        /* PC Nav */
        (function(){
            var tgt = document.querySelectorAll(".nav_menu .hasDepth2");
    
            for (var i = 0, len = tgt.length; i < len; i++) {
                tgt[i].addEventListener("click", function(idx){
                    return function() {
                        event.stopPropagation(); // stop bubbling

                        //console.log("aaa", idx);

                        var depth2 = document.querySelectorAll(".nav_menu .depth2");
                        for(var j = 0; j < len; j++){
                            depth2[j].classList.remove("show");
                        }
                        depth2[idx].classList.add("show");
                    }
                }(i));
            }
        }());

        /* Mobile Nav */
        (function() {
            var tgt = document.querySelectorAll(".btnMobMenu");

            for (var i = 0, len = tgt.length; i < len; i++) {
                tgt[i].addEventListener("click", function(idx){
                    return function() {
                        //console.log(idx);
                        event.stopPropagation(); // stop bubbling

                        var depth2 = document.querySelectorAll(".mob_dep2_menu > dl");
                        for(var j = 0; j < len; j++){
                            depth2[j].classList.remove("show");
                        }
                        depth2[idx].classList.add("show");

                        // Animation effact
                        $('.mob_dep2_menu > dl').css({'right':'-100px'});
                        setInterval(function(){
                            
                            if($('.mob_dep2_menu > dl').css('right') != '10px'){
                                $('.mob_dep2_menu > dl').css({'right' : "calc(" + $('.mob_dep2_menu > dl').css('right') + " + '10px')"});
                            }
                            else{
                                clearInterval();
                            }
                        }, 100);
                    }
                }(i));
            }
        }());
    },
    // Toggle navigation Hidden Menu
    navHiddenMenu: function() {
        // use GPU in animation
        var target = document.querySelector("#floatingInfoBox");

        if(target) {
            var isMain = target.getAttribute("ismain");
            var isHidden;
            if(isMain === "true") {
                isHidden = false;
                target.style.display="block";
            } else {
                isHidden = true;
            }
            document.querySelector("#btnInfoBox").addEventListener("click", function(){
                if (isHidden) {
                    target.classList.remove("fadeOut");
                    target.classList.add("fadeIn");
                    target.style.display="block";
                } else {
                    target.classList.remove("fadeIn")
                    target.classList.add("fadeOut");
                    setTimeout(function(){
                        target.style.display="none";
                    },300)
                }
                isHidden = !isHidden;
            });
        }
    },
    // Toggle Mobile Side Menu
    showMobSideMenu: function() {
        var body = document.querySelector("body");
        var btnMenu = document.querySelector(".hamburger_menu");
        var bgDim = document.querySelector("#bgDim");
        var btnOpen = document.querySelector("#btnHamburger");
        var btnClose = document.querySelector("#btnCloseMobSideMenu");

        var that = this;
        if(btnMenu) {
            btnOpen.addEventListener("click", function(e) {
                that.isMobSideMenu = true;
                body.style.position="fixed";
                btnMenu.style.display="block";
                bgDim.style.display="block";
            });

            btnClose.addEventListener("click", function(e) {
                fnClose();
            });

            bgDim.addEventListener("click", function(e) {
                fnClose();
            });

            function fnClose() {
                that.isMobSideMenu = false;
                body.style.position="initial";
                btnMenu.style.display="none";
                bgDim.style.display="none";
            }
        }
    },
    // use IMG Slider Library
    slickSlide: function() {
        // Main Visual
        $('.slick_visual').slick({
            dots: false,
            speed: 600,
            autoplay: true,
            autoplaySpeed: 6000,
            fade: true,
            cssEase: 'linear',
            //asNavFor: '#navSlcikVisual',
            pauseOnHover: false,
            responsive: [
                {
                    breakpoint: 993,
                    settings: { 
                        dots: true,
                    }
                },
            ]
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $('.nav_text_box').removeClass("on").eq(nextSlide).addClass("on");
        });
        
        var navVisualLength;
        var navSlcikVisual = document.getElementById("navSlcikVisual");
        if(navSlcikVisual) {
            navVisualLength = parseInt(navSlcikVisual.getAttribute("nav-visual-length"));
            navSlcikVisual.querySelectorAll(".nav_text_box")[0].classList.add("on");
        }
        $('#navSlcikVisual').slick({
            slidesToShow: navVisualLength,
            asNavFor: '.slick_visual',
            focusOnSelect: true,
            pauseOnHover: false,
        });

        // PRIME ZONE card UI
        /*
        $('.slick_primezone').slick({
            dots: true,
            speed: 800,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: $('.primezone_arrow .prev'),
            nextArrow: $('.primezone_arrow .next'),         
            responsive: [
                {
                    breakpoint: 1200,
                    settings: { 
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: { 
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint:576,
                    settings: { 
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        autoplaySpeed: 3000,
                    }
                },
            ]
        });
        // COIN
        $('.slick_coin_quotes').slick({
            slidesToShow: 4,
            slidesToScroll: 4,     
            autoplay: true,
            autoplaySpeed: 15000,
            prevArrow: $('.coin_quotes_arrow .prev'),
            nextArrow: $('.coin_quotes_arrow .next'), 
            responsive: [
                {
                    breakpoint: 1199,
                    settings: { 
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }, 
            ]
        });
        */
        // CI
        $('.ci_area').slick({
            slidesToShow: 6,
            slidesToScroll: 1,     
            autoplay: true,
            prevArrow: $('.ci_arrow .prev'),
            nextArrow: $('.ci_arrow .next'), 
            responsive: [
                {
                    breakpoint: 767,
                    settings: { 
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
            ]
        });
    },
    // show tab UI
    showSiblingNode: function(_obj) {
        var target = document.querySelectorAll(_obj.btn);
        for (var i=0, len=target.length; i < len; i++) {
            target[i].addEventListener("click", function(e) {
                var eTarget = e.target.parentNode.nextElementSibling; // trade_list
                //console.log(eTarget, eTarget.classList[0]);
                if(eTarget.classList[3] === "toggleTable"){
                    for(var j=0; j < len; j++){
                        document.querySelectorAll(_obj.sec + " .toggleTable")[j].style.display="none";
                        document.querySelectorAll(_obj.sec + " h2")[j].classList.remove("on");
                        document.querySelectorAll(_obj.sec + " "+_obj.btn)[j].classList.remove("on");
                    }
                    eTarget.style.display="block"; // trade_list
                    e.target.parentNode.classList.add("on"); // h2
                }    
            });
        }
    },
    // distinguish device
    linkMACHAdventure: function() {
        var a = document.querySelector("#linkMachGame .mob_show")
        if(a && isIos()) {
            a.setAttribute("href", "https://itunes.apple.com/kr/app/mach-adventure/id1465065764?mt=8");
        } 
    },
    hoverChatbotImg: function() {
        var aMachbot = document.getElementById("aMachbot");
        var active = document.querySelector(".chatbot_active");
        var hover = document.querySelector(".chatbot_hover");
        if(aMachbot) {
            aMachbot.addEventListener("mouseenter", function() {
                active.style.display = "none";
                hover.style.display = "inline";
            });
            aMachbot.addEventListener("mouseleave", function() {
                active.style.display = "inline";
                hover.style.display = "none";
            });
        }
    }
};
MainUi.init();

var SubUI = {
    init: function() {
        // FAQ
        this.toggleMenu("#supportFaq", "tgtTit", "faqContent", function(ev){
            // callback function for adjust event 
            //console.log(ev);
        });
    },
    toggleMenu: function(wrapSelector, targetClassName, faqContentClassName, fnCallback) {
        var accordion = document.querySelector(wrapSelector);
        if(accordion) {
            accordion.addEventListener("click", function(e) {
                if(e.target.classList[0] === targetClassName) {
                    var arrCon = document.querySelectorAll(wrapSelector + " ." + faqContentClassName);
                    var classOnTgt = document.querySelectorAll(wrapSelector + " ." + targetClassName);
                    for (var i = 0; i < arrCon.length; i++) {
                        arrCon[i].style.display="none";
                    }
                    for (var j = 0; j < classOnTgt.length; j++) {
                        classOnTgt[j].parentNode.classList.remove("on");
                    }

                    e.target.parentNode.nextElementSibling.style.display="block";
                    e.target.parentNode.classList.add("on");
                    //console.log(e.target.parentNode.nextElementSibling);

                    fnCallback(e);
                }
            });
        }
    }
}
SubUI.init();

}, false); // end of DOMContentLoaded

var _PopupUI = {
    openAfterClick: function(selector) {
        var that = this;

        if(selector === undefined) {
            selector = "#confirmDeposit";
        }

        document.querySelector(selector).addEventListener("click", function(){
            that.showWithDim();
        });
    },

    closeAfterClick: function(selector) {
        var that = this;

        if(selector === undefined) {
            selector = "#btnmCloseModal";
        }

        document.querySelector(selector).addEventListener("click", function(){
            that.hideWithDim();
        });
    },

    showWithDim: function(fnCallback) {
        var body = document.querySelector("#wrap");
        var dim = document.querySelector(".dim_all_area");
        dim.style.display = "block";
        body.style.position = "relative"; 

        var lastY = document.querySelector(".modal_bitberry_deposit").offsetTop;
        window.scrollTo(0, lastY); 

        //console.log("콜백 전")
        if(fnCallback !== undefined && typeof fnCallback === "function") fnCallback();       
    },

    hideWithDim: function(fnCallback) {
        var body = document.querySelector("#wrap");
        var dim = document.querySelector(".dim_all_area");
        dim.style.display = "none";
        body.style.position = "static";

        if(fnCallback !== undefined && typeof fnCallback === "function") fnCallback();   
    },
    toggleSpiner: function(obj) {
        /**
         * 켤 때 : _PopupUI.toggleSpiner({isActive: true, target: e.currentTarget});
         * 끌 때 : _PopupUI.toggleSpiner({isActive: false});
         */
        if (obj.target) {
            obj.target.setAttribute("disabled", "disabled"); 
        }

        var ajaxSpiner = document.getElementById("ajaxSpiner");
        if(obj.isActive) {
            ajaxSpiner.style.display = "block";
            var lastY = document.querySelector(".ajax_spinner_wrap").offsetTop;
            window.scrollTo(0, lastY-250); 
        } else {
            ajaxSpiner.style.display = "none";
        }
    }
}

/**
* ontology DAPP 전용 모달창 
* 하이브리의앱에서 alert, confirm이 안되기 때문에 직접 구현함
* 사용 방법은 아래 주석 참고
*
********** alert창 ********** 
var obj = { title: '제목', subTitle: '부제'};
    obj.p = '본문';

_ModalUI.init(obj, "alert");

* alert도 callback 함수 실행 가능하게 추가 개발함

********** confirm창 ********** 
* class default 값: 'positive' (초록색 스마일 아이콘)
* negative는 빨간색 스마일 아이콘: 하면 안좋은 행동에 표시 ex) 회원탈퇴
var obj1 = {class: 'negative', title: '제목', subTitle: '부제'};
    obj1.p = '본문';

_ModalUI.init(obj1, "confirm", function() {
    if(_ModalUI.isConfirm) {
        alert("확인")
    } else {
        alert("취소")
    }
});
 */
var _ModalUI = {
    init: function(obj, type, callback){
        this.createAndShow(obj, type);
        switch (type) {
            case "alert":   // 확인버튼만 있는 단순 알림창
                this.alert(callback);
                break;
            case "confirm": // 확인과 취소 버튼이 존재하는 분기창
                this.confirmCallback(callback);
                break;
            case "finalTransaction": // 확인과 취소 버튼이 존재하는 분기창
                this.confirmCallback(callback);
                break;
            default:
                break;
        }

    },
    createAndShow : function(obj, type) {
        var posY = window.scrollY+50;
        var dom = '';
        var articleClass = (obj.class === undefined) ? "positive" : obj.class;
        var title = (obj.title===undefined) ? "" : obj.title;
        var subTitle = (obj.subTitle===undefined) ? "" : obj.subTitle;
        var p = (obj.p===undefined) ? "" : obj.p;

        dom += '<div class="dim_smile_area">'
        if(type === "alert")   dom +=     '<article class="modal_smile effective" style="top: '+posY+'px">'
        if(type === "confirm") dom +=     '<article class="modal_smile '+articleClass+'" style="top: '+posY+'px">'     
        if(type === "finalTransaction") dom +=     '<article class="modal_smile '+articleClass+'" style="top: '+posY+'px">'     
        dom +=         '<div class="smile_area"></div>'
        dom +=         '<h1>'+title+'</h1>'
        dom +=         '<h2>'+subTitle+'</h2>'
        dom +=         '<p>'+p+'</p>'
        if(type === "alert")   dom +=         '<button id="btnAlertOk" class="btn_confirm">confirm</button>'
        if(type === "confirm") dom +=         '<button id="btnSmileOk" class="btn_confirm">confirm</button>'
        if(type === "confirm") dom +=         '<button id="btnSmileNo" class="btn_cancle">cancel</button>'
        if(type === "finalTransaction") dom +=         '<button id="btnTransactionOk" class="btn_confirm">confirm</button>'
        if(type === "finalTransaction") dom +=         '<button id="btnTransactionNo" class="btn_cancle">denied</button>'
        dom +=     '</article>'
        dom += '</div>'

        document.querySelector(".wrap .sub_container").insertAdjacentHTML("afterend", dom);
    },
    alert: function(callback) {
        var that = this;
        document.addEventListener("click", function(e) {
            if(e.target.nodeName === "BUTTON") {
                if(e.target.id === "btnAlertOk") {
                    that.closeModal();
                    if(callback) callback();
                }
            }
        }); 
    },
    confirmCallback: function(callback) {
        var that = this;
        document.addEventListener("click", function(e) {
            if(e.target.nodeName === "BUTTON") {
                if(e.target.id === "btnSmileOk") {
                    _ModalUI.isConfirm = true;
                    _ModalUI.isTransaction = false;
                } else if(e.target.id === "btnSmileNo") {
                    _ModalUI.isConfirm = false;
                    _ModalUI.isTransaction = false;
                } else if(e.target.id === "btnTransactionOk") {
                    _ModalUI.isConfirm = false;
                    _ModalUI.isTransaction = true;
                } else if(e.target.id === "btnTransactionNo") {
                    _ModalUI.isConfirm = false;
                    _ModalUI.isTransaction = false;
                }
                switch (e.target.id) {
                    case "btnSmileOk" :
                    case "btnSmileNo" :
                    case "btnTransactionOk" :
                    case "btnTransactionNo":
                        that.closeModal();
                        // 이벤트 리스너가 계속 추가되서 클릭한 횟수만큼 이벤트 발생하는 것을 막기위해
                        callback(); // 콜백 실행
                        this.removeEventListener("click",arguments.callee); // 그 후 현재 이벤트 리스너 제거
                        break;
                    default:
                        break;
                }
            }
        }); 
    },
    closeModal: function() {
        // 돔 삭제
        var child = document.querySelector(".dim_smile_area");
        if(child) child.parentNode.removeChild(child);
    }
}
/*
var isTrue = false;
function _ModalUI(param) {
    this.btnSmileOk = param.btnSmileOk;
    this.btnSmileNo = param.btnSmileNo;
    this.isTrue = false;
}
_ModalUI.prototype.createAndShow = function(obj) {
    var dom = '';
    dom += '<div class="dim_all_area">'
    dom +=     '<article class="modal_smile '+obj.class+'">'
    dom +=         '<div class="smile_area"></div>'
    dom +=         '<h1>'+obj.title+'</h1>'
    dom +=         '<h2>'+obj.subTitle+'</h2>'
    dom +=         '<p>'+obj.p+'</p>'
    if(obj.confirm) dom +=         '<button id="'+this.btnSmileOk+'" class="btn_confirm">confirm</button>'
    if(obj.cancle)  dom +=         '<button id="'+this.btnSmileNo+'" class="btn_cancle">cancle</button>'
    dom +=     '</article>'
    dom += '</div>'
    document.querySelector(".wrap > .content_wrap").insertAdjacentHTML("afterend", dom);
}
_ModalUI.prototype.clickBtnCallback = function(callback) {
    var that = this;
    document.addEventListener("click", function(e){
        if(e.target.id === that.btnSmileOk) {
            isTrue = true;
        }
        if(e.target.id === that.btnSmileNo) {
            isTrue = false;
        }

        callback();
    })
}
*/

/** deprecated: 우주대특가 초창기때 여러개 갯수 구매 가능할 때 로직 */
var _BtoCUI = {
    actSelectBox: function(opt, callback){
        var btn = document.querySelector("#"+opt.btn);
        var ul = document.querySelector("#"+opt.ul);
        var selectedList = document.querySelector("#"+opt.selectedList);
        var isOpen = false;


        btn.addEventListener("click", function() {
            
            // css
            if (!isOpen) {
                ul.style.display="block";
            } else {
                ul.style.display="none";
            }
            isOpen = !isOpen;
            
            // logic
            if (isOpen) {
                var li = ul.querySelectorAll("li");
                for (var i = 0; i < li.length; i++) {
                    li[i].addEventListener("click", function(e) {
                        
                        selectedList.firstElementChild.querySelector(".itemTitle").innerText = this.querySelector(".productName").innerText;
                        selectedList.firstElementChild.querySelector(".item_calc").style.display = "block";

                        closeList();
                    });
                }
            }

            // callback
            if(callback) callback();
        });

        function closeList() {
            isOpen = false;
            ul.style.display="none";
        }
    },
    calcAndView: function(obj) {
        var itemLength = document.querySelector(obj.itemLength);
        var price = parseInt(obj.price);
        var resultPrice = document.querySelector(obj.resultPrice);
        var priceForSend = document.querySelector(obj.priceForSend);
        function fnCommonCallback() {
            // console.log(itemLength.value * price);
            resultPrice.innerText = numberWithCommas(itemLength.value * price);
            priceForSend.value = itemLength.value * price;
        }
        if(itemLength) {
            // 직접 숫자 입력한 경우
            itemLength.addEventListener("input", function(e) {
                fnCommonCallback();
            });

            // 버튼 누른 경우
            document.querySelector(".btnPlus").addEventListener("click", function(e) {
                fnCommonCallback();
            });
            document.querySelector(".btnMinus").addEventListener("click", function(e) {
                fnCommonCallback();
            });
        }
    },
    numberUtil: function(obj) {
        var itemLength = document.querySelectorAll(".itemLength");
        var btnMinus = document.querySelectorAll(".btnMinus");
        var btnPlus = document.querySelectorAll(".btnPlus");
        for (var i = 0; i < itemLength.length; i++) {
            itemLength[i].addEventListener("input", function() {
                if(this.value === "0"){
                    this.value = "1";
                }
                if(!numCheck(this.value)){
                    this.value = "1";
                    alert("주문 수량은 숫자만 가능합니다");
                }
                if(this.value > parseInt(obj.maxLen)) {
                    alert("최대 주문 수량은 "+obj.maxLen+"개 입니다");
                    this.value = "1";
                }
            });

            var num;
            btnMinus[i].addEventListener("click", function(e) {
                //console.log(e.target.nextSibling.nextSibling.value);
                //e.target.nextSibling.nextSibling.value -= 1;
                num = parseInt(e.target.nextSibling.nextSibling.value);
                if(num > 1) {
                    num -= 1;
                    e.target.nextSibling.nextSibling.value = num;
                }
            });
            
            btnPlus[i].addEventListener("click", function(e) {
                //console.log(e.target.previousSibling.previousSibling.value);
                //e.target.previousSibling.previousSibling.value += 1;
                num = parseInt(e.target.previousSibling.previousSibling.value);
                if(num < parseInt(obj.maxLen)) {
                    num += 1;
                    e.target.previousSibling.previousSibling.value = num;
                } else {
                    alert(obj.maxLen+"개이상 구매가 불가능한 상품입니다.");
                }
            });
        }
    }    
}

var _UtilUI ={
    checkLogin: function(callback) { // 로그인 여부 체크
        var cookie_data = document.cookie;
        var loginToken = cookie_data.indexOf("loginToken");

        if(loginToken > -1) {
            if(callback === undefined || null || "") {
                return true;
            } else if(typeof callback == 'function') {
                callback();
            }
        } else {
            if(callback === undefined || null || "") {
                return false;
            } else if(typeof callback == 'function') {
                callback();
                location.href = "/login";
            }
        }
    }
} 

/** deprecated: 방탄소년단 핸드크림 로직 */
var _SelectUI = {
    actSelectBox: function(opt, callback){
        var btn = document.querySelector("#"+opt.btn);
        var ul = document.querySelector("#"+opt.ul);
        var selectedList = document.querySelector("#"+opt.selectedList);
        var paymentMethod = document.querySelector("#paymentMethod");
        var isOpen = false;

        paymentMethod.addEventListener("change", function() {
            if(paymentMethod.value === "") {
                closeList();
                alert("결제수단을 선택해주세요.");
            } 
        });

        btn.addEventListener("click", function() {
            if(paymentMethod.value === "") {
                closeList();
                alert("결제수단부터 선택해주세요.");
                return;
            }
            
            // css
            if (!isOpen) {
                ul.style.display="block";
                hideText(paymentMethod.value);
            } else {
                ul.style.display="none";
            }
            isOpen = !isOpen;
            
            // logic
            if (isOpen) {
                var li = ul.querySelectorAll("li");
                for (var i = 0; i < li.length; i++) {
                    li[i].addEventListener("click", function(e) {
                        // if(paymentMethod.value === "") {
                        //     alert("결제수단이 올바르지 않습니다.")
                        //     return;
                        // }
                        
                        selectedList.firstElementChild.querySelector(".itemTitle").innerText = this.querySelector(".productName").innerText;
                        selectedList.firstElementChild.querySelector(".item_calc").style.display = "block";

                        if(paymentMethod.value === "mach") {
                            selectedList.firstElementChild.querySelector(".itemPrice").innerText = this.querySelector(".priceMach").innerText;
                        } else if(paymentMethod.value === "point") {
                            selectedList.firstElementChild.querySelector(".itemPrice").innerText = this.querySelector(".pricePoint").innerText;
                        }

                        closeList();
                    });
                }
            }

            // callback
            if(callback) callback();
        });

        function hideText(txt) {
            var mach = document.querySelectorAll(".priceMach");
            var point = document.querySelectorAll(".pricePoint");

            
            if(txt === "mach") {
                console.log(txt)
                for (var j = 0; j < mach.length; j++) {
                    mach[j].style.display = "inline";
                    point[j].style.display = "none";
                }
            } else if(txt === "point"){
                for (var k = 0; k < mach.length; k++) {
                    mach[k].style.display = "none";
                    point[k].style.display = "inline";
                }
            } else {
                alert("결제수단을 마하와 포인트중 선택해주세요")
            }

        }

        function closeList() {
            isOpen = false;
            ul.style.display="none";
        }
    },
    numberUtil: function() {
        var itemLength = document.querySelectorAll(".itemLength");
        var btnMinus = document.querySelectorAll(".btnMinus");
        var btnPlus = document.querySelectorAll(".btnPlus");
        for (var i = 0; i < itemLength.length; i++) {
            itemLength[i].addEventListener("focusout", function() {
                if(!numCheck(this.value)){
                    this.value = "1";
                    alert("주문 수량은 숫자만 가능합니다");
                }
                if(this.value > 100) {
                    alert("최대 주문 수량은 100개 입니다");
                    this.value = "1";
                }
            });

            var num;
            btnMinus[i].addEventListener("click", function(e) {
                //console.log(e.target.nextSibling.nextSibling.value);
                //e.target.nextSibling.nextSibling.value -= 1;
                num = parseInt(e.target.nextSibling.nextSibling.value);
                if(num > 1) {
                    num -= 1;
                    e.target.nextSibling.nextSibling.value = num;
                }
            });
            
            btnPlus[i].addEventListener("click", function(e) {
                //console.log(e.target.previousSibling.previousSibling.value);
                //e.target.previousSibling.previousSibling.value += 1;
                num = parseInt(e.target.previousSibling.previousSibling.value);
                if(num < 100) {
                    num += 1;
                    e.target.previousSibling.previousSibling.value = num;
                } else {
                    alert("100개이상 구매가 불가능한 상품입니다.");
                }
            });
        }
    }
}
/*
* All script is copyLeft 2019 By Jongmin Kim,
* if you need anything, feel free to contact me. (ds2lvg@gmail.com)
*/