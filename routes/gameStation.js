/**
 * 게임 스테이션 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var sessionChecker = require('../utils/session');
var token = require('../utils/token');
var util = require('../utils/util');

//게임 스테이션 메인 페이지 
router.get('/', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [0,0];
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/gamestation', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/gamestation', params);         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/gameStation/gamestation', params);         
    } else {
        res.render('v2_en/gameStation/gamestation', params);
    }
});

//게임 스테이션 거래 목록 페이지 
router.get('/trade/list/', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [1,1];
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/tradelist', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/tradelist', params);         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/gameStation/tradelist', params);         
    } else {
        res.render('v2_en/gameStation/tradelist', params);
    }
});

//게임 스테이션 마하로 교환하려는 게임 목록 선택 페이지 
router.get('/trade/assets/', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [1,2];
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/gameassetstomach', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/gameassetstomach', params);         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/gameStation/gameassetstomach', params);         
    } else {
        res.render('v2_en/gameStation/gameassetstomach', params);
    }
});

//게임 스테이션 게임코인->마하 교환 페이지
router.get('/trade/exchange_assets/', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [1,2];
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/exchange_gameassets', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/exchange_gameassets', params);         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/gameStation/exchange_gameassets', params);         
    } else {
        res.render('v2_en/gameStation/exchange_gameassets', params);
    }
});

//게임 스테이션 게임코인으로 교환하려는 게임 목록 선택 페이지 
router.get('/trade/mach/', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [1,3];
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/machtogameassets', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/machtogameassets', params);         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/gameStation/machtogameassets', params);         
    } else {
        res.render('v2_en/gameStation/machtogameassets', params);
    }
});

//게임 스테이션 마하->게임코인 교환 페이지
router.get('/trade/exchange_mach/', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [1,3];
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/exchange_mach', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/exchange_mach', params);         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/gameStation/exchange_mach', params);         
    } else {
        res.render('v2_en/gameStation/exchange_mach', params);
    }
});

//게임 스테이션 마하->게임코인 교환 페이지
router.get('/machAdventure/info/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [2,1];
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/machadventureinfo', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/machadventureinfo', params);         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/gameStation/machadventureinfo', params);         
    } else {
        res.render('v2_en/gameStation/machadventureinfo', params);
    }
});

//사용안함
router.get('/superlanding/info/', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/superlandinginfo', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/superlandinginfo', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,1],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/superlandinginfo', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,1],
            country:req.session.country
        });
    }
});

//마하어드벤처 소개 페이지
router.get('/machAdventure/myGame/',token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [2,2];
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/myMachAdventure', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/myMachAdventure', params);         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/gameStation/myMachAdventure', params);         
    } else {
        res.render('v2_en/gameStation/myMachAdventure', params);
    }
});

//사용안함
router.get('/superlanding/myGame/', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/gameStation/mySuperlanding', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/gameStation/mySuperlanding', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,2],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/gameStation/mySuperlanding', {
            title: 'Bitweb Main',
            userId: req.session.userId,
            coinId: req.session.coinId,
            authPhone: req.session.authPhone,
            pointId: req.session.pointId,
            useBlockchain: dbconfig.useBlockchain,
            usePoint: dbconfig.usePoint,
            userTag: req.session.userTag,
            arrDepth: [3,2],
            country:req.session.country
        });
    }
});

module.exports = router;