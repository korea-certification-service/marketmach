var express = require('express');
var router = express.Router();
var machUsers = require('../services/users');
var sessionChecker=require('../utils/session');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');

router.get('/info', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/info', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[0,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/info', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[0,0],
            country:req.session.country
        });       
    } else{
        res.render('v2_en/support/info', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[0,0],
            country:req.session.country
        });
    }
});

router.get('/notice', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/notice/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/notice/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0],
            country:req.session.country
        });     
    } else {
        res.render('v2_en/support/notice/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0],
            country:req.session.country
        });
    }
});

router.get('/notice/detail', token.checkLoginTokenNoSignIn,  function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/notice/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            noticeId: req.query.noticeId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/notice/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            noticeId: req.query.noticeId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0],
            country:req.session.country
        });    
    } else{
        res.render('v2_en/support/notice/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            noticeId: req.query.noticeId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0],
            country:req.session.country
        });
    }
});

router.get('/event', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/event/now', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/event/now', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });       
    } else {
        res.render('v2_en/support/event/now', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });
    }
});

router.get('/event/past', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/event/past', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/event/past', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });      
    } else {
        res.render('v2_en/support/event/past', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });
    }
});

router.get('/event/detail/:eventId', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/event/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            eventId: req.params.eventId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/event/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            eventId: req.params.eventId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });      
    } else {
        res.render('v2_en/support/event/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            eventId: req.params.eventId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });
    }
});

router.get('/faq', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/faq', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[3,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/faq', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[3,0],
            country:req.session.country
        });        
    } else {
        res.render('v2_en/support/faq', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[3,0],
            country:req.session.country
        });
    }
});

router.get('/opposition/register', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            itemId: req.query.itemId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/opposition/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            itemId: req.query.itemId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,1],
            country:req.session.country
        });      
    } else {
        res.render('v2_en/support/opposition/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            itemId: req.query.itemId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,1],
            country:req.session.country
        });
    }
});

router.get('/opposition/list', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/opposition/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2],
            country:req.session.country
        });      
    } else {
        res.render('v2_en/support/opposition/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2],
            country:req.session.country
        });
    }
});

router.get('/opposition/detail/:oppositionId', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            oppositionId: req.params.oppositionId,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/opposition/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            oppositionId: req.params.oppositionId,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2],
            country:req.session.country
        });        
    } else {
        res.render('v2_en/support/opposition/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            oppositionId: req.params.oppositionId,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2],
            country:req.session.country
        });
    }
});

router.get('/opposition/modify/:oppositionId', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            oppositionId: req.params.oppositionId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/opposition/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            oppositionId: req.params.oppositionId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2],
            country:req.session.country
        });       
    } else {
        res.render('v2_en/support/opposition/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            oppositionId: req.params.oppositionId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2],
            country:req.session.country
        });
    }
});

router.get('/private/register', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/private/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,1],
            country:req.session.country
        });      
    } else {
        res.render('v2_en/support/private/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,1],
            country:req.session.country
        });
    }
});

router.get('/private/list', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/private/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });       
    } else {
        res.render('v2_en/support/private/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });
    }
});

router.get('/private/detail/:personalId', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/private/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });     
    } else {
        res.render('v2_en/support/private/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });
    }
});

router.get('/private/modify/:personalId', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/private/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });        
    } else {
        res.render('v2_en/support/private/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });
    }
});

router.get('/reqGames', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/reqGames', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/reqGames', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,0],
            country:req.session.country
        });        
    } else {
        res.render('v2_en/support/reqGames', {
            title: 'Bitweb Support',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,0],
            country:req.session.country
        });
    }
});


module.exports = router;