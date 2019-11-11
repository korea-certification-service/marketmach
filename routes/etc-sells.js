var express = require('express');
var router = express.Router();
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');
var util = require('../utils/util');

router.get('/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/etc-sell/list', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/etc-sell/list', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/etc-sell/list', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/etc-sell/list', util.initParam(req, dbconfig));
    }
});

router.get('/detail/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/etc-sell/view', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/etc-sell/view', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/etc-sell/view', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/etc-sell/view', util.initParam(req, dbconfig));
    }
});

router.get('/register', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/etc-sell/register', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/etc-sell/register', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/etc-sell/register', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/etc-sell/register', util.initParam(req, dbconfig));
    }
});

router.get('/modify/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/etc-sell/modify', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/etc-sell/modify', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/etc-sell/modify', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/etc-sell/modify', util.initParam(req, dbconfig));
    }
});

router.get('/buynow/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/etc-sell/buynow', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/etc-sell/buynow', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/etc-sell/buynow', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/etc-sell/buynow', util.initParam(req, dbconfig));
    }
});

router.get('/vtr/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/etc-sell/vtr', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/etc-sell/vtr', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/etc-sell/vtr', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/etc-sell/vtr', util.initParam(req, dbconfig));
    }
});

//CHATBOT 용 수정 페이지
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
                    res.render('v2/etc-sell/modify', {
                        title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                        userTag: userTag, country: country,
                        pointId: req.session.pointId,
                        authPhone: req.session.authPhone,
                        usePoint:dbconfig.usePoint,
                        useBlockchain:dbconfig.useBlockchain
                    });
                } else if(dbconfig.country == "POINT") {
                    res.render('v2_point/etc-sell/modify', {
                        title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
                        userTag: userTag, country: country,
                        pointId: req.session.pointId,
                        authPhone: req.session.authPhone,
                        usePoint:dbconfig.usePoint,
                        useBlockchain:dbconfig.useBlockchain
                    });         
                } else {
                    res.render('v2_en/etc-sell/modify', {title: 'Bitweb Main', id: id, userId: req.session.userId, coinId: req.session.coinId,
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
        res.render('v2/etc-sell/test_register', {
            title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/etc-sell/test_register', {
            title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });         
    } else {
        res.render('v2_en/etc-sell/test_register', {title: 'Bitweb Main', userId: req.session.userId, coinId: req.session.coinId,
            userTag: req.session.userTag, country:req.session.country,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

module.exports = router;
