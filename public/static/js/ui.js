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
        this.showSiblingNode();
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
            dots: true,
            speed: 1200,
            autoplay: true,
            autoplaySpeed: 6000,
            fade: true,
            cssEase: 'linear',
        }); 
        // PRIME ZONE card UI
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
                /*
                {
                    breakpoint: 576,
                    settings: { 
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                */ 
            ]
        });
    },
    // show tab UI(게임 아이템 판매/구매)
    showSiblingNode: function() {
        var target = document.querySelectorAll(".btn_show_list");
        for (var i=0, len=target.length; i < len; i++) {
            target[i].addEventListener("click", function(e) {
                var eTarget = e.target.parentNode.nextElementSibling; // trade_list
                //console.log(eTarget, eTarget.classList[0]);
                if(eTarget.classList[0] === "trade_list"){
                    for(var j=0; j < len; j++){
                        document.querySelectorAll(".item_trade_sec .trade_list")[j].style.display="none";
                        document.querySelectorAll(".item_trade_sec > h2")[j].classList.remove("on");
                        document.querySelectorAll(".item_trade_sec .btn_show_list")[j].classList.remove("on");
                    }
                    eTarget.style.display="block"; // trade_list
                    e.target.parentNode.classList.add("on"); // h2
                }    
            });
        }
    },
    
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
    },
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
        //console.log("콜백 전")
        if(fnCallback !== undefined && typeof fnCallback === "function") fnCallback();       
    },

    hideWithDim: function(fnCallback) {
        var body = document.querySelector("#wrap");
        var dim = document.querySelector(".dim_all_area");
        dim.style.display = "none";
        body.style.position = "initial";

        if(fnCallback !== undefined && typeof fnCallback === "function") fnCallback();   
    }
}

/*
* All script is copyLeft 2019 By Jongmin Kim,
* if you need anything, feel free to contact me. (ds2lvg@gmail.com)
*/