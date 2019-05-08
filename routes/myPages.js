var express = require('express');
var router = express.Router();
let db = require('../utils/db');
var machUsers = require('../services/users');
var machEthers = require('../services/ethers');
var datetime = require('node-datetime');
var sessionChecker=require('../utils/session');
const dbconfig = require('../config/dbconfig');

router.get('/list', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/mypage', {
        title: 'Bitweb MyPage',
        userId: req.session.userId,
        coinId: req.session.coinId,
        userName: req.session.userName,
        usePoint:dbconfig.usePoint,
        authPhone: req.session.authPhone,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[0,0]
    });
});

router.get('/buy/list', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/mybuylist', {
        title: 'Bitweb MyPage',
        pageIdx: req.query.pageIdx,
        category: req.query.category,
        status: req.query.status,
        item_title: req.query.item_title,
        userId: req.session.userId,
        coinId: req.session.coinId,
        userTag: req.session.userTag,
        usePoint:dbconfig.usePoint,
        authPhone: req.session.authPhone,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[2,0]
    });
});

router.get('/sell/list', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/myselllist', {
        title: 'Bitweb MyPage',
        pageIdx: req.query.pageIdx,
        category: req.query.category,
        status: req.query.status,
        item_title: req.query.item_title,
        userId: req.session.userId,
        coinId: req.session.coinId,
        userTag: req.session.userTag,
        usePoint:dbconfig.usePoint,
        authPhone: req.session.authPhone,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[1,0]
    });
});

router.get('/cancel/list', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/mycancellist', {
        title: 'Bitweb MyPage',
        pageIdx: req.query.pageIdx,
        category: req.query.category,
        item_title: req.query.item_title,
        userId: req.session.userId,
        coinId: req.session.coinId,
        authPhone: req.session.authPhone,
        userTag: req.session.userTag,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[3,0]
    });
});

router.get('/wallet/info', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/walletinfo', {
        title: 'Bitweb Wallet Info',
        userId: req.session.userId,
        coinId: req.session.coinId,
        bitberry_token: req.session.bitberry_token,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[4,1]
    });
});

router.get('/wallet/connect', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/walletconnect', {
        title: 'Bitweb Wallet Info',
        userId: req.session.userId,
        coinId: req.session.coinId,
        authPhone: req.session.authPhone,
        bitberry_token: req.session.bitberry_token,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[4,4]
    });
});

router.get('/wallet/deposit', sessionChecker.sessionChecker2, function (req, res, next) {
    if(req.session.bitberry_token == "") {
        res.render('v2/myPage/walletconnect', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,4]
        });
    } else {
        res.render('v2/myPage/walletdeposit', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            fee: dbconfig.fee.coin.deposit,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,2]
        });
    }
    
});

router.get('/wallet/withdraw', sessionChecker.sessionChecker2, function (req, res, next) {
    if(req.session.bitberry_token == "") {
        res.render('v2/myPage/walletconnect', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,4]
        });
    } else {
        res.render('v2/myPage/walletwithdraw', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            fee: dbconfig.fee.coin.withdraw,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,3]
        });
    }
});

router.get('/point/info', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/point/info', {
        title: 'Bitweb Wallet Info',
        userId: req.session.userId,
        coinId: req.session.coinId,
        pointId: req.session.pointId,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[5,1]
    });
});

router.get('/point/deposit', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/point/deposit', {
        title: 'Bitweb Wallet Deposit',
        userId: req.session.userId,
        coinId: req.session.coinId,
        pointId: req.session.pointId,
        fee: dbconfig.fee.point.deposit,
        happyMoneyFee: dbconfig.fee.happymoney.deposit,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[5,2]
    }); 
});

router.get('/point/withdraw', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/point/withdraw', {
        title: 'Bitweb Point Withdraw',
        userId: req.session.userId,
        coinId: req.session.coinId,
        pointId: req.session.pointId,
        fee: dbconfig.fee.point.withdraw,
        happyMoneyFee: dbconfig.fee.happymoney.deposit,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[5,3]
    }); 
});


router.get('/point/exchange/deposit', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/point/exchange_deposit', {
        title: 'Bitweb Point Exchange',
        userId: req.session.userId,
        coinId: req.session.coinId,
        pointId: req.session.pointId,
        fee: dbconfig.fee.exchange.deposit,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[5,4]
    }); 
});

router.get('/point/exchange/withdraw', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/point/exchange_withdraw', {
        title: 'Bitweb Point Exchange',
        userId: req.session.userId,
        coinId: req.session.coinId,
        pointId: req.session.pointId,
        fee: dbconfig.fee.exchange.deposit,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[5,5]
    }); 
});

router.get('/user/checkPassword', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/mycheckPassword', {
        title: 'Bitweb user info',
        userId: req.session.userId,
        coinId: req.session.coinId,
        authPhone: req.session.authPhone,
        userTag: req.session.userTag,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[6,1]
    });
});

router.get('/user/info', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/myinfo', {
        title: 'Bitweb user info',
        userId: req.session.userId,
        coinId: req.session.coinId,
        authPhone: req.session.authPhone,
        userTag: req.session.userTag,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[6,1]
    });
});

router.get('/user/voucher', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/myvoucher', {
        title: 'Bitweb user grade',
        userId: req.session.userId,
        coinId: req.session.coinId,
        userTag: req.session.userTag,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[6,2]
    });
});

router.get('/user/grade', sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('v2/myPage/mygrade', {
        title: 'Bitweb user grade',
        userId: req.session.userId,
        coinId: req.session.coinId,
        userTag: req.session.userTag,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[6,3]
    });
});

router.get('/myRegisterHistory',sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('myPage/myRegisterHistory', {
        title: 'Bitweb Main',
        id:req.session.userId,
        userTag:req.session.userTag,
        authPhone: req.session.authPhone,
        category:req.query.category,
        pageIdx:req.query.pageIdx,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain});
});

router.get('/myDealHistory',sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('myPage/myDealHistory', {
        title: 'Bitweb Main',
        id:req.session.userId,
        userTag:req.session.userTag,
        authPhone: req.session.authPhone,
        category:req.query.category,
        pageIdx:req.query.pageIdx,
        country:req.session.country,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain});
});

router.get('/myInfo',sessionChecker.sessionChecker2, function (req, res, next) {
    res.render('myPage/myInfo', {
        title: 'Bitweb Main',
        id:req.session.userId,
        userTag:req.session.userTag,
        authPhone: req.session.authPhone,
        country:req.session.country,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain
    });
});

module.exports = router;
