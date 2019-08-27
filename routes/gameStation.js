var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var sessionChecker = require('../utils/session');
var token = require('../utils/token');

router.get('/', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/gamestation',{
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [0,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/gamestation', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [0,0],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/gamestation', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [0,0],
            country:req.session.country
        });
    }
});

router.get('/trade/list/', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/tradelist', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            userName: req.session.userName,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/tradelist', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            userName: req.session.userName,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,1],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/tradelist', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            userName: req.session.userName,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,1],
            country:req.session.country
        });
    }
});

router.get('/trade/assets/', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/gameassetstomach', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/gameassetstomach', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,2],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/gameassetstomach', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,2],
            country:req.session.country
        });
    }
});

router.get('/trade/exchange_assets/', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/exchange_gameassets', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/exchange_gameassets', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,2],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/exchange_gameassets', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,2],
            country:req.session.country
        });
    }
});

router.get('/trade/mach/', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/machtogameassets', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,3]
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/machtogameassets', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,3],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/machtogameassets', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,3],
            country:req.session.country
        });
    }
});

router.get('/trade/exchange_mach/', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/exchange_mach', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,3],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/exchange_mach', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,3],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/exchange_mach', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [1,3],
            country:req.session.country
        });
    }
});

router.get('/machAdventure/info/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/machadventureinfo', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [2,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/machadventureinfo', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [2,1],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/machadventureinfo', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [2,1],
            country:req.session.country
        });
    }
});

router.get('/superlanding/info/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/superlandinginfo', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/superlandinginfo', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,1],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/superlandinginfo', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,1],
            country:req.session.country
        });
    }
});

//////
router.get('/machAdventure/myGame/',token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/myMachAdventure', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [2,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/myMachAdventure', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [2,2],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/myMachAdventure', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [2,2],
            country:req.session.country
        });
    }
});

router.get('/superlanding/myGame/', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/mySuperlanding', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/mySuperlanding', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,2],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/mySuperlanding', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,2],
            country:req.session.country
        });
    }
});

module.exports = router;