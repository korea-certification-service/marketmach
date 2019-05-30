var express = require('express');
var router = express.Router();
let db = require('../utils/db');
var machUsers = require('../services/users');
var machEthers = require('../services/ethers');
var datetime = require('node-datetime');
var sessionChecker=require('../utils/session');
const dbconfig = require('../config/dbconfig');

// btoc shopping
router.get('/view', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/shopping/btoc_view', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

module.exports = router;