var express = require('express');
var router = express.Router();
var sessionChecker = require('../utils/session');
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');
const util = require('../utils/util');

router.get('/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    var util = require('../utils/util');
    if(dbconfig.country == "KR") {
        res.render('v2/otc-sell/list', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-sell/list', util.initParam(req, dbconfig));        
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-sell/list', util.initParam(req, dbconfig));        
    } else {
        res.render('v2_en/otc-sell/list', util.initParam(req, dbconfig));
    }
});

router.get('/detail/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-sell/view', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-sell/view', util.initParam(req, dbconfig));       
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-sell/view', util.initParam(req, dbconfig));        
    } else {
        res.render('v2_en/otc-sell/view', util.initParam(req, dbconfig));
    }
});

router.get('/register', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/otc-sell/register', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-sell/register', util.initParam(req, dbconfig));      
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-sell/register', util.initParam(req, dbconfig));      
    } else {
        res.render('v2_en/otc-sell/register', util.initParam(req, dbconfig));
    }
});

router.get('/modify/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-sell/modify', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-sell/modify', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-sell/modify', util.initParam(req, dbconfig));      
    } else {
        res.render('v2_en/otc-sell/modify', util.initParam(req, dbconfig));
    }
});

router.get('/buynow/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-sell/buynow', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-sell/buynow', util.initParam(req, dbconfig));        
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-sell/buynow', util.initParam(req, dbconfig));      
    } else {
        res.render('v2_en/otc-sell/buynow', util.initParam(req, dbconfig));
    }
});

router.get('/buynow/point/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-sell/buynow_point', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-sell/buynow_point', util.initParam(req, dbconfig));        
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-sell/buynow_point', util.initParam(req, dbconfig));      
    } else {
        res.render('v2_en/otc-sell/buynow_point', util.initParam(req, dbconfig));
    }
});

router.get('/vtr/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-sell/vtr', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-sell/vtr', util.initParam(req, dbconfig));       
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-sell/vtr', util.initParam(req, dbconfig));      
    } else {
        res.render('v2_en/otc-sell/vtr', util.initParam(req, dbconfig));
    }
});

//CHATBOT 용 수정 페이지(사용안함)
router.get('/chatbot/:country/:itemId', token.checkLoginToken, function (req, res, next) {
    let country = req.params.country;
    let id = req.params.itemId;
    let userId = req.query.userId;
    let userTag = '';

    if (userId != null) {
        controllerUsers.getById(country, userId)
            .then(result => {
                userTag = result._doc.userTag;
                if(dbconfig.country == "KR") {
                    res.render('v2/otc-sell/modify', {
                        title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                        userTag: userTag, country: country,
                        pointId: req.session.pointId,
                        authPhone: req.session.authPhone,
                        usePoint:dbconfig.usePoint,
                        useBlockchain:dbconfig.useBlockchain
                    });
                } else if(dbconfig.country == "POINT") {
                    res.render('v2_point/otc-sell/modify', {
                        title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                        userTag: userTag, country: country,
                        pointId: req.session.pointId,
                        authPhone: req.session.authPhone,
                        usePoint:dbconfig.usePoint,
                        useBlockchain:dbconfig.useBlockchain
                    });       
                } else {
                    res.render('v2_en/otc-sell/modify', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                        userTag: userTag, country: country,
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

router.get('/registers', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/otc-sell/test_register', {
            title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-sell/test_register', {
            title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });        
    } else {
        res.render('v2_en/otc-sell/test_register', {
            title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
    });
    }
});

module.exports = router;
