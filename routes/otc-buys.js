var express = require('express');
var router = express.Router();
var sessionChecker = require('../utils/session');
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig')

router.get('/', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/list', {
            userId: req.session.userId, coinId: req.session.coinId,pointId: req.session.pointId,userTag:req.session.userTag,
            category: req.query.category, category1: req.query.category1, category2: req.query.category2,
            trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/list', {
            userId: req.session.userId, coinId: req.session.coinId,pointId: req.session.pointId,userTag:req.session.userTag,
            category: req.query.category, category1: req.query.category1, category2: req.query.category2,
            trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });      
    } else {
        res.render('v2_en/otc-buy/list', {
            userId: req.session.userId, coinId: req.session.coinId,pointId: req.session.pointId,userTag:req.session.userTag,
            category: req.query.category, category1: req.query.category1, category2: req.query.category2,
            trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/detail/:id', sessionChecker.sessionChecker2, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/view', {
            title: 'Bitweb Main', id: id, 
            userId: req.session.userId, coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag, country:req.session.country,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/view', {
            title: 'Bitweb Main', id: id, 
            userId: req.session.userId, coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag, country:req.session.country,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });         
    } else {
        res.render('v2_en/otc-buy/view', {
            title: 'Bitweb Main', id: id, 
            userId: req.session.userId, coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag, country:req.session.country,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/register', sessionChecker.sessionChecker2, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/register', {
            title: 'Bitweob Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/register', {
            title: 'Bitweob Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });       
    } else {
        res.render('v2_en/otc-buy/register', {
            title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
    });
    }
});

router.get('/modify/:id', sessionChecker.sessionChecker2, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/modify', {
            title: 'Bitweb Main',id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag:req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/modify', {
            title: 'Bitweb Main',id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag:req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });        
    } else {
        res.render('v2_en/otc-buy/modify', {title: 'Bitweb Main',id: id, userId: req.session.userId, coinId: req.session.coinId,
        userTag:req.session.userTag, country:req.session.country,
        pointId: req.session.pointId,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain});
    }
});

router.get('/vtr/:id', sessionChecker.sessionChecker2, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/vtr', {
            title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/vtr', {
            title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });       
    } else {
        res.render('v2_en/otc-buy/vtr', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain});
    }
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
                if(dbconfig.country == "KR") {
                    res.render('v2/otc-buy/modify', {
                        title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                        userTag:userTag, country: country,
                        pointId: req.session.pointId,
                        authPhone: req.session.authPhone,
                        usePoint:dbconfig.usePoint,
                        useBlockchain:dbconfig.useBlockchain
                    });
                } else if(dbconfig.country == "POINT") {
                    res.render('v2_point/otc-buy/modify', {
                        title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                        userTag:userTag, country: country,
                        pointId: req.session.pointId,
                        authPhone: req.session.authPhone,
                        usePoint:dbconfig.usePoint,
                        useBlockchain:dbconfig.useBlockchain
                    });      
                } else {
                    res.render('v2_en/otc-buy/modify', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                    userTag:userTag, country: country,
                    pointId: req.session.pointId,
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
