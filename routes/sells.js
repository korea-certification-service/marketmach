var express = require('express');
var router = express.Router();
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');

router.get('/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/sell/list', {
            userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
            pointId: req.session.pointId,
            category: req.query.category, game_name: req.query.game_name, game_server: req.query.game_server
            , trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/list', {
            userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
            pointId: req.session.pointId,
            category: req.query.category, game_name: req.query.game_name, game_server: req.query.game_server
            , trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    } else {
        res.render('v2_en/sell/list', {
            userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
            pointId: req.session.pointId,
            category: req.query.category, game_name: req.query.game_name, game_server: req.query.game_server
            , trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/detail/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/sell/view', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});

    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/view', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});

    } else {
        res.render('v2_en/sell/view', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
        usePoint:dbconfig.usePoint,
        authPhone: req.session.authPhone,
        useBlockchain:dbconfig.useBlockchain});
    }
});

router.get('/buynow/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/sell/buynow', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/buynow', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});
    } else {
        res.render('v2_en/sell/buynow', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});
    }
});

router.get('/register', token.checkLoginAndAdultToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/sell/register', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/register', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});
    } else {
        res.render('v2_en/sell/register', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
        usePoint:dbconfig.usePoint,
        authPhone: req.session.authPhone,
        useBlockchain:dbconfig.useBlockchain});
    }
});

router.get('/modify/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/sell/modify', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/modify', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});
    } else {
        res.render('v2_en/sell/modify', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
        usePoint:dbconfig.usePoint,
        authPhone: req.session.authPhone,
        useBlockchain:dbconfig.useBlockchain});
    }
});

router.get('/vtr/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/sell/vtr', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/vtr', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain});
    } else {
        res.render('v2_en/sell/vtr', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
        userTag: req.session.userTag, country:req.session.country,pointId: req.session.pointId,
        usePoint:dbconfig.usePoint,
        authPhone: req.session.authPhone,
        useBlockchain:dbconfig.useBlockchain});
    }
});

//CHATBOT 용 수정 페이지
router.get('/chatbot/:country/:itemId', token.checkLoginAndAdultToken, function (req, res, next) {
    let country = req.params.country;
    let id = req.params.itemId;
    let userId = req.query.userId;
    let userTag = '';

    if (userId != null) {
        controllerUsers.getById(country, userId)
            .then(result => {
                userTag = result._doc.userTag;
                if(dbconfig.country == "KR") {
                    res.render('v2/sell/modify', {
                        title: 'Bitweb Main', 
                        id: id, 
                        userId: req.session.userId, 
                        coinId: req.session.coinId,
                        userTag:userTag, 
                        country: country,
                        pointId: req.session.pointId,
                        authPhone: req.session.authPhone,
                        usePoint:dbconfig.usePoint,
                        useBlockchain:dbconfig.useBlockchain
                    });
                } else if(dbconfig.country == "POINT") {
                    res.render('v2_point/sell/modify', {
                        title: 'Bitweb Main', 
                        id: id, 
                        userId: req.session.userId, 
                        coinId: req.session.coinId,
                        userTag:userTag, 
                        country: country,
                        pointId: req.session.pointId,
                        authPhone: req.session.authPhone,
                        usePoint:dbconfig.usePoint,
                        useBlockchain:dbconfig.useBlockchain
                    });       
                } else {
                    res.render('v2_en/sell/modify', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                    userTag:userTag, country: country,pointId: req.session.pointId,
                    authPhone: req.session.authPhone,
                    usePoint:dbconfig.usePoint,
                    useBlockchain:dbconfig.useBlockchain});
                }
            }).catch((err) => {
            console.error('err=>', err)
        })
    }
});

module.exports = router;
