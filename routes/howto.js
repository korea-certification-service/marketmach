var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');

router.get('/trade/vtr', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/tradevtr', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    }
});

router.get('/trade/buynow', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/tradebuynow', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/tradebuynow', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    }
});

router.get('/buymach/wallet', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/buymachwallet', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/buymachwallet', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    }
});

router.get('/buymach/buy', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/buymachbuy', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/buymachbuy', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    }
});

router.get('/buymach/deposit', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/buymachdeposit', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/buymachdeposit', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});   
    }
});

router.get('/buymach/withdraw', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/buymachwithdraw', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/buymachwithdraw', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    }
});

router.get('/safeTrade/escrow', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/safeTradeescrow', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/safeTradeescrow', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    }
});

router.get('/safeTrade/cuation', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/safeTradecuation', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/safeTradecuation', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    }
});

router.get('/etc/csbot', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/etccsbot', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/etccsbot', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    }
});

router.get('/etc/fee', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/howto/etcfee', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    } else {
        res.render('v2_en/howto/etcfee', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
    }
});

router.get('/trading', function (req, res, next) {
    res.end('trading');
});

router.get('/deposition', function (req, res, next) {
    res.end('deposition');
});

router.get('/opposition', function (req, res, next) {
    res.end('opposition');
});

module.exports = router;
