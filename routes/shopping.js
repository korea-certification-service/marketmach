const express = require('express');
const router = express.Router();
let request = require('request');
const dbconfig = require('../config/dbconfig');
const communityController = require('../controllers/community');
var sessionChecker = require('../utils/session');
var token = require('../utils/token');
const BitwebResponse = require('../utils/BitwebResponse');
const utils = require('../utils/util');

// btoc shopping
router.get('/list', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/shopping/btoc_list', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/shopping/btoc_list', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/view', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/shopping/btoc_view', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/shopping/btoc_list', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain
        });
    }
});

router.get('/view/:productId', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/shopping/btoc_view', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            productId: req.params.productId,
            country: dbconfig.country,
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/shopping/btoc_list', {
            title: 'Bitweb Shopping',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            itemid: req.params.itemid,
            country: dbconfig.country,
        });
    }
});


/*** API CALL ***/
// 상품리스트
router.post('/product/list', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.APIServer + "/v2/shops/product/list";
    let country = dbconfig.country;
    if(country != "KR") req.body['country'] = country;
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = req.body;
    body.param = {country: country}
    
    request({uri: url, 
            method:'POST',
            headers: header,
            body:body,
            json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

// 상품 상세/구매 페이지
router.get('/product/detail/:productId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let productId = req.params.productId;
    let userTag = req.session.userTag == "" ? undefined : req.session.userTag;

    let url = dbconfig.APIServer + "/v2/shops/product/" + productId;
    let header = { 
        'token': dbconfig.APIToken
    };
    
    request({uri: url, 
            method:'GET',
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

// 상품 구매 처리
router.post('/product/buy', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.APIServer + "/v2/shops/product/buy";
    let country = dbconfig.country;
    if(country != "KR") req.body['country'] = country;
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = req.body;
    
    request({uri: url, 
            method:'POST',
            headers: header,
            body:body,
            json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

// 상품 구매 확인 페이지
router.post('/buyer/list', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.APIServer + "/v2/shops/buyer/list";
    let country = dbconfig.country;
    if(country != "KR") req.body['country'] = country;
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = req.body;
    body.param = {country: country}
    console.log("###########body", body)

    request({uri: url, 
            method:'POST',
            headers: header,
            body:body,
            json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

module.exports = router;