var express = require('express');
var router = express.Router();
var controllerCoins = require('../controllers/coins')
var controllerCoinHistorys = require('../controllers/coinHistorys');
var controllerEventHistorys = require('../controllers/events');
var controllerUsers = require('../controllers/users');
var controllerFeeHistorys = require('../controllers/feeHistorys');
var BitwebResponse = require('../utils/BitwebResponse')
var mqtt = require('../utils/mqtt');
var unixtime = require('unix-timestamp');
var util = require('../utils/util');
var request = require('request');
let dbconfig = require('../config/dbconfig');
var Ont = require('ontology-ts-sdk');
let scheduler = require('../utils/scheduler');

router.get('/airdrop', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.bitberry.url + "/v2/wallets/pzmza7r3je/airdrop_by_user_id";
    let header = {
        'Authorization': 'Bearer ' + dbconfig.bitberry.apiKey
    };
    let param = {
        'wallet_id':'pzmza7r3je',
        'amount': 1,
        'memo':'airdrop from mach',
        'user_id': req.query.user_id
    };

    console.log('airdrop event param : ', param);

    request({uri: url, 
            method:'POST',
            form: param, 
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            let result = JSON.parse(body);
            console.log('airdrop event success : ', body);
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('airdrop event error = ' + response);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create())    
        }
    });
});

