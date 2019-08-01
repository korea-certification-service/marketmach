function _X_numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithCommas(str) {
    return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
        return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
    });
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

function isPc() {
    var computer = "win16|win32|win64|mac|macintel";
    if(navigator.platform){
        if(0 > computer.indexOf(navigator.platform.toLowerCase())){
            return false;
        }else{
            return true;
        }
    }
}

function fnMove() {
    var offset = $(".dorne-welcome-area").offset();
    $('html, body').animate({scrollTop : offset.top - 50}, 100);
}

function replaceType(value) {
    if(value == 'buy') {
        return {
            'title': 'P<br>U<br>R<br>C<br>H<br>A<br>S<br>E',
            'title_bg_class': 'card_buy',
            'title_class': 'bgc3'
        };
    } else {
        return {
            'title': 'S<br>A<br>L<br>E<br>S',
            'title_bg_class': 'card_sell',
            'title_class': 'bgc1'
        };
    }
}

function getItemType(value) {
    if(value == "item") {
        return {
            'text':'Item',
            'icon':'아이템',
            'className': 'ico_item'
        };
    } else if(value == "gameMoney") {
        return {
            'text':'Money',
            'icon':'게임머니',
            'className': 'ico_money'
        };
    } else  {
        return {
            'text':'ETC',
            'icon':'기타',
            'className': 'ico_etc'
        };
    }
}

function getStatus(value) {
    if(value == 0) {
        return {
            'text': 'Available',
            'number': 1,
            'className': 'todo',
            'detail': 'Available' // 거래가능
        };
    } else if((value >= 1 && value <= 3) || (value >= 101 && value <= 103)) {
        var detail = "Transaction Request"; // 거래요청
        if(value == 2 || value == 102) {
            detail = "Purchase Confirmation"; // 구매확인
        } else if(value == 3 || value == 103) {
            detail = "Sales Complete"; // 판매완료
        } 
        return {
            'text': 'Trading',
            'number': 2,
            'className': 'doing',
            'detail': detail
        };
    } else if(value == 4 || value == 6 || value == 7 || value == 104 || value == 106 || value == 107) {
        var detail = "Transaction Complete"; // 거래완료 
        if(value == 6 || value == 106) {
            detail = "Transaction Complete(admin)"; // 거래완료(관리자)
        } else if(value == 7 || value == 107) {
            detail = "Transaction Complete(system)"; // 거래완료(시스템)
        } 
        return {
            'text': 'Complete',
            'number': 3,
            'className': 'done',
            'detail': detail
        };
    } else if(value == 5 || value == 105) {
        //return '이의재기';
        return {
            'text': 'Complete',
            'number': 3,
            'className': 'done',
            'detail': 'Disputes' // 이의재기
        };
    } else if(value == 50) {
        return {
            'text': 'Trading',
            'number': 2,
            'className': 'doing',
            'detail': 'Talking' // 대화중
        };
    }
}

function getDelivery(value, category) {
    if(value == "direct") {
        return {
            'text': 'Direct Deal',
            'number': 1,
            'className': 'ico_direct'
        };
    } else if(value == "free_delivery") {
        return {
            'text': 'Free Delivery',
            'number': 2,
            'className': 'ico_delivery_free'
        };
    } else if(value == "delivery") {
        if(category == "buy") {
            return {
                'text': 'Shipping',
                'number': 3,
                'className': 'ico_delivery'
            };
        } else {
            return {
                'text': 'Pay on Delivery',
                'number': 3,
                'className': 'ico_delivery_payment'
            };
        }
    } 
}

function getPersonalType(value) {
    if(value == "0") {
        return {
            'text':'How to Use',
            'className': 'icon0'
        };
    } else if(value == "1") {
        return {
            'text':'Certification',
            'className': 'icon1'
        };
    } else if(value == "2") {
        return {
            'text':'Event',
            'className': 'icon2'
        };
    } else  {
        return {
            'text':'ETC',
            'className': 'icon3'
        };
    }
}

function getCommunityType(value) {
    if(value == "movie") {
        return {
            'text':'Media',
            'className': 'icon0'
        };
    } else if(value == "game") {
        return {
            'text':'Game Strategy',
            'className': 'icon1'
        };
    } else  {
        return {
            'text':'Post',
            'className': 'icon2'
        };
    }
}

