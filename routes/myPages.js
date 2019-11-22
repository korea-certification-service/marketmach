/**
 * 마이 페이지 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
let db = require('../utils/db');
var machUsers = require('../services/users');
var machEthers = require('../services/ethers');
var datetime = require('node-datetime');
var sessionChecker=require('../utils/session');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');
var util = require('../utils/util')

//마이 페이지 호출
router.get('/list', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [0,0];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mypage', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mypage', params);     
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/mypage', params);     
    } else {
        res.render('v2_en/myPage/mypage', params);
    }
});

//마이 페이지 - 구매관리 호출
router.get('/buy/list', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [2,0];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mybuylist', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mybuylist', params);      
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/mybuylist', params);      
    } else {
        res.render('v2_en/myPage/mybuylist', params);
    }
});

//마이 페이지 - 판매 관리 호출
router.get('/sell/list', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [1,0];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/myselllist', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/myselllist', params);     
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/myselllist', params);     
    } else {
        res.render('v2_en/myPage/myselllist', params);
    }
});

//마이 페이지 - 취소 관리 호출
router.get('/cancel/list', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [3,0];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mycancellist', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mycancellist', params);     
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/mycancellist', params);     
    } else {
        res.render('v2_en/myPage/mycancellist', params);
    }
});

//마이 페이지 - 지갑 정보 호출
router.get('/wallet/info', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [4,1];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/walletinfo', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/walletinfo', params);     
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/walletinfo', params);     
    } else {
        res.render('v2_en/myPage/walletinfo', params);
    }
});

//마이 페이지 - 비트베리 연결 호출
router.get('/wallet/connect', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [4,4];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/walletconnect', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/walletconnect', params);       
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/walletconnect', params);       
    } else {
        res.render('v2_en/myPage/walletconnect', params);
    }
});

//마이 페이지 - 암호화페 입금 호출
router.get('/wallet/deposit', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [4,2];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/walletdeposit', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/walletdeposit', params);      
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/walletdeposit', params);      
    } else {
        res.render('v2_en/myPage/walletdeposit', params);
    }
    
});

//마이 페이지 - 암호화폐 출금 호출
router.get('/wallet/withdraw', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [4,3];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/walletwithdraw', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/walletwithdraw', params);
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/walletwithdraw', params);
    } else {
        res.render('v2_en/myPage/walletwithdraw', params);
    }
});

//마이 페이지 - 포인트 정보 호출
router.get('/point/info', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [5,1];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/point/info', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/point/info', params);      
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/point/info', params);      
    } else {
        res.render('v2_en/myPage/point/info', params);
    }
});

//마이 페이지 - 포인트 입금 호출
router.get('/point/deposit', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [5,2];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/point/deposit', params); 
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/point/deposit', params);    
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/point/deposit', params);    
    } else {
        res.render('v2_en/myPage/point/deposit', params); 
    }
});

//마이 페이지 - 포인트 출금 호출
router.get('/point/withdraw', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [5,3];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/point/withdraw', params); 
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/point/withdraw', params);         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/point/withdraw', params);         
    } else {
        res.render('v2_en/myPage/point/withdraw', params); 
    }
});

//마이 페이지 - 패스워드 확인 호출
router.get('/user/checkPassword', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [6,1];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mycheckPassword', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mycheckPassword', params);      
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/mycheckPassword', params);      
    } else {
        res.render('v2_en/myPage/mycheckPassword', params);
    }
});

//마이 페이지 - 회원정보 수정 호출
router.get('/user/info', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [6,1];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/myinfo', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/myinfo', params);        
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/myinfo', params);        
    } else {
        res.render('v2_en/myPage/myinfo', params);
    }
});

//마이 페이지 - 추천 URL 호출
router.get('/user/voucher', token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [6,2];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/myvoucher', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/myvoucher', params);     
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/myvoucher', params);     
    } else {
        res.render('v2_en/myPage/myvoucher', params);
    }
});

//마이 페이지 - 휴대폰 본인 인증 호출
router.get('/user/authPhone',token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [6,3];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/auth_phone', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/auth_phone', params);     
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/auth_phone', params);     
    } else {
        res.render('v2_en/myPage/checkKyc', params);
    }
});

//마이 페이지 - KYC 호출
router.get('/user/kyc',token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [6,3];
    if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/myPage/auth_phone', params);
    } else {
        res.render('v2_en/myPage/auth_phone', params);
    }
});

//마이 페이지 - 우주 대특가 주문 내역 호출
router.get('/product/list',token.checkLoginToken, function (req, res, next) {
    let params = util.initParam(req, dbconfig);
    params['arrDepth'] = [7,1];
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/product/buyer_list', params);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/product/buyer_list', params);
    } else if(dbconfig.country == "ONTOLOGY") {
  
    } else {

    }
});

//사용안함
router.get('/user/grade', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mygrade', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,4],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mygrade', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,4],
            country:req.session.country
        });       
    } else {
        res.render('v2_en/myPage/mygrade', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,4],
            country:req.session.country
        });
    }
});

module.exports = router;
