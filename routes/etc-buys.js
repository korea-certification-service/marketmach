var express = require('express');
var router = express.Router();
var sessionChecker = require('../utils/session');
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig')

router.get('/', sessionChecker.sessionChecker2, function (req, res, next) {
    // res.render('etc-buy/list', { category:req.query.category,  trade_type: req.query.trade_type, title: req.query.title, pageIdx: req.query.pageIdx,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain
    // });
    res.render('v2/etc-buy/list', {
        userId: req.session.userId, coinId: req.session.coinId,
        category: req.query.category, category1: req.query.category1, category2: req.query.category2,
        trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain
    });
});

router.get('/detail/:id', sessionChecker.sessionChecker2, function (req, res, next) {
    let id = req.params.id;
    // res.render('etc-buy/detail', {title: 'Bitweb Main', id: id, userId: req.session.userTag, country:req.session.country,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain});
    res.render('v2/etc-buy/view', {title: 'Bitweb Main', id: id, 
        userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, country:req.session.country,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain});
});

router.get('/register', sessionChecker.sessionChecker2, function (req, res, next) {
    // res.render('etc-buy/register', {title: 'Bitweb Main', userTag: req.session.userTag, country:req.session.country,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain});
    res.render('v2/etc-buy/register', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, country:req.session.country,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain});
});

router.get('/modify/:id', sessionChecker.sessionChecker2, function (req, res, next) {
    let id = req.params.id;
    // res.render('etc-buy/modify', {title: 'Bitweb Main',id: id, userTag:req.session.userTag, country:req.session.country,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain});
    res.render('v2/etc-buy/modify', {title: 'Bitweb Main',id: id, userId: req.session.userId, coinId: req.session.coinId,
        userTag:req.session.userTag, country:req.session.country,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain});
});

router.get('/vtr/:id', sessionChecker.adultChecker, function (req, res, next) {
    let id = req.params.id;
    // res.render('sell/modify', {title: 'Bitweb Main', id: id, userTag: req.session.userTag, country:req.session.country,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain});
    res.render('v2/etc-buy/vtr', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, country:req.session.country,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain});
});

//CHATBOT 용 수정 페이지
router.get('/chatbot/:country/:itemId', function (req, res, next) {
    let country = req.params.country;
    let id = req.params.itemId;
    let userId = req.query.userId;
    let userTag = '';

    if (userId != null) {
        controllerUsers.getById(country, userId)
            .then(result => {
                userTag = result._doc.userTag;
                res.render('v2/etc-buy/modify', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                    userTag:userTag, country: country,
                    authPhone: req.session.authPhone,
                    usePoint:dbconfig.usePoint,
                    useBlockchain:dbconfig.useBlockchain});
            }).catch((err) => {
            console.error('err=>', err)
        })
    }
});

module.exports = router;