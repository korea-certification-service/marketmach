var express = require('express');
var router = express.Router();
let db = require('../utils/db');
var machUsers = require('../services/users');
var machEthers = require('../services/ethers');
var datetime = require('node-datetime');
var sessionChecker=require('../utils/session');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');

// btoc shopping
router.get('/list', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/shopping/btoc_list', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/shopping/btoc_list', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/view', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/shopping/btoc_view', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/shopping/btoc_list', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

module.exports = router;