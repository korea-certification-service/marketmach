/**
 * OTC 삽니다 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');
var util = require('../utils/util');

//OTC 삽니다 목록 페이지
router.get('/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/list', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/list', util.initParam(req, dbconfig));      
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-buy/list', util.initParam(req, dbconfig));      
    } else {
        res.render('v2_en/otc-buy/list', util.initParam(req, dbconfig));
    }
});

//OTC 삽니다 상세 페이지
router.get('/detail/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/view', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/view', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-buy/view', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/otc-buy/view', util.initParam(req, dbconfig));
    }
});

//OTC 삽니다 등록 페이지
router.get('/register', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/register', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/register', util.initParam(req, dbconfig));       
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-buy/register', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/otc-buy/register', util.initParam(req, dbconfig));
    }
});

//OTC 삽니다 수정 페이지
router.get('/modify/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/modify', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/modify', util.initParam(req, dbconfig));        
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_point/otc-buy/modify', util.initParam(req, dbconfig));        
    } else {
        res.render('v2_en/otc-buy/modify', util.initParam(req, dbconfig));
    }
});

//OTC 삽니다 VTR 시작 페이지
router.get('/vtr/:id', token.checkLoginToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/otc-buy/vtr', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/otc-buy/vtr', util.initParam(req, dbconfig));       
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/otc-buy/vtr', util.initParam(req, dbconfig));       
    } else {
        res.render('v2_en/otc-buy/vtr', util.initParam(req, dbconfig));
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
                        useBlockchain:dbconfig.useBlockchain
                    });
                }
            }).catch((err) => {
            console.error('err=>', err)
        })
    }
});

module.exports = router;
