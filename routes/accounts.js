var express = require('express');
var router = express.Router();
let db = require('../utils/db');
var machUsers = require('../services/users');
var machEthers = require('../services/ethers');
var datetime = require('node-datetime');
var sessionChecker = require('../utils/session');
var dbconfig = require('../config/dbconfig');

router.get('/token', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('account/myTokens', {
        title: 'Bitweb Main',
        id: req.session.userId,
        country: req.session.country,
        pageIdx: req.query.pageIdx,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
    });
});

router.get('/withdraw', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('account/withdraw', {
        title: 'Bitweb Main',
        id: req.session.userId
    });
});

router.get('/deposit', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('account/deposit', {
        title: 'Bitweb Main',
        id: req.session.userId,
        btcAddress: dbconfig.testnet.address.btc,
        etherAddress: dbconfig.testnet.address.ether,
        machAddress: dbconfig.testnet.address.mach
    });
});

router.get('/withdrawPoint', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('account/withdrawPoint', {
        title: 'Bitweb Main',
        id: req.session.userId,
        country: req.session.country
    });
});

router.get('/depositPoint', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('account/depositPoint', {
        title: 'Bitweb Main',
        id: req.session.userId, 
        country: req.session.country,
        machBankAccount:dbconfig.machBankAccount,
        danal_url: dbconfig.danal_url
    });
});

module.exports = router;
