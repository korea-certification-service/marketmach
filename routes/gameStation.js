var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var sessionChecker = require('../utils/session');

router.get('/', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/gamestation', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    } else {
        res.render('v2_en/gameStation/gamestation', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    }
});

router.get('/trade/list/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/tradelist', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    } else {
        res.render('v2_en/gameStation/tradelist', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    }
});

router.get('/trade/assets/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/gameassetstomach', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    } else {
        res.render('v2_en/gameStation/gameassetstomach', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    }
});

router.get('/trade/exchange_assets/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/exchange_gameassets', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    } else {
        res.render('v2_en/gameStation/exchange_gameassets', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    }
});

router.get('/trade/mach/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/machtogameassets', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    } else {
        res.render('v2_en/gameStation/machtogameassets', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    }
});

router.get('/trade/exchange_mach/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/exchange_mach', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    } else {
        res.render('v2_en/gameStation/exchange_mach', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    }
});

router.get('/machAdventure/list/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/machadventurelist', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    } else {
        res.render('v2_en/gameStation/machadventurelist', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    }
});

router.get('/machAdventure/info/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/infoboard', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    } else {
        res.render('v2_en/gameStation/infoboard', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint, userTag:req.session.userTag});
    }
});

module.exports = router;