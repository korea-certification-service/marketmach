/**
 * 국가코드 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var controllerCountryCodes = require('../controllers/countryCodes');
var BitwebResponse = require('../utils/BitwebResponse');
const dbconfig = require('../config/dbconfig')

//국가코드 목록 조회
router.get('/', function (req, res, next) {
    let country = dbconfig.country;

    var bitwebResponse = new BitwebResponse();
    controllerCountryCodes.get(country)
        .then(result => {
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

//국가코드 추가
router.post('/add', function (req, res, next) {
    let country = dbconfig.country;
    let reqData = req.body;

    var bitwebResponse = new BitwebResponse();
    controllerCountryCodes.add(country, reqData)
        .then(result => {
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

module.exports = router;
