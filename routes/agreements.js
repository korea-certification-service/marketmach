var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');


router.get('/', function (req, res, next) {
    res.render('agreement/agreement', {title: 'Bitweb Main', danal_url: dbconfig.danal_url});
});

router.get('/use', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/agreements/use', {
            title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId,
            userTag: req.session.userTag, 
            country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else {
        res.render('v2_en/agreements/use', {title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId,
            userTag: req.session.userTag, 
            country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/private', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/agreements/private', {title: 'Bitweb Main', 
        userId: req.session.userId, 
        coinId: req.session.coinId,
        userTag: req.session.userTag, 
        country:req.session.country,
        pointId: req.session.pointId,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain
    });
    } else {
        res.render('v2_en/agreements/private', {title: 'Bitweb Main', 
        userId: req.session.userId, 
        coinId: req.session.coinId,
        userTag: req.session.userTag, 
        country:req.session.country,
        pointId: req.session.pointId,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain
    });
    }
});

router.get('/teenager', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/agreements/teenager', {title: 'Bitweb Main', 
        userId: req.session.userId, 
        coinId: req.session.coinId,
        userTag: req.session.userTag, 
        country:req.session.country,
        pointId: req.session.pointId,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain
    });
    } else {
        res.render('v2_en/agreements/teenager', {title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId,
            userTag: req.session.userTag, 
            country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/marketing', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/agreements/marketing', {title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId,
            userTag: req.session.userTag, 
            country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else {
        res.render('v2_en/agreements/marketing', {title: 'Bitweb Main', 
            userId: req.session.userId, 
            coinId: req.session.coinId,
            userTag: req.session.userTag, 
            country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});



module.exports = router;
