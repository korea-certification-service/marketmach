var express = require('express');
var router = express.Router();
var controllerEthers = require('../controllers/ethers')
var BitwebResponse = require('../utils/BitwebResponse')
// var mqtt = require('../utils/mqtt');

router.get('/:etherId', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();
    if (req.params.etherId != null) {
        controllerEthers.get(req)
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

router.get('/:etherId/price', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();
    if (req.params.etherId != null) {
        controllerEthers.getPrice(req)
            .then(result => {
                bitwebResponse.code = 200;
                bitwebResponse.data = result;
                res.status(200).send(bitwebResponse.create())
            }).catch((err) => {
            console.error('err=>', err)
            res.status(500).send(bitwebResponse.create())
        })
    }

});

router.post('/', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();
    if (req.body.etherId != null) {
        controllerEthers.create(req)
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
})

router.put('/:etherId', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();
    if (req.params.etherId != null) {

        if (req.body.coin != null || req.body.coin != undefined) {

            let controllerEtherHistorys = require('../controllers/etherHistorys');
            let etherId = req.params.etherId;
            let body = req.body;
            let country = req.session.country;

            controllerEtherHistorys.createEtherHistoryByEtherId(country, etherId, body)
                .then(result => {
                    let historyId = result._id;

                    //TODO: test total_coin => historyCoin
                    controllerEthers.updateWithHistory(country, etherId, historyId)
                        .then((result) => {
                            controllerEthers.getEther(country, etherId)
                                .then(result => {
                                    console.log('getEther result=>', result);
                                    //TODO: test json data
                                    let historyCoin = req.body.coin;
                                    let historyCount = result.historys.length;
                                    var jsonData = {};
                                    jsonData['etherId'] = etherId;
                                    jsonData['historyId'] = historyId;
                                    jsonData['coin'] = historyCoin;
                                    jsonData['address'] = result.address;
                                    jsonData['token_address_contract'] = result.token_address_contract;
                                    jsonData['address_count'] = historyCount;
                                    jsonData['total_coin'] = result.total_coin;
                                    jsonData['total_mach'] = result.total_mach;
                                    jsonData['historyCount'] = historyCount;


                                    // mqtt.publishEtherScanSchduler(jsonData)
                                    // mqtt.subscribeEtherScanSchduler(country);

                                    bitwebResponse.code = 200;
                                    bitwebResponse.data = result;
                                    res.status(200).send(bitwebResponse.create())
                                });
                        });
                }).catch((err) => {
                console.error('err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            });
        } else {
            controllerEthers.update(req)
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
    }
});

module.exports = router;
