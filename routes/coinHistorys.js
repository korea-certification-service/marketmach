var express = require('express');
var router = express.Router();
var controllerCoinHistorys = require('../controllers/coinHistorys')
var BitwebResponse = require('../utils/BitwebResponse')
let dbconfig = require('../config/dbconfig');

router.get('/:historyId/deposit/coinTypes/:coinType', function (req, res, next) {

    console.log('test')
    var bitwebResponse = new BitwebResponse();
    if (req.params.historyId != null) {
        controllerCoinHistorys.getDeposit(req)
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

router.get('/:historyId/withdraw/coinTypes/:coinType', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();
    if (req.params.historyId != null) {
        controllerCoinHistorys.getWithdraw(req)
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

router.get('/:coinId/list', function (req, res, next) {
    let country = dbconfig.country;
    let coinId = req.params.coinId;
    let trade_type = req.query.trade_type;
    let extType = req.query.extType;
    let option = {
        "perPage": 0,
        "pageIdx": 10
    };

    if(trade_type == "event") {
        trade_type = ['deposit','event-signup','event-recommander','event-airdrop', 'exchange-deposit'];
    } else {
        trade_type = ['withdraw','exchange-withdraw']
    }

    let condition = {
        "coinId": coinId,
        "category": trade_type
    }
    if(extType != undefined) {
        condition['extType'] = extType;
    }

    var bitwebResponse = new BitwebResponse();

    controllerCoinHistorys.getCoinHistoryExtByCoinId(country, condition, option)
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
