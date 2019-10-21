/***************************************************************************
* KCS: http://www.onlykcs.com/
* since: 20190311 
* Author: Jongmin Kim
******** Notice ********
*
*
***************************************************************************/
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
            if(_tgt !== undefined) {
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

// 임시로 VTR 거래신청 기능 막음
$("#regVTR").click(function(){
    // alert("Comming soon.")
    // throw new Error('VTR 거래신청 기능 막음');
});

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
}

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
        // 직접 숫자 입력한 경우
        itemLength.addEventListener("change", function(e) {
            resultPrice.innerText = numberWithCommas(itemLength.value * price);
        });
        // 버튼 누른 경우
        document.querySelector(".btnPlus").addEventListener("click", function(e) {
            // console.log(itemLength.value * price);
            resultPrice.innerText = numberWithCommas(itemLength.value * price);
            priceForSend.value = itemLength.value * price;
        });
        document.querySelector(".btnMinus").addEventListener("click", function(e) {
            // console.log(itemLength.value * price);
            resultPrice.innerText = numberWithCommas(itemLength.value * price);
            priceForSend.value = itemLength.value * price;
        });
        

    },
    numberUtil: function(obj) {
        var itemLength = document.querySelectorAll(".itemLength");
        var btnMinus = document.querySelectorAll(".btnMinus");
        var btnPlus = document.querySelectorAll(".btnPlus");
        for (var i = 0; i < itemLength.length; i++) {
            itemLength[i].addEventListener("focusout", function() {
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