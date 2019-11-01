var express = require('express');
var router = express.Router();
var machUsers = require('../services/users');
var sessionChecker=require('../utils/session');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');
const util = require('../utils/util');

router.get('/info', token.checkLoginTokenNoSignIn, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [0,0];
    if(dbconfig.country == "KR") {
        res.render('v2/support/info', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/info', params);       
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/support/info', params);       
    } else{
        res.render('v2_en/support/info', params);
    }
});

router.get('/notice', token.checkLoginTokenNoSignIn, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [1,0];
    if(dbconfig.country == "KR") {
        res.render('v2/support/notice/list', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/notice/list', params);     
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/support/notice/list', params);     
    } else {
        res.render('v2_en/support/notice/list', params);
    }
});

router.get('/notice/detail', token.checkLoginTokenNoSignIn,  function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [1,0];
    if(dbconfig.country == "KR") {
        res.render('v2/support/notice/detail', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/notice/detail', params);    
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/support/notice/detail', params);    
    } else{
        res.render('v2_en/support/notice/detail', params);
    }
});

router.get('/event', token.checkLoginTokenNoSignIn, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [2,0];
    if(dbconfig.country == "KR") {
        res.render('v2/support/event/now', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/event/now', params);       
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/support/event/now', params);       
    } else {
        res.render('v2_en/support/event/now', params);
    }
});

router.get('/event/past', token.checkLoginTokenNoSignIn, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [2,0];
    if(dbconfig.country == "KR") {
        res.render('v2/support/event/past', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/event/past', params);      
    } else {
        res.render('v2_en/support/event/past', params);
    }
});

router.get('/event/detail/:eventId', token.checkLoginTokenNoSignIn, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [2,0];
    if(dbconfig.country == "KR") {
        res.render('v2/support/event/detail', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/event/detail', params);      
    } else {
        res.render('v2_en/support/event/detail', params);
    }
});

router.get('/faq', token.checkLoginTokenNoSignIn, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [3,0];
    if(dbconfig.country == "KR") {
        res.render('v2/support/faq', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/faq', params);        
    } else {
        res.render('v2_en/support/faq', params);
    }
});

router.get('/opposition/register', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [4,1];
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/register', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/opposition/register', params);      
    } else {
        res.render('v2_en/support/opposition/register', params);
    }
});

router.get('/opposition/list', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [4,2];
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/list',params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/opposition/list', params);      
    } else {
        res.render('v2_en/support/opposition/list', params);
    }
});

router.get('/opposition/detail/:oppositionId', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [4,2];
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/view', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/opposition/view', params);        
    } else {
        res.render('v2_en/support/opposition/view', params);
    }
});

router.get('/opposition/modify/:oppositionId', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [4,2];
    if(dbconfig.country == "KR") {
        res.render('v2/support/opposition/modify', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/opposition/modify', params);       
    } else {
        res.render('v2_en/support/opposition/modify', params);
    }
});

router.get('/private/register', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [5,1];
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/register', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/private/register', params);      
    } else {
        res.render('v2_en/support/private/register', params);
    }
});

router.get('/private/list', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [5,2];
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/list', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/private/list', params);       
    } else {
        res.render('v2_en/support/private/list', params);
    }
});

router.get('/private/detail/:personalId', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [5,2];
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/view', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/private/view', params);     
    } else {
        res.render('v2_en/support/private/view', params);
    }
});

router.get('/private/modify/:personalId', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [5,2];
    if(dbconfig.country == "KR") {
        res.render('v2/support/private/modify', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/private/modify', params);        
    } else {
        res.render('v2_en/support/private/modify', params);
    }
});

//사용안함
router.get('/reqGames', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [6,0];
    if(dbconfig.country == "KR") {
        res.render('v2/support/reqGames', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/support/reqGames',params);        
    } else {
        res.render('v2_en/support/reqGames', params);
    }
});


module.exports = router;