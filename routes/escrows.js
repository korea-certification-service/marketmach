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
    
    if(coinType == "coin") condition['price'] = {$exists: true};
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
        "item.status":[2,3, 102, 103, 5, 105],
        "completed": false
    }
    var bitwebResponse = new BitwebResponse();
    if(coinType == "point") {
        if(dbconfig.country == 'KR') {
            condition['item.country'] = {$exists:false};
        } else {
            condition['item.country'] = dbconfig.country;
        }
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
                "buy_total_escrow_point": buyEscrow,
                "sell_total_escrow_point": sellEscrow
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
        if(dbconfig.country == 'KR') {
            condition['item.country'] = {$exists:false};
        } else {
            condition['item.country'] = dbconfig.country;
        }
        controllerVtrs.getTradingItems(country, condition)
        .then(vtrs => {
            let buyEscrowBtc = 0;
            let buyEscrowEth = 0;
            let buyEscrowMach = 0;
            let buyEscrowOnt = 0;
            let buyEscrowOng = 0;
            let sellEscrowBtc = 0;
            let sellEscrowEth = 0;
            let sellEscrowMach = 0;
            let sellEscrowOnt = 0;
            let sellEscrowOng = 0;
            
            for(var i in vtrs) {
                if(vtrs[i]._doc.from_userId == userId) {
                    if(vtrs[i]._doc.cryptoCurrencyCode == "BTC") {
                        sellEscrowBtc = parseFloat((sellEscrowBtc + vtrs[i]._doc.price).toFixed(8));
                    } else if(vtrs[i]._doc.cryptoCurrencyCode == "ETH") {
                        sellEscrowEth = parseFloat((sellEscrowEth + vtrs[i]._doc.price).toFixed(8));
                    } else if(vtrs[i]._doc.cryptoCurrencyCode == "MACH") {
                        sellEscrowMach = parseFloat((sellEscrowMach + vtrs[i]._doc.price).toFixed(8));
                    } else if(vtrs[i]._doc.cryptoCurrencyCode == "ONT") {
                        sellEscrowOnt = parseFloat((sellEscrowOnt + vtrs[i]._doc.price).toFixed(8));
                    } else if(vtrs[i]._doc.cryptoCurrencyCode == "ONG") {
                        sellEscrowOng = parseFloat((sellEscrowOng + vtrs[i]._doc.price).toFixed(8));
                    } else {
                        sellEscrowMach = parseFloat((sellEscrowMach + (vtrs[i]._doc.mach == undefined ? 0 : vtrs[i]._doc.mach)).toFixed(8));
                    }
                }

                if(vtrs[i]._doc.to_userId == userId) {
                    if(vtrs[i]._doc.cryptoCurrencyCode == "BTC") {
                        buyEscrowBtc = parseFloat((buyEscrowBtc + vtrs[i]._doc.price).toFixed(8));
                    } else if(vtrs[i]._doc.cryptoCurrencyCode == "ETH") {
                        buyEscrowEth = parseFloat((buyEscrowEth + vtrs[i]._doc.price).toFixed(8));
                    } else if(vtrs[i]._doc.cryptoCurrencyCode == "MACH") {
                        buyEscrowMach = parseFloat((buyEscrowMach + vtrs[i]._doc.price).toFixed(8));
                    } else if(vtrs[i]._doc.cryptoCurrencyCode == "ONT") {
                        buyEscrowOnt = parseFloat((buyEscrowOnt + vtrs[i]._doc.price).toFixed(8));
                    } else if(vtrs[i]._doc.cryptoCurrencyCode == "ONG") {
                        buyEscrowOng = parseFloat((buyEscrowOng + vtrs[i]._doc.price).toFixed(8));
                    } else {
                        buyEscrowMach = parseFloat((buyEscrowMach + (vtrs[i]._doc.mach == undefined ? 0 : vtrs[i]._doc.mach)).toFixed(8));
                    }
                }
            }

            let result = {
                "buy_total_escrow_btc": buyEscrowBtc,
                "buy_total_escrow_eth": buyEscrowEth,
                "buy_total_escrow_mach": buyEscrowMach,
                "buy_total_escrow_ont": buyEscrowOnt,
                "sell_total_escrow_btc": sellEscrowBtc,
                "sell_total_escrow_eth": sellEscrowEth,
                "sell_total_escrow_mach": sellEscrowMach,
                "sell_total_escrow_ont": sellEscrowOnt,
                "buy_total_escrow_ong": buyEscrowOng,
                "sell_total_escrow_ong": sellEscrowOng
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