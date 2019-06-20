var express = require('express');
var router = express.Router();
let dbconfig = require('../config/dbconfig');
let controllerEscrow = require('../controllers/escrows');
let controllerPointTrades = require('../controllers/pointTrades');
let controllerVtrs = require('../controllers/vtrs');

var BitwebResponse = require('../utils/BitwebResponse');

router.get('/:userId/list/:coinType', function (req, res, next) {
    let country = dbconfig.country;
    let condition = {
        "reqUser": req.params.userId
    }
    let coinType = req.params.coinType;
    
    if(coinType == "mach") condition['mach'] = {$exists: true};
    if(coinType == "point") condition['point'] = {$exists: true};

    let option = {
        "perPage": 0,
        "pageIdx": 10
    };

    var bitwebResponse = new BitwebResponse();

    controllerEscrow.count(country, condition, option)
    .then(count => {
        controllerEscrow.list(country, condition, option)
        .then(escrows => {
            let result = {
                "count": count,
                "list": escrows
            }
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
})

router.get('/:userId/total_escrow/:coinType', function (req, res, next) {
    let country = dbconfig.country;
    let userId = req.params.userId;
    let coinType = req.params.coinType;
    let condition = {
        $or: [{"from_userId": userId}, {"to_userId": userId}],
        "completed": {$exists: false}
    }
    var bitwebResponse = new BitwebResponse();
    if(coinType == "point") {
        controllerPointTrades.getTradingItems(country, condition)
        .then(pointTrades => {
            let buyEscrow = 0;
            let sellEscrow = 0;
            for(var i in pointTrades) {
                if(pointTrades[i]._doc.from_userId == userId) {
                    sellEscrow = sellEscrow + pointTrades[i]._doc.point;
                }

                if(pointTrades[i]._doc.to_userId == userId) {
                    buyEscrow = buyEscrow + pointTrades[i]._doc.point;
                }
            }

            let result = {
                "buy_total_escrow": buyEscrow,
                "sell_total_escrow": sellEscrow
            }
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())

        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    } else {
        controllerVtrs.getTradingItems(country, condition)
        .then(vtrs => {
            let buyEscrow = 0;
            let sellEscrow = 0;
            for(var i in vtrs) {
                if(vtrs[i]._doc.from_userId == userId) {
                    sellEscrow = sellEscrow + vtrs[i]._doc.mach;
                }

                if(vtrs[i]._doc.to_userId == userId) {
                    buyEscrow = buyEscrow + vtrs[i]._doc.mach;
                }
            }

            let result = {
                "buy_total_escrow": buyEscrow,
                "sell_total_escrow": sellEscrow
            }
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
})

module.exports = router;