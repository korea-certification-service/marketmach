/**
 * 포인트 내역 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var controllerPointHistorys = require('../controllers/pointHistorys')
var controllerPointBankHistorys = require('../controllers/pointBankHistorys')
var BitwebResponse = require('../utils/BitwebResponse');
var dbconfig = require("../config/dbconfig");

//포인트 입출금 내역 목록 조회
router.get('/:pointId/:accountType', function (req, res, next) {
    let country = dbconfig.country;
    let pointId = req.params.pointId;
    let accountType = req.params.accountType;
    let data = {
        "pointId": pointId,
        "type": accountType
    }
    let option = {
        "perPage": req.query.perPage == undefined ? 20 : parseInt(req.query.perPage),
        "pageIdx": req.query.pageIdx == undefined ? 0 : parseInt(req.query.pageIdx)
    };
    var bitwebResponse = new BitwebResponse();

    controllerPointHistorys.getPointHistorys(country, data, option)
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

//포인트 입출금 내역 상세 조회
router.get('/:historyId', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();
    if (req.params.historyId != null) {
        controllerPointHistorys.get(req)
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
    }

});

//사용 안함
router.get('/search/:userId/:type', function(req, res, next) {
    let bitwebResponse = new BitwebResponse();

    controllerPointBankHistorys.listBankHistorys(req)
        .then(result => {
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create());
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});


module.exports = router;
