var express = require('express');
var router = express.Router();
var machUsers = require('../services/users');
var sessionChecker=require('../utils/session');
const dbconfig = require('../config/dbconfig');

router.get('/info', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/info', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[0,0]
        });
    } else{
        res.render('v2_en/support/info', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[0,0]
        });
    }
});

router.get('/notice', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/notice/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0]
        });
    } else {
        res.render('v2_en/support/notice/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0]
        });
    }
});

router.get('/notice/detail', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/notice/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            noticeId: req.query.noticeId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0]
        });
    } else{
        res.render('v2_en/support/notice/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            noticeId: req.query.noticeId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0]
        });
    }
});

router.get('/event', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/event/now', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0]
        });
    } else {
        res.render('v2_en/support/event/now', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0]
        });
    }
});

router.get('/event/past', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/event/past', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0]
        });
    } else {
        res.render('v2_en/support/event/past', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0]
        });
    }
});

router.get('/event/detail/:eventId', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/event/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            eventId: req.params.eventId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0]
        });
    } else {
        res.render('v2_en/support/event/detail', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            eventId: req.params.eventId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0]
        });
    }
});

router.get('/faq', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/faq', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[3,0]
        });
    } else {
        res.render('v2_en/support/faq', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[3,0]
        });
    }
});

router.get('/opposition/register', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            itemId: req.query.itemId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,1]
        });
    } else {
        res.render('v2_en/support/opposition/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            itemId: req.query.itemId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,1]
        });
    }
});

router.get('/opposition/list', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2]
        });
    } else {
        res.render('v2_en/support/opposition/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2]
        });
    }
});

router.get('/opposition/detail/:oppositionId', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            oppositionId: req.params.oppositionId,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2]
        });
    } else {
        res.render('v2_en/support/opposition/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            oppositionId: req.params.oppositionId,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2]
        });
    }
});

router.get('/opposition/modify/:oppositionId', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            oppositionId: req.params.oppositionId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2]
        });
    } else {
        res.render('v2_en/support/opposition/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            oppositionId: req.params.oppositionId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2]
        });
    }
});

router.get('/private/register', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,1]
        });
    } else {
        res.render('v2_en/support/private/register', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,1]
        });
    }
});

router.get('/private/list', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2]
        });
    } else {
        res.render('v2_en/support/private/list', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            pageIdx: req.query.pageIdx,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2]
        });
    }
});

router.get('/private/detail/:personalId', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2]
        });
    } else {
        res.render('v2_en/support/private/view', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2]
        });
    }
});

router.get('/private/modify/:personalId', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2]
        });
    } else {
        res.render('v2_en/support/private/modify', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            userTag: req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            personalId: req.params.personalId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2]
        });
    }
});

router.get('/reqGames', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/support/reqGames', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,0]
        });
    } else {
        res.render('v2_en/support/reqGames', {
            title: 'Bitweb Support',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,0]
        });
    }
});


module.exports = router;