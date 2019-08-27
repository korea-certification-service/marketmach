var express = require('express');
var router = express.Router();
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');

router.get('/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/buy/list', {
            userId: req.session.userId, coinId: req.session.coinId, pointId: req.session.pointId, userTag:req.session.userTag,
            category: req.query.category, game_name: req.query.game_name, game_server: req.query.game_server, 
            trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/list', {
            userId: req.session.userId, coinId: req.session.coinId, pointId: req.session.pointId, userTag:req.session.userTag,
            category: req.query.category, game_name: req.query.game_name, game_server: req.query.game_server, 
            trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            country:req.session.country
        });         
    } else {
        res.render('v2_en/buy/list', {
            userId: req.session.userId, coinId: req.session.coinId, pointId: req.session.pointId,userTag:req.session.userTag,
            category: req.query.category, game_name: req.query.game_name, game_server: req.query.game_server, 
            trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            country:req.session.country
        });
    }
});

router.get('/detail/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/buy/view', {
            title: 'Bitweb Main', id: id, 
            userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, pointId: req.session.pointId,
            country:req.session.country,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/view', {
            title: 'Bitweb Main', id: id, 
            userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, pointId: req.session.pointId,
            country:req.session.country,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });         
    } else {
        res.render('v2_en/buy/view', {
            title: 'Bitweb Main', id: id, 
            userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, pointId: req.session.pointId,
            country:req.session.country,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain});
    }
});

router.get('/register', token.checkLoginAndAdultToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/buy/register', {
            title: 'Bitweb Main', userId: req.session.userId, 
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag, 
            country:req.session.country,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/register', {
            title: 'Bitweb Main', userId: req.session.userId, 
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag, 
            country:req.session.country,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });         
    } else {
        res.render('v2_en/buy/register', {
            title: 'Bitweb Main', userId: req.session.userId, 
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag, 
            country:req.session.country,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/modify/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/buy/modify', {
            title: 'Bitweb Main', id: id, userId: req.session.userId, 
            coinId: req.session.coinId, pointId: req.session.pointId,
            userTag: req.session.userTag, country:req.session.country,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/modify', {
            title: 'Bitweb Main', id: id, userId: req.session.userId, 
            coinId: req.session.coinId, pointId: req.session.pointId,
            userTag: req.session.userTag, country:req.session.country,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });         
    } else {
        res.render('v2_en/buy/modify', {
            title: 'Bitweb Main', id: id, userId: req.session.userId, 
            coinId: req.session.coinId, pointId: req.session.pointId,
            userTag: req.session.userTag, country:req.session.country,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/vtr/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/buy/vtr', {
            title: 'Bitweb Main', id: id, userId: req.session.userId, 
            coinId: req.session.coinId, pointId: req.session.pointId,
            userTag: req.session.userTag, country:req.session.country,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/vtr', {
            title: 'Bitweb Main', id: id, userId: req.session.userId, 
            coinId: req.session.coinId, pointId: req.session.pointId,
            userTag: req.session.userTag, country:req.session.country,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });         
    } else {
        res.render('v2_en/buy/vtr', {
            title: 'Bitweb Main', id: id, userId: req.session.userId, 
            coinId: req.session.coinId, pointId: req.session.pointId,
            userTag: req.session.userTag, country:req.session.country,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
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
                    res.render('v2/buy/modify', {
                        title: 'Bitweb Main', 
                        userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
                        pointId: req.session.pointId,
                        id: id, userTag:userTag, country: country,
                        usePoint:dbconfig.usePoint,
                        authPhone: req.session.authPhone,
                        useBlockchain:dbconfig.useBlockchain
                    });
                } else if(dbconfig.country == "POINT") {
                    res.render('v2_point/buy/modify', {
                        title: 'Bitweb Main', 
                        userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
                        pointId: req.session.pointId,
                        id: id, userTag:userTag, country: country,
                        usePoint:dbconfig.usePoint,
                        authPhone: req.session.authPhone,
                        useBlockchain:dbconfig.useBlockchain
                    });         
                } else {
                    res.render('v2_en/buy/modify', {
                        title: 'Bitweb Main', 
                        userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
                        pointId: req.session.pointId,
                        id: id, userTag:userTag, country: country,
                        usePoint:dbconfig.usePoint,
                        authPhone: req.session.authPhone,
                        useBlockchain:dbconfig.useBlockchain
                });
                }
            }).catch((err) => {
            console.error('err=>', err)
        })
    }
});
module.exports = router;
