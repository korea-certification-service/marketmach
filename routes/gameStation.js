var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');

router.get('/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/gamestation', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    } else {
        //res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    }
});

router.get('/trade', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/trade/list', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    } else {
        //res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    }
});

router.get('/machAdventure', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/machAdventure/list', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    } else {
        //res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    }
});

module.exports = router;