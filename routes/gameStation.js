var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var sessionChecker = require('../utils/session');

router.get('/', sessionChecker.sessionChecker2, function (req, res, next) {
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
            arrDepth: [0,0]
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
            arrDepth: [0,0]
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
            arrDepth: [0,0]
        });
    }
});

router.get('/trade/list/', function (req, res, next) {
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
            arrDepth: [1,1]
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
            arrDepth: [1,1]
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
            arrDepth: [1,1]
        });
    }
});

router.get('/trade/assets/', function (req, res, next) {
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
            arrDepth: [1,2]
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
            arrDepth: [1,2]
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
            arrDepth: [1,2]
        });
    }
});

router.get('/trade/exchange_assets/', function (req, res, next) {
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
            arrDepth: [1,2]
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
            arrDepth: [1,2]
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
            arrDepth: [1,2]
        });
    }
});

router.get('/trade/mach/', function (req, res, next) {
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
            arrDepth: [1,3]
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
            arrDepth: [1,3]
        });
    }
});

router.get('/trade/exchange_mach/', function (req, res, next) {
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
            arrDepth: [1,3]
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
            arrDepth: [1,3]
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
            arrDepth: [1,3]
        });
    }
});

router.get('/machAdventure/info/', function (req, res, next) {
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
            arrDepth: [2,1]
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
            arrDepth: [2,1]
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
            arrDepth: [2,1]
        });
    }
});

router.get('/superlanding/info/', function (req, res, next) {
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
            arrDepth: [3,1]
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
            arrDepth: [3,1]
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
            arrDepth: [3,1]
        });
    }
});

//////
router.get('/machAdventure/myGame/', function (req, res, next) {
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
            arrDepth: [2,2]
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
            arrDepth: [2,2]
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
            arrDepth: [2,2]
        });
    }
});

router.get('/superlanding/myGame/', function (req, res, next) {
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
            arrDepth: [3,2]
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
            arrDepth: [3,2]
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
            arrDepth: [3,2]
        });
    }
});

module.exports = router;