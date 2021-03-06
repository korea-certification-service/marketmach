/**
 * 이용안내 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var token = require('../utils/token');
var util = require('../utils/util');

//이용안내 페이지
router.get('/trade/vtr', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/tradevtr', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/tradevtr', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/howto/tradevtr', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/howto/tradevtr', util.initParam(req, dbconfig));
    }
});

//VTR & Chatbot 안내 페이지
router.get('/vtr_chatbot', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/vtr_chatbot', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/vtr_chatbot', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/howto/vtr_chatbot', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/howto/vtr_chatbot', util.initParam(req, dbconfig));
    }
});

//해피머니에서 포인트로 전환 방법 안내 페이지
router.get('/happymoney_to_point', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/happymoney_to_point', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/happymoney_to_point', util.initParam(req, dbconfig));         
    }
});

//사용안함
router.get('/safty_trade', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/safty_trade', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId,
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/safty_trade', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId,
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/safty_trade', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId,
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    }
});

//사용안함
router.get('/trade/buynow', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/tradebuynow', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/tradebuynow', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/tradebuynow', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    }
});

//사용안함
router.get('/buymach/wallet', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/buymachwallet', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain,
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/buymachwallet', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain,
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/buymachwallet', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain,
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    }
});

//사용안함
router.get('/buymach/buy', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/buymachbuy', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/buymachbuy', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/buymachbuy', {            
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    }
});

//사용안함
router.get('/buymach/deposit', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/buymachdeposit', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
             pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/buymachdeposit', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
             pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/buymachdeposit', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
             pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });   
    }
});

//사용안함
router.get('/buymach/withdraw', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/buymachwithdraw', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain,
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/buymachwithdraw', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain,
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/buymachwithdraw', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain,
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    }
});

//사용안함
router.get('/safeTrade/escrow', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/safeTradeescrow', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/safeTradeescrow', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/safeTradeescrow', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    }
});

//사용안함
router.get('/safeTrade/cuation', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/safeTradecuation', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/safeTradecuation', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/safeTradecuation', {
            title: 'Bitweb Main', 
            userTag:req.session.userTag,
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    }
});

//사용안함
router.get('/etc/csbot', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/etccsbot', {
            title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/etccsbot', {
            title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/etccsbot', {
            title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    }
});

//사용안함
router.get('/etc/fee', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/etcfee', {
            title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/howto/etcfee', {
            title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/howto/etcfee', {
            title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId, 
            authPhone: req.session.authPhone, 
            pointId: req.session.pointId, 
            useBlockchain:dbconfig.useBlockchain, 
            usePoint:dbconfig.usePoint,
            country:req.session.country
        });
    }
});

module.exports = router;