router.get('/:coinId', function (req, res, next) {
    // res.send('respond with a resource');

    var bitwebResponse = new BitwebResponse();
    if (req.params.coinId != null) {
        controllerCoins.get(req)
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

router.get('/:coinId/deposit/historys', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();

    if (req.params.coinId != null) {

        let country = req.session.country
        let pageIdx = req.query.pageIdx;
        let perPage = req.query.perPage;

        if (pageIdx != undefined) pageIdx = parseInt(pageIdx);
        if (perPage != undefined) perPage = parseInt(perPage);

        let initPageIdx = pageIdx;
        let initPerPage = perPage;
        let historys = []

        controllerCoins.get(req)
            .then(result => {

                if (result.ether_historys.length <= 0 && result.mach_historys.length <=0 && result.btc_historys.length <= 0) {

                    var err = "historys is empty !"
                    console.error('err=>', err)
                    bitwebResponse.code = 403;
                    bitwebResponse.message = err;
                    res.status(403).send(bitwebResponse.create())
                } else {

                    let ether_historys = [];
                    let mach_historys = [];
                    let btc_historys = [];

                    if (result.ether_historys != undefined) ether_historys = result.ether_historys;
                    if (result.mach_historys != undefined) mach_historys = result.mach_historys;
                    if (result.btc_historys != undefined) btc_historys = result.btc_historys;

                    controllerCoinHistorys.getDepositHistorys(country, ether_historys, "ether")
                        .then(result => {
                            // result['_doc']['type'] = "ether"

                            if (result != undefined) historys.push.apply(historys, result)

                            controllerCoinHistorys.getDepositHistorys(country, mach_historys, "mach")
                                .then(result => {
                                    // result['_doc']['type'] = "mach"
                                    // console.log('ether=>', result)
                                    if (result != undefined) historys.push.apply(historys, result)

                                    controllerCoinHistorys.getDepositHistorys(country, btc_historys, "btc")
                                        .then(result => {
                                            // result['_doc']['type'] = "btc"
                                            // console.log('ether=>', result)
                                            if (result != undefined) historys.push.apply(historys, result)

                                            controllerEventHistorys.getDepositHistorys(country, req.session.userTag)
                                                .then(result => {
                                                    
                                                    if (result != undefined) historys.push.apply(historys, result)

                                                    historys.sort((first, second) => {
                                                        return parseFloat(unixtime.fromDate(second.regDate)) - parseFloat(unixtime.fromDate(first.regDate))
                                                    })


                                                    if (pageIdx == undefined) {
                                                        pageIdx = 0
                                                        initPageIdx = pageIdx
                                                    }
                                                    if (perPage == undefined) {
                                                        perPage = 5
                                                        initPerPage = perPage
                                                    }

                                                    if (pageIdx != 0) pageIdx = pageIdx * perPage
                                                    perPage = pageIdx + perPage

                                                    historys = historys.slice(pageIdx, perPage)

                                                    let jsonResult = {}
                                                    jsonResult['historys'] = historys;
                                                    jsonResult['pageIdx'] = initPageIdx;
                                                    jsonResult['perPage'] = initPerPage;

                                                    console.log('jsonResult=>', jsonResult)
                                                    bitwebResponse.code = 200;
                                                    bitwebResponse.data = jsonResult;
                                                    res.status(200).send(bitwebResponse.create())
                                                });
                                        })
                                })
                        }).catch((err) => {
                        console.error('err=>', err)
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create())
                    })
                }
            }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }

});

router.get('/:coinId/withdraw/historys', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();

    if (req.params.coinId != null) {

        let country = req.session.country
        let pageIdx = req.query.pageIdx;
        let perPage = req.query.perPage;

        if (pageIdx != undefined) pageIdx = parseInt(pageIdx);
        if (perPage != undefined) perPage = parseInt(perPage);

        let initPageIdx = pageIdx;
        let initPerPage = perPage;
        let historys = []

        controllerCoins.get(req)
            .then(result => {

                if (result.ether_withdraw_historys.length <= 0 && result.mach_withdraw_historys.length <=0 && result.btc_withdraw_historys.length <= 0) {

                    var err = "historys is empty !"
                    console.error('err=>', err)
                    bitwebResponse.code = 403;
                    bitwebResponse.message = err;
                    res.status(403).send(bitwebResponse.create())
                } else {
                    let ether_historys = []
                    let mach_historys = []
                    let btc_historys = []

                    if (result.ether_withdraw_historys != undefined) ether_historys = result.ether_withdraw_historys;
                    if (result.mach_withdraw_historys != undefined) mach_historys = result.mach_withdraw_historys;
                    if (result.btc_withdraw_historys != undefined) btc_historys = result.btc_withdraw_historys;

                    controllerCoinHistorys.getWithdrawHistorys(country, ether_historys, "ether")
                        .then(result => {
                            // result['_doc']['type'] = "ether"
                            // console.log('ether=>', result)
                            if (result != undefined) historys.push.apply(historys, result)

                            controllerCoinHistorys.getWithdrawHistorys(country, mach_historys, "mach")
                                .then(result => {
                                    // result['_doc']['type'] = "mach"
                                    // console.log('ether=>', result)
                                    if (result != undefined) historys.push.apply(historys, result)

                                    controllerCoinHistorys.getWithdrawHistorys(country, btc_historys, "btc")
                                        .then(result => {
                                            // result['_doc']['type'] = "btc"
                                            // console.log('ether=>', result)
                                            if (result != undefined) historys.push.apply(historys, result)

                                            // compareDate(historys)
                                            historys.sort((first, second) => {
                                                return parseFloat(unixtime.fromDate(second.regDate)) - parseFloat(unixtime.fromDate(first.regDate))
                                            })

                                            if (pageIdx == undefined) {
                                                pageIdx = 0
                                                initPageIdx = pageIdx
                                            }
                                            if (perPage == undefined) {
                                                perPage = 5
                                                initPerPage = perPage
                                            }

                                            if (pageIdx != 0) pageIdx = pageIdx * perPage
                                            perPage = pageIdx + perPage

                                            historys = historys.slice(pageIdx, perPage)

                                            let jsonResult = {}
                                            jsonResult['historys'] = historys;
                                            jsonResult['pageIdx'] = initPageIdx;
                                            jsonResult['perPage'] = initPerPage;

                                            console.log('jsonResult=>', jsonResult)
                                            bitwebResponse.code = 200;
                                            bitwebResponse.data = jsonResult;
                                            res.status(200).send(bitwebResponse.create())

                                        })
                                })
                        }).catch((err) => {
                        console.error('err=>', err)
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create())
                    })
                }
            }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }
});

function compareDate(historys, left, right) {

    let pivot = unixtime.fromDate(historys[left].regDate);
    let low = left + 1;
    let high = right;

    while (low <= high) {
        while (pivot >= unixtime.fromDate(historys[low].regDate) && low <= right) low ++
        while (pivot <= unixtime.fromDate(historys[high].regDate) && high >= left+1) high --

        if (low <= high) Swap(historys, low, high)

    }
    Swap(historys, left, high)


    return high;
}

function Sort(historys, left, right) {
    if (left <= right) {
        let pivot = compareDate(historys, left, right);
        Sort(historys, left, pivot - 1)
        Sort(historys, pivot + 1, right)
    }
}

function Swap(historys, first, second) {
    let tmp = historys[first]
    historys[first] = historys[second];
    historys[second] = tmp;
}

router.post('/', function (req, res, next) {

    let sampleJson =
        {
            "userId": "123",
            "mach_address": "asdf",
            "btc_address": "qewr",
            "ether_address": "zxcv",
            "total_mach": 0,
        }

    if (req.body.userId != null) {

        let data = {}

        var bitwebResponse = new BitwebResponse();
        controllerCoins.create(req)
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
router.put('/:coinId', function (req, res, next) {

    // "coinId": "5bc9a10b8f8b950ffe068df9"
    let sampleJson =
        {
            "userId": "5bc9a10de399867b00e2e30f",
            "mach_address": "asdf",
            "btc_address": "qewr",
            "ether_address": "zxcv"
        }

    let controllerCoins = require('../controllers/coins');

    var bitwebResponse = new BitwebResponse();
    let country = req.session.country;

    if (req.params.coinId != null) {

        let coinId = req.params.coinId;
        let body = req.body;

        controllerCoins.updateById(country, coinId, body)
            .then((result) => {

                let data = {}
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

router.put('/:coinId/deposit/coinTypes/:coinType', function (req, res, next) {

    /**
     * coinType: btc, ether, mach
     * price : mach를 btc, ether, mach로 환산된 금액 (유저가 지불할 금액)
     * mach : 입금 요청할 mach
     * */
    let sampleJson =
        {
            "price": 10,
            "mach": 20,
            "address": "test"
        }

    var bitwebResponse = new BitwebResponse();
    if (req.params.coinId != null && req.params.coinType != null) {

        if (req.body.price != null) {

            let coinId = req.params.coinId;
            let coinType = req.params.coinType;
            let mach = req.body.mach;
            let price = req.body.price;
            let address = req.body.address
            let country = req.session.country;

            controllerCoinHistorys.createCoinHistoryByCoinId(country, coinId, req)
                .then(result => {
                    let historyId = result._id;

                    //TODO: test total_coin => historyCoin
                    controllerCoins.updateWithHistory(country, coinType, coinId, historyId)
                        .then((result) => {
                            controllerCoins.getByCoinId(country, coinId)
                                .then(result => {
                                    console.log('getCoin result=>', result);
                                    let jsonData = {};
                                    let historyPrice = price;
                                    let historyCount = 0;

                                    if (coinType == "ether") {
                                        console.log('result.ether_historys.length=>', result._doc.ether_historys.length)
                                        if (result.ether_historys.length > 0) {
                                            historyCount = result.ether_historys.length;
                                            // for (var i = 0; i < result.btc_historys.length; i++) {
                                            //     historyCount++;
                                            // }
                                        }

                                    } else if (coinType == "btc") {
                                        console.log('result.btc_historys.length=>', result._doc.btc_historys.length)
                                        if (result.btc_historys.length > 0) {
                                            historyCount = result.btc_historys.length
                                            // for (var i = 0; i < result.btc_historys.length; i++) {
                                            //     historyCount++;
                                            // }
                                        }
                                    } else if (coinType == "mach") {
                                        console.log('result.mach_historys.length=>', result.mach_historys.length)
                                        if (result.mach_historys.length > 0) {

                                            historyCount = result.mach_historys.length
                                            // for (var i = 0; i < result.mach_historys.length; i++) {
                                            //     historyCount++;
                                            // }
                                        }
                                    }

                                    jsonData['coinId'] = coinId;
                                    jsonData['historyId'] = historyId;
                                    jsonData['type'] = coinType;
                                    jsonData['price'] = historyPrice;
                                    jsonData['history_count'] = historyCount;
                                    jsonData['address'] = address
                                    jsonData['ether_address'] = result.ether_address;
                                    jsonData['mach_address'] = result.mach_address;
                                    // jsonData['btc_address'] = result.btc_address;
                                    jsonData['btc_address'] = address;
                                    jsonData['mach'] = mach;
                                    jsonData['total_mach'] = result.total_mach;
                                    jsonData['country'] = country;

                                    bitwebResponse.code = 200;
                                    bitwebResponse.data = result;
                                    res.status(200).send(bitwebResponse.create())

                                    if (jsonData['type'] == "btc") {
                                        mqtt.btcJob(jsonData)
                                    } else {
                                        mqtt.DepositJob(jsonData)
                                    }

                                });
                        });
                }).catch((err) => {
                console.error('err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            });
        }
    }
});

router.put('/:coinId/withdraw/coinTypes/:coinType', function (req, res, next) {

    /**
     * coinType: btc, ether, mach
     * price : mach를 btc, ether, mach로 환산된 금액 (유저가 받아갈 금액)
     * mach : 출금 요청할 mach
     * address : user address
     * */
    let sampleJson =
        {
            "price": 10,
            "mach": 20,
            "address": "0xdC76866e2457a7fafB7E55BbB84b14C4DdCCA42c"
        }

    var bitwebResponse = new BitwebResponse();
    if ((req.params.coinId != null) && (req.params.coinType != null)) {

        let coinId = req.params.coinId;
        let coinType = req.params.coinType;
        let address = req.body.address;
        let mach = req.body.mach;
        let price = req.body.price;
        let country = req.session.country;

        if (coinType == "ether" || coinType == "mach") {

            let ethereumWeb3 = require('../utils/ethereumWeb3');

            let data = {}
            data['type'] = coinType;
            data['price'] = price;
            data['address'] = address;

            ethereumWeb3.withDraw(data)
                .then(transaction => {
                    console.log('withDraw() =>', transaction);
                    let data = {}
                    data['coinType'] = coinType;
                    data['mach'] = mach;
                    data['price'] = price;
                    data['address'] = address;
                    data['transaction'] = transaction;

                    controllerCoinHistorys.createCoinWithdrawHistoryByCoinId(country, coinId, data)
                        .then(result => {

                            let historyId = result._id;
                            console.log('historyId->', historyId);

                            controllerCoins.updateWithWithdrawHistory(country, coinType, coinId, historyId)
                                .then((result) => {
                                    controllerCoins.getByCoinId(country, coinId)
                                        .then(result => {
                                            console.log('getCoin result=>', result);

                                            let jsonData = {}
                                            jsonData['coinId'] = coinId;
                                            jsonData['historyId'] = historyId;
                                            jsonData['type'] = coinType + "_withdraw";
                                            jsonData['price'] = price;
                                            jsonData['address'] = address;
                                            jsonData['transaction'] = transaction;
                                            jsonData['mach'] = mach;
                                            jsonData['total_mach'] = result.total_mach;

                                            mqtt.WithdrawJob(jsonData)

                                            bitwebResponse.code = 200;
                                            bitwebResponse.data = result;
                                            res.status(200).send(bitwebResponse.create())

                                        }).catch(err => {
                                        console.log('err=>', err);
                                    })

                                }).catch((err => {
                                console.error('err=>', err)
                            }))
                        })
                })
        } else if (coinType == "btc") {
            let bitcore_lib = require('../utils/bitcore_lib');
            bitcore_lib.sendBtcTransaction(req.body)
                .then(transaction => {
                    console.log('sendBtcTransaction() =>', transaction);
                    let data = {}
                    data['coinType'] = coinType;
                    data['mach'] = mach;
                    data['price'] = price;
                    data['address'] = address;
                    data['transaction'] = transaction;

                    controllerCoinHistorys.createCoinWithdrawHistoryByCoinId(country, coinId, data)
                        .then(result => {

                            let historyId = result._id;
                            console.log('historyId->', historyId);

                            controllerCoins.updateWithWithdrawHistory(country, coinType, coinId, historyId)
                                .then((result) => {
                                    controllerCoins.getByCoinId(country, coinId)
                                        .then(result => {
                                            console.log('getCoin result=>', result);

                                            let jsonData = {}
                                            jsonData['coinId'] = coinId;
                                            jsonData['historyId'] = historyId;
                                            jsonData['type'] = coinType + "_withdraw";
                                            jsonData['price'] = price;
                                            jsonData['address'] = address;
                                            jsonData['transaction'] = transaction;
                                            jsonData['mach'] = mach;
                                            jsonData['total_mach'] = result.total_mach;
                                            jsonData['country'] = country;


                                            mqtt.WithdrawBtcJob(jsonData)

                                            bitwebResponse.code = 200;
                                            bitwebResponse.data = result;
                                            res.status(200).send(bitwebResponse.create())

                                        }).catch(err => {
                                        console.log('err=>', err);
                                    })

                                }).catch((err => {
                                console.error('err=>', err)
                            }))
                        })
                })

        } else {
            console.log("coinType undefined!")
        }
    }
});

router.delete('/:coinId', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();
    if (req.params.coinId != null) {
        controllerCoins.remove(req)
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


//비트베리 API - 인증 번호 요청
router.post('/connect', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    let url = dbconfig.bitberry.url + "/v2/users/connect";
    let header = {
        'Authorization': 'Bearer ' + dbconfig.bitberry.apiKey,
        'Content-Type': 'application/json'
    };
    let country = dbconfig.country;
    let userTag = req.session.userTag == undefined ? req.body.userTag : req.session.userTag;
    
    controllerUsers.getByUserTag(country, userTag)
        .then(result => {
            let phone = (result._doc.phone.substring(0,1) == "0") ? result._doc.phone.substr(1) : result._doc.phone;
            let param = {
                "third_party_uid": result._doc._id.toString(),
                "phone_number": result._doc.countryCode + phone
            };
            
            request({uri: url, 
                    method:'POST',
                    form: param, 
                    headers: header}, function (error, response, body) {
                if (!error && response.statusCode == 201) {
                    let result = JSON.parse(body);
                    console.log('success : ', body);
                    bitwebResponse.code = 200;
                    bitwebResponse.data = result;
                    res.status(200).send(bitwebResponse.create())
                } else {
                    console.log('error = ' + response.statusCode, error);
                    bitwebResponse.code = 500;
                    bitwebResponse.message = error;
                    res.status(500).send(bitwebResponse.create());
                }
            });
    });
});

//비트베리 API - 인증 번호 전송
router.post('/connected', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.bitberry.url + "/v2/users/connected?code=" + req.body.code;
    let header = {
        'Authorization': 'Bearer ' + dbconfig.bitberry.apiKey
    };
    let country = dbconfig.country;
    let userTag = req.session.userTag == undefined ? req.body.userTag : req.session.userTag;
    
    request({uri: url, 
            method:'GET',
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 200) {            
            let result = JSON.parse(body);
            if(result.status == "not_agreed") {
                let message = "비트베리 연동이 완료되지 않았습니다.\n 비트베리 엡에서 인증번호 등록 후 비트베리 연결 완료 버튼을 클릭하세요.";
                if(country == "EN") {
                    message = "BitBerry connection is not complete.\nClick the button after registering the authentication number in BitBerry App.";
                }
                bitwebResponse.code = 200;
                bitwebResponse.data = {
                    "code":"E001",
                    "msg": message
                };
                res.status(200).send(bitwebResponse.create());
                return;
            }
            console.log('success : ', body);
            //users에 token 저장
            if(result != null) {
                let data = {
                    "bitberry_token": result.token,
                    "bitberry_user_id": result.bitberry_user_id
                }
                controllerUsers.updateByUserTag(country, userTag, data)
                    .then(() => {
                        req.session.bitberry_token = result.token;
                        bitwebResponse.code = 200;
                        bitwebResponse.data = result;
                        res.status(200).send(bitwebResponse.create())
                    }).catch((err) => {
                        console.error('err=>', err)
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create())
                    });
                } else {
                    let data = {
                        "code":"E001",
                        "msg": "비트베리 연동이 완료되지 않았습니다.\n 비트베리 엡에서 인증번호 등록 후 비트베리 연결 완료 버튼을 클릭하세요."
                    }
                    bitwebResponse.code = 200;
                    bitwebResponse.data = data;
                    res.status(200).send(bitwebResponse.create())
                }
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//비트베리 API - 연결 끓기
router.post('/disconnect', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.bitberry.url + "/v2/users/disconnect";
    let header = {
        'Authorization': 'Bearer ' + dbconfig.bitberry.apiKey,
        'X-Partner-User-Token': req.session.bitberry_token == undefined ? req.body.bitberry_token : req.session.bitberry_token
    };
    let country = dbconfig.country;
    let userTag = req.session.userTag == undefined ? req.body.userTag : req.session.userTag;
    
    request({uri: url, 
            method:'POST',
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 204) {
            let data = {'bitberry_token': ''};
            //users에 token 정보 update
            controllerUsers.updateByUserTag(country, userTag, data)
                .then(() => {
                    req.session.bitberry_token = "";
                    bitwebResponse.code = 200;
                    bitwebResponse.data = "success";
                    res.status(200).send(bitwebResponse.create())
                });
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//비트베리 API - 지갑 목록 조회
router.post('/wallets', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.bitberry.url + "/v2/wallets";
    let header = {
        'Authorization': 'Bearer ' + dbconfig.bitberry.apiKey,
        'X-Partner-User-Token': req.session.bitberry_token == undefined ? req.body.bitberry_token : req.session.bitberry_token
    };
    
    if(req.body.count != undefined || req.body.cursorId != undefined) {
        url += '?';

        if(req.body.count != undefined) {
            url += 'count=' + req.body.count;
        }
    
        if(req.body.cursorId != undefined) {
            url += 'cursor_id=' + req.body.cursorId;
        }
    }

    request({uri: url, 
            method:'GET',
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            console.log('success : ', body);
            bitwebResponse.code = 200;
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

//비트베리 API - 지갑 입출금 내역 조회
router.post('/wallets/:walletId/entries', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.bitberry.url + "/v2/wallets/" + req.params.walletId + "/entries";
    let header = {
        'Authorization': 'Bearer ' + dbconfig.bitberry.apiKey,
        'X-Partner-User-Token': req.session.bitberry_token == undefined ? req.body.bitberry_token : req.session.bitberry_token
    };

    if(req.body.count != undefined || req.body.cursorId != undefined 
        || req.body.category != undefined || req.body.startAt != undefined
        || req.body.endAt != undefined || req.body.direction != undefined ) {
        url += '?';

        if(req.body.count != undefined) {
            url += 'count=' + req.body.count;
        }
    
        if(req.body.cursorId != undefined) {
            url += 'cursor_id=' + req.body.cursorId;
        }

        if(req.body.category != undefined) {
            url += 'category=' + req.body.category;
        }
    
        if(req.body.startAt != undefined) {
            url += 'start_at=' + req.body.startAt;
        }

        if(req.body.endAt != undefined) {
            url += 'end_at=' + req.body.endAt;
        }
    
        if(req.body.direction != undefined) {
            url += 'direction=' + req.body.direction;
        }
    }

    request({uri: url, 
            method:'GET',
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            console.log('success : ', body);
            bitwebResponse.code = 200;
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

//비트베리 API - 사용자 입금 처리 (호출 시 사용자의 비트베리 앱으로 승인 요청)
router.post('/wallets/:coinType/deposit', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    if(req.session.userId == undefined) {
        bitwebResponse.code = 500;
        bitwebResponse.message = "이상 사용자 요청";
        res.status(500).send(bitwebResponse.create());
        return;
    }

    let body = req.body;
    req.body['coinType'] = req.params.coinType;
    req.body['bitberry_token'] = req.session.bitberry_token == undefined ? req.body.bitberry_token : req.session.bitberry_token;

    let url = dbconfig.APIServer + "/v2/coin/bitberry/deposit";
    let header = {
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'POST',
        headers: header,
        body:body,
        json: true
    }

    //API 서버로 내부 call요청한다.
    request(reqs, function (error, response, body) {  
        console.log(error, response, body);
        if (!error && response.statusCode == 200) {
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.error('err=>', error)
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create())
        }
    });
});

//비트베리 API - 회사 지갑에서 출금 처리 (호출 시 사용자의 비트베리 앱으로 전송)
router.post('/wallets/:coinType/withdraw', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    if(req.session.userId == undefined) {
        bitwebResponse.code = 500;
        bitwebResponse.message = "이상 사용자 요청";
        res.status(500).send(bitwebResponse.create());
        return;
    }

    let body = req.body;
    body['country'] = dbconfig.country;
    req.body['userId'] = req.session.userId;
    req.body['coinType'] = req.params.coinType;
    req.body['userTag'] = req.session.userTag == undefined ? req.body.userTag : req.session.userTag;

    let url = dbconfig.APIServer + "/v2/coin/bitberry/withdraw";
    let header = {
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'POST',
        headers: header,
        body:body,
        json: true
    }

    //API 서버로 내부 call요청한다.
    request(reqs, function (error, response, body) {  
        console.log(error, response, body);
        if (!error && response.statusCode == 200) {
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.error('err=>', error)
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create())
        }
    });
});


//ONT wallet 입금 요청 처리
router.post('/ontwallet/deposit', function(req, res, next) {
    var bitwebResponse = new BitwebResponse();
    if(req.session.userId == undefined) {
        bitwebResponse.code = 500;
        bitwebResponse.message = "이상 사용자 요청";
        res.status(500).send(bitwebResponse.create());
        return;
    }

    let body = req.body;
    body['country'] = dbconfig.country;
    req.body['coinType'] = req.body.cryptoCurrencyCode;
    req.body['userTag'] = req.session.userTag == undefined ? req.body.userTag : req.session.userTag;

    let url = dbconfig.APIServer + "/v2/coin/ontwallet/deposit";
    let header = {
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'POST',
        headers: header,
        body:body,
        json: true
    }

    //API 서버로 내부 call요청한다.
    request(reqs, function (error, response, body) {  
        console.log(error, response, body);
        if (!error && response.statusCode == 200) {
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.error('err=>', error)
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create())
        }
    });
});

//ont wallet 출금 처리
router.post('/wallets/:coinType/withdraw/ontwallet', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    if(req.session.userId == undefined) {
        bitwebResponse.code = 500;
        bitwebResponse.message = "이상 사용자 요청";
        res.status(500).send(bitwebResponse.create());
        return;
    }

    let body = req.body;
    body['country'] = dbconfig.country;
    req.body['userId'] = req.session.userId;
    req.body['coinType'] = req.body.cryptoCurrencyCode;
    req.body['userTag'] = req.session.userTag == undefined ? req.body.userTag : req.session.userTag;

    let url = dbconfig.APIServer + "/v2/coin/ontwallet/withdraw";
    let header = {
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'POST',
        headers: header,
        body:body,
        json: true
    }

    //API 서버로 내부 call요청한다.
    request(reqs, function (error, response, body) {  
        console.log(error, response, body);
        if (!error && response.statusCode == 200) {
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.error('err=>', error)
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create())
        }
    });
});

router.post('/bitberry/result/:walletId/:category', function(req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let transfer_request_id = req.body.transfer_request_id;
    let url = dbconfig.bitberry.url + "/v2/transfer_requests/" + transfer_request_id;
    let header = {
        'Authorization': 'Bearer ' + dbconfig.bitberry.apiKey,
        'X-Partner-User-Token': req.session.bitberry_token == undefined ? req.body.bitberry_token : req.session.bitberry_token
    };

    let category = req.params.category;
    let country = dbconfig.country;
    let userTag = req.session.userTag == undefined ? req.body.userTag : req.session.userTag;

    url += "?category=" + (req.params.category == "deposit" ? "withdraw" : "deposit");

    request({uri: url, 
            method:'GET',
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            console.log('success : ', body);

            if(result.status != "success") {
                bitwebResponse.code = 200;
                let message = "현재 입금 대기 중입니다. 비트베리앱에서 입금 승인 후 확인버튼을 눌려주세요.";
                if(country != "KR") {
                    message = "The coin is waiting for deposit.  Please press the Confirm button after approving the deposit on the Bitberry.";
                }
                let noData = {
                    "code": "E001",
                    "msg": message
                }
                bitwebResponse.data = noData;
                res.status(200).send(bitwebResponse.create())
                return;
            } else {
                let result = {
                    "code": "success",
                    "msg": "입금 완료."
                }
                bitwebResponse.code = 200;
                bitwebResponse.data = result;
                res.status(200).send(bitwebResponse.create())
            }
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

router.post('/bitberry/deposit/callback', function(req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let body = req.body;
    let userTag = req.session.userTag;
    console.log('bitberry deposit callback req body : ', body);
    let result = body;

    if(result.from_user_id != undefined) {
        console.log('success : ', body);
        let condition = {
            "bitberry_user_id": result.from_user_id
        }
        controllerUsers.getByUserInfo(country, condition)
            .then((user) => {
                let option = {
                    "category": result.category
                }
                
                let amount = Math.abs(result.amount);
                let mach = parseFloat(result.amount);
                
                let data = {
                    "extType":"bitberry",
                    "coinId": user._doc.coinId,
                    "category": result.category,          
                    "status": result.status,
                    "currencyCode": result.currency_code,
                    "amount": amount,
                    "price": amount,
                    "regDate": util.formatDate(new Date().toString())  
                }

                controllerCoinHistorys.createCoinHistoryExtByCoinId(country, data)
                    .then(coinHistory => {
                        controllerCoins.getByCoinId(country, user._doc.coinId)
                            .then(coin => {
                                let update_data = {
                                    "total_mach": parseFloat((coin._doc.total_mach + amount).toFixed(8))
                                }
                                if(result.currency_code == "BTC") {
                                    let total_btc = coin._doc.total_btc == undefined ? 0 :  coin._doc.total_btc;
                                    update_data = {
                                        "total_btc": parseFloat((total_btc + amount).toFixed(8))
                                    }
                                } else if(result.currency_code == "ETH") {
                                    let total_ether = coin._doc.total_ether == undefined ? 0 :  coin._doc.total_ether;
                                    update_data = {
                                        "total_ether":  parseFloat((total_ether + amount).toFixed(8))
                                    }
                                }
                                
                                controllerCoins.updateTotalCoin(country, user._doc.coinId, update_data)
                                    .then(u_coin => {
                                        bitwebResponse.code = 200;
                                        bitwebResponse.data = u_coin;
                                        res.status(200).send(bitwebResponse.create())
                                    }).catch(err => {
                                        bitwebResponse.code = 500;
                                        bitwebResponse.message = err;
                                        res.status(500).send(bitwebResponse.create());
                                    });
                            }) .catch(err => {
                                bitwebResponse.code = 500;
                                bitwebResponse.message = err;
                                res.status(500).send(bitwebResponse.create());
                            });
                    }).catch(err => {
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create());
                    });
            }).catch(err => {
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create());
        });
    } else {
        console.log('error => no user session ' + req);
        bitwebResponse.code = 500;
        bitwebResponse.message = "inital error";
        res.status(500).send(bitwebResponse.create());
    }
});

module.exports = router;
