/**
 * 약관 동의 및 실명확인 
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var util = require('../utils/util')

//이용약관 페이지
router.get('/use', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/agreements/use', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/agreements/use', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/agreements/use', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/agreements/use', util.initParam(req, dbconfig));
    }
});

//개인정보처리방침 페이지
router.get('/private', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/agreements/private', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT" ){
        res.render('v2_point/agreements/private', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY" ){
        res.render('v2_ont/agreements/private', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/agreements/private', util.initParam(req, dbconfig));
    }
});

//푸시알림/SMS수신 페이지
router.get('/teenager', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/agreements/teenager', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/agreements/teenager', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/agreements/teenager', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/agreements/teenager', util.initParam(req, dbconfig));
    }
});

//마케팅 활용 페이지
router.get('/marketing', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/agreements/marketing', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/agreements/marketing', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/agreements/marketing', util.initParam(req, dbconfig));
    } else {
        res.render('v2_en/agreements/marketing', util.initParam(req, dbconfig));
    }
});



module.exports = router;
