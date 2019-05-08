var express = require('express');
var router = express.Router();
let db = require('../utils/db');
var machUsers = require('../services/users');
var machEthers = require('../services/ethers');
var datetime = require('node-datetime');
var sessionChecker = require('../utils/session');
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig')

router.get('/', sessionChecker.adultChecker, function (req, res, next) {
    // res.render('buy/list', {
    //     category: req.query.category, game_name: req.query.game_name, game_server: req.query.game_server
    //     , trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, pageIdx: req.query.pageIdx,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain
    // });
    res.render('v2/buy/list', {
        userId: req.session.userId, coinId: req.session.coinId,
        category: req.query.category, game_name: req.query.game_name, game_server: req.query.game_server, 
        trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain
    });
});

router.get('/detail/:id', sessionChecker.adultChecker, function (req, res, next) {
    let id = req.params.id;
    // res.render('buy/detail', {title: 'Bitweb Main', id: id, userId: req.session.userTag, country:req.session.country,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain});
    res.render('v2/buy/view', {title: 'Bitweb Main', id: id, 
        userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, coinId: req.session.coinId, 
        country:req.session.country,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain});
    
});

router.get('/register', sessionChecker.adultChecker, function (req, res, next) {
    // res.render('buy/register', {title: 'Bitweb Main', userTag: req.session.userTag, country:req.session.country,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain});
    res.render('v2/buy/register', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, 
        country:req.session.country,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain});
});

router.get('/modify/:id', sessionChecker.adultChecker, function (req, res, next) {
    let id = req.params.id;
    // res.render('buy/modify', {title: 'Bitweb Main', id: id, userTag: req.session.userTag, country:req.session.country,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain});
    res.render('v2/buy/modify', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, country:req.session.country,
        usePoint:dbconfig.usePoint,
        authPhone: req.session.authPhone,
        useBlockchain:dbconfig.useBlockchain});
});

router.get('/vtr/:id', sessionChecker.adultChecker, function (req, res, next) {
    let id = req.params.id;
    // res.render('sell/modify', {title: 'Bitweb Main', id: id, userTag: req.session.userTag, country:req.session.country,
    //     usePoint:dbconfig.usePoint,
    //     useBlockchain:dbconfig.useBlockchain});
    res.render('v2/buy/vtr', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, country:req.session.country,
        usePoint:dbconfig.usePoint,
        authPhone: req.session.authPhone,
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
                res.render('v2/buy/modify', {title: 'Bitweb Main', 
                    userId: req.session.userId, coinId: req.session.coinId,
                    id: id, userTag:userTag, country: country,
                    usePoint:dbconfig.usePoint,
                    authPhone: req.session.authPhone,
                    useBlockchain:dbconfig.useBlockchain});
            }).catch((err) => {
            console.error('err=>', err)
        })
    }
});
module.exports = router;
