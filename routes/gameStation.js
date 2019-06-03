var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');

router.get('/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gamestation/gamestation', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    } else {
        //res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    }
});

router.get('/trade/list/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gamestation/tradelist', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    } else {
        //res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    }
});

router.get('/trade/assets/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gamestation/gameassetstomach', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    } else {
        //res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    }
});

router.get('/trade/mach/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gamestation/machtogameassets', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    } else {
        //res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    }
});

router.get('/machAdventure/list/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gamestation/machadventurelist', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    } else {
        //res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    }
});

router.get('/machAdventure/info/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gamestation/infoboard', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    } else {
        //res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone, pointId: req.session.pointId, useBlockchain:dbconfig.useBlockchain, usePoint:dbconfig.usePoint});
    }
});

module.exports = router;