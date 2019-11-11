var express = require('express');
var router = express.Router();
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');
var util = require('../utils/util');

router.get('/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/sell/list', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/list', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/sell/list', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/sell/list', util.initParam(req, dbconfig));
    }
});

router.get('/detail/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/sell/view', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/view', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/sell/view', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/sell/view', util.initParam(req, dbconfig));
    }
});

router.get('/buynow/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/sell/buynow', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/buynow', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/sell/buynow', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/sell/buynow', util.initParam(req, dbconfig));
    }
});

router.get('/register', token.checkLoginAndAdultToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/sell/register', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/register', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/sell/register', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/sell/register', util.initParam(req, dbconfig));
    }
});

router.get('/modify/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/sell/modify', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/modify', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/sell/modify', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/sell/modify', util.initParam(req, dbconfig));
    }
});

router.get('/vtr/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/sell/vtr', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/sell/vtr', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/sell/vtr', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/sell/vtr', util.initParam(req, dbconfig));
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
