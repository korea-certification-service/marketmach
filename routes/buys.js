var express = require('express');
var router = express.Router();
var controllerUsers = require('../controllers/users');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');
var util = require('../utils/util');

router.get('/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/buy/list', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/list', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/buy/list', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/buy/list', util.initParam(req, dbconfig));
    }
});

router.get('/detail/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/buy/view', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/view', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/buy/view', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/buy/view', util.initParam(req, dbconfig));
    }
});

router.get('/register', token.checkLoginAndAdultToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/buy/register', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/register', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/buy/register', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/buy/register', util.initParam(req, dbconfig));
    }
});

router.get('/modify/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/buy/modify', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/modify', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/buy/modify', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/buy/modify', util.initParam(req, dbconfig));
    }
});

router.get('/vtr/:id', token.checkLoginAndAdultToken, function (req, res, next) {
    let id = req.params.id;
    if(dbconfig.country == "KR") {
        res.render('v2/buy/vtr', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/buy/vtr', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/buy/vtr', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/buy/vtr', util.initParam(req, dbconfig));
    }
});

//CHATBOT 용 수정 페이지(사용안함)
// router.get('/chatbot/:country/:itemId', token.checkLoginAndAdultToken, function (req, res, next) {
//     let country = req.params.country;
//     let id = req.params.itemId;
//     let userId = req.query.userId;
//     let userTag = '';

//     if (userId != null) {
//         controllerUsers.getById(country, userId)
//             .then(result => {
//                 userTag = result._doc.userTag;
//                 if(dbconfig.country == "KR") {
//                     res.render('v2/buy/modify', {
//                         title: 'Bitweb Main', 
//                         userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
//                         pointId: req.session.pointId,
//                         id: id, userTag:userTag, country: country,
//                         usePoint:dbconfig.usePoint,
//                         authPhone: req.session.authPhone,
//                         useBlockchain:dbconfig.useBlockchain
//                     });
//                 } else if(dbconfig.country == "POINT") {
//                     res.render('v2_point/buy/modify', {
//                         title: 'Bitweb Main', 
//                         userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
//                         pointId: req.session.pointId,
//                         id: id, userTag:userTag, country: country,
//                         usePoint:dbconfig.usePoint,
//                         authPhone: req.session.authPhone,
//                         useBlockchain:dbconfig.useBlockchain
//                     });         
//                 } else {
//                     res.render('v2_en/buy/modify', {
//                         title: 'Bitweb Main', 
//                         userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
//                         pointId: req.session.pointId,
//                         id: id, userTag:userTag, country: country,
//                         usePoint:dbconfig.usePoint,
//                         authPhone: req.session.authPhone,
//                         useBlockchain:dbconfig.useBlockchain
//                 });
//                 }
//             }).catch((err) => {
//             console.error('err=>', err)
//         })
//     }
// });
module.exports = router;
