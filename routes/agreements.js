var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');


router.get('/', function (req, res, next) {
    res.render('agreement/agreement', {title: 'Bitweb Main', danal_url: dbconfig.danal_url});
});

router.get('/use', function (req, res, next) {
    res.render('v2/agreements/use', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
});

router.get('/private', function (req, res, next) {
    res.render('v2/agreements/private', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
});

router.get('/teenager', function (req, res, next) {
    res.render('v2/agreements/teenager', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
});

router.get('/marketing', function (req, res, next) {
    res.render('v2/agreements/marketing', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId, authPhone: req.session.authPhone});
});



module.exports = router;