function getEscrowType(value) {
    if(value == "deposit") {
        return {
            'text':'Withdrawal Escrow',
            'className': 'icon0'
        };
    } else if(value == "withdraw") {
        return {
            'text':'Deposit Escrow',
            'className': 'icon1'
        };
    } else if(value == "cancel") {
        return {
            'text':'Cancel Escrow',
            'className': 'icon2'
        };
    } else {
        return {
            'text':'-',
            'className': 'icon2'
        };
    }
}

function getCoinType(value, memo) {
    if(value == "deposit") {
        return {
            'text':'Deposit',
            'className': 'icon0'
        };
    } else if(value == "event-signup") {
        return {
            'text':'Join',
            'className': 'icon1'
        };
    } else if(value == "event-airdrop") {
        return {
            'text':'Airdrop',
            'className': 'icon1'
        };
    } else if(value == "event-recommander") {
        return {
            'text':'Recomender<br>event',
            'className': 'icon2'
        };
    } else if(value == "exchange-deposit") {
        return {
            'text':'Deposit MACH',
            'className': 'icon2'
        };
    } else if(value == "exchange-withdraw") {
        return {
            'text':'Withdraw Point',
            'className': 'icon2'
        };
    } else if(value == "withdraw") {
        return {
            'text':'Withdraw',
            'className': 'icon2'
        };
    } else if(value == "event-etc") {
        return {
            'text': memo,
            'className': 'icon2'
        };
    } else {
        return {
            'text':value,
            'className': 'icon2'
        };
    }
}

function checkStrNum(value) {
    //var idReg = /^[A-Za-z0-9]{6,20}$/g;
    var idReg =  /^[a-z]+[a-z0-9]{5,19}$/g;
    
    if( !idReg.test( value ) ) {
        return false;
    }
    return true;
}

function checkXss(value) {
    var xssList = ['&','<','>','/','\"', '\''];
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

function replaceDesc(value) {
    return value.replace(/\n/g, "<br>");
}

function checkAdult (start_date, to_date) {
    var s_d = new Date(start_date);
    var e_d = new Date(to_date);
    
    var s_year = s_d.getFullYear();
    var e_year = e_d.getFullYear();
    
    var diff = e_year - s_year; 
    //console.log(s_year, e_year, diff);
    return diff;
}

function setItemStatus(value) {
    if(value == "") {
        $("#all").attr('checked', true);
    } else if(value == "0") {
        $("#regist").attr('checked', true);
    } else if(value == "1") {
        $("#vtrStart").attr('checked', true);
    } else if(value == "2") {
        $("#vtrBuy").attr('checked', true);
    } else if(value == "3") {
        $("#vtrSell").attr('checked', true);
    } else if(value == "4") {
        $("#vtrConfirm").attr('checked', true);
    }
}

function checkDecimal(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  
    var _value = evt.target.value;       

    var dotOnlyOne = /^\d*[.]\d*$/;
    if (dotOnlyOne.test(_value)) {
        if (charCode == 46) {
            return false;
        }
    }

    var decimal8th = /^\d*[.]\d{8}$/;
    if (decimal8th.test(_value)) {
        return false;
    }

    return true;
}

function checkValidDecimal(value) {
    var reg = /^\d+\.?\d*$/;
    if (!reg.test(value)) {
        return false;
    }

    return true;
}


function resetSearchFilter(selector) {
    $(selector+ " input").each(function(){
        var $this = $(this);
        var $type = $this[0].type.toLowerCase();

        switch ($type) {
            case "radio":
                $this.removeAttr('checked')

                if($this.index() === 0) $this.prop("checked", true)
                
                break;
            case "text":
                $this.val("");
                
                break;
            default:
                break;
        }
    });
}

function openVtrInfo() {
    if (isMobile()) {
        window.open("/static/html/vtrInfo.html", "VtrInfo", "toolbar=yes,scrollbars=yes,resizable=no,top=0,left=50%,width=400,height=520");
    } else {
        window.open("/static/html/vtrInfo.html", "VtrInfo", "toolbar=yes,scrollbars=yes,resizable=no,top=0,left=50%,width=800,height=1100");
    }
}

function numCheck(obj){
    var num_check=/^[0-9]*$/;
       if(!num_check.test(obj)){
       return false;
    }
   return true;
}

function hash(value) {
    var hash = 5381;
    for (var i = 0; i < value.length; i++) {
        hash = ((hash << 5) + hash) + value.charCodeAt(i);
    }
    return hash;
}