/**
 * 각종 테스트를 위한 라우터
 */
var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var BitwebResponse = require('../utils/BitwebResponse')

router.get('/', function (req, res, next) {
    //res.render('v2_en/login/agreement', {title: 'Bitweb Main'});
});

/** 시작: 회원 가입 페이지 퍼블 수정용 라우팅 **/
router.get('/1', function (req, res, next) {
    res.render('v2/login/agreement', {title: 'Bitweb Main'});
});
router.get('/2', function (req, res, next) {
    res.render('v2/login/existUser', 
    {title: 'Bitweb Main',
    userTag : "test",
    regDate : 20190101
    });
});
router.get('/3', function (req, res, next) {
    res.render('v2/login/login', {title: 'Bitweb Main'});
});
router.get('/4', function (req, res, next) {
    res.render('v2/login/signup', 
    {title: 'Bitweb Main',
    username: '',
    phone: '01012345678',
    birth: 20020202,
    recommander: 'tester',
    total_mach: 1000,
    sex: "남자",
    commId:"test",
    foreigner: "korean",
    pushMarketing: "true",
    countryCode: "KR",
    });
});
router.get('/5', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/login/signupSuccess', {title: 'Bitweb Main'});
    } else if(dbconfig.country == "EN") {
        res.render('v2_en/login/signupSuccess', {title: 'Bitweb Main'});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/login/signupSuccess', {title: 'Bitweb Main'});
    }
});
router.get('/6', function (req, res, next) {
    res.render('v2/login/auth_mail', {title: 'Bitweb Main'});
});
router.get('/7', function (req, res, next) {
    res.render('v2/login/certification');
});
router.get('/temp', function (req, res, next) {
    res.render('v2/temp/temp1',{
        coinId: "",
        userId: "",
        pointId: "",
        userTag: "",
        authPhone: ""
    });
});
/** 끝: 회원 가입 페이지 퍼블 수정용 라우팅 **/

module.exports = router;