/**
 * 게임 스테이션 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
let crypto = require('crypto');
let md5 = require('md5');
var util = require('../utils/util');
var dbconfig = require('../config/dbconfig');
var controllerUsers = require('../controllers/users');
var controllerGameCenter = require('../controllers/gameCenter');
var controllerMachgames = require('../controllers/machgames');
var controllerCoins = require('../controllers/coins');
var controllerCoinHistorys = require('../controllers/coinHistorys');
var dbconfig = require('../config/dbconfig');
var BitwebResponse = require('../utils/BitwebResponse');

//게임에서 게임 스테이션으로 로그인 시 호출하는 API 
router.post('/login', function (req, res, next) {
    let head = JSON.parse(req.body.head);
    let body = JSON.parse(req.body.body);

    if (body.UserID != null && body.UserPW != null) {
        let key = dbconfig.gameCenter.monkeyCrashSaga.key;
        let country = dbconfig.country;
        let userID = body.UserID;
        let ingameCoin = body.IngameCoin;
        let lastStageLevel = body.LastStageLevel;
        let isLastStage = body.IsLastStage;
        let userRecordInfo = body.StagePlayInfoList;
        let service = body.service;
        let deviceId = body.deviecId == undefined ? -99 : body.deviecId;
        let resSessionToken = util.makeToken();
        let checkmd5 = req.body.check;
        
        let userPW = crypto.createHash('sha256').update(body.UserPW).digest('base64');
        let data = {};
        data['userTag'] = userID;
        data['password'] = userPW;

        let encodemd5 = md5(req.body.body + key);
        console.log('compare md5 =>' + checkmd5 + " : " + encodemd5);

        if(checkmd5 != encodemd5) {
            let result = {
                "ConnectStatus": 202,
                "UserID": "",
                "StoredCoin": 0,
                "IngameCoin": 0,
                "GameCorrectDoneSyncTime": 0,
                "SessionToken": ""
            }

            res.status(202).send(JSON.stringify(result));
            return;
        }

        controllerUsers.getUser(country, data)
            .then(user => {
                if(user._doc.gameCenterId == undefined) {
                    let reqData = {
                        "userId": user._doc._id,
                        "total_mcs1_coin": 0,
                        "regDate":util.formatDate(new Date().toString()),
                        "loginDate":util.formatDate(new Date().toString())
                    }
                    controllerGameCenter.add(country, reqData)
                        .then(gameCenter => {
                            let updateData = {"gameCenterId": gameCenter._doc._id, "sessionToken": resSessionToken};
                            controllerUsers.updateByUserTag(country, userID, updateData)
                                .then(() => {
                                    if(parseInt(head.Cn) > 2) {
                                        let recordInfo = {
                                            "gameCenterId": gameCenter._doc._id,
                                            "service": service,
                                            "lastStageLevel": lastStageLevel,
                                            "isLastStage": isLastStage,
                                            "userRecordInfo": userRecordInfo,
                                            "deviceId": deviceId,
                                            "cn":head.Cn,
                                            "regDate": util.formatDate(new Date().toString())
                                        }

                                        controllerGameCenter.updateRecord(country, recordInfo);
                                        controllerGameCenter.updateRecordHistory(country, recordInfo);
                                    }

                                    let result = {
                                        "ConnectStatus": 200,
                                        "UserID": user._doc.userTag,
                                        "StoredCoin": gameCenter._doc.total_mcs1_coin,
                                        "IngameCoin": ingameCoin,
                                        "GameCorrectDoneSyncTime": 0,
                                        "SessionToken": resSessionToken
                                    }

                                    res.status(200).send(JSON.stringify(result));
                                }).catch((err) => {
                                    res.status(500).send("internal server error");
                                });
                        }).catch((err) => {
                            res.status(500).send("internal server error");
                        });
                } else {
                    controllerGameCenter.getByUserId(country, user._doc._id)
                        .then(gameCenter => {
                            let updateData = {"sessionToken": resSessionToken};
                            controllerUsers.updateByUserTag(country, userID, updateData)
                                .then(() => {
                                    if(parseInt(head.Cn) > 2) {
                                        let recordInfo = {
                                            "gameCenterId": gameCenter._doc._id,
                                            "service": head.Service,
                                            "lastStageLevel": lastStageLevel,
                                            "isLastStage": isLastStage,
                                            "userRecordInfo": userRecordInfo,
                                            "regDate": util.formatDate(new Date().toString())
                                        }

                                        controllerGameCenter.updateRecord(country, recordInfo);
                                        controllerGameCenter.updateRecordHistory(country, recordInfo);
                                        controllerGameCenter.update(country, user._doc._id, {"loginDate":util.formatDate(new Date().toString())})
                                    }

                                    let result = {
                                        "ConnectStatus": 200,
                                        "UserID": user._doc.userTag,
                                        "StoredCoin": gameCenter._doc.total_mcs1_coin,
                                        "IngameCoin": ingameCoin,
                                        "GameCorrectDoneSyncTime": 0,
                                        "SessionToken": resSessionToken
                                    }

                                    res.status(200).send(JSON.stringify(result));
                                }).catch((err) => {
                                    res.status(500).send("internal server error");
                                });
                        }).catch((err) => {
                            res.status(500).send("internal server error");
                        });
                }
            }).catch((err) => {
                console.error('err=>', err)
                let result = {
                    "ConnectStatus": 201,
                    "UserID": "",
                    "StoredCoin": 0,
                    "IngameCoin": 0,
                    "GameCorrectDoneSyncTime": 0,
                    "SessionToken": ""
                }

                res.status(201).send(JSON.stringify(result));
            });
    } else {
        res.status(500).send("please insert userID and PW.");
    }
});

//게임에서 게임 스테이션으로 게임코인 전송 시 호출 API
router.post('/:service/send', function (req, res, next) {
    let body = JSON.parse(req.body.body);

    let key = dbconfig.gameCenter.monkeyCrashSaga.key;
    let service = req.params.service;
    let country = dbconfig.country;
    let userID = body.UserID;
    let storedCoin = body.StoredCoin;
    let ingameCoin = body.IngameCoin;
    let exchangeCoin = body.ExchangeCoin;
    let gameCorrectDoneSyncTime = body.GameCorrectDoneSyncTime;
    let resSessionToken = util.makeToken();
    let checkmd5 = req.body.check;

    controllerUsers.getByUserTag(country, userID)
        .then(user => {
            let sessionToken = user._doc.sessionToken;
            let encodemd5 = md5(req.body.body + sessionToken + key);
            console.log('compare md5 =>' + checkmd5 + " : " + encodemd5);
            if(checkmd5 != encodemd5) {
                let updateData = {"sessionToken": resSessionToken};
                controllerUsers.updateByUserTag(country, userID, updateData);

                let result = {
                    "ConnectStatus": 202,
                    "UserID": userID,
                    "StoredCoin": storedCoin,
                    "IngameCoin": 0,
                    "GameCorrectDoneSyncTime": 0,
                    "SessionToken": resSessionToken
                }
        
                res.status(202).send(JSON.stringify(result));
                return;
            }

            controllerGameCenter.getByUserId(country, user._doc._id)
                .then(gameCenter => {
                    if(gameCenter._doc.total_mcs1_coin == storedCoin) {
                        let total_mcs1_coin =  gameCenter._doc.total_mcs1_coin + exchangeCoin;
                        let reqData = {"total_mcs1_coin" : total_mcs1_coin};
                        controllerGameCenter.update(country, user._doc._id, reqData)
                            .then(() => {
                                let updateData = {"sessionToken": resSessionToken};
                                controllerUsers.updateByUserTag(country, userID, updateData)
                                    .then(() => {
                                        let reqHistory = {
                                            "service": service, 
                                            "type": "send",
                                            "userId": user._doc._id,
                                            "storedCoin": storedCoin,
                                            "ingameCoin": ingameCoin,
                                            "exchangeCoin": exchangeCoin,
                                            "saveTotalCoin": total_mcs1_coin,
                                            "regDate": util.formatDate(new Date().toString()),
                                            "sessionToken": sessionToken
                                        }

                                        controllerGameCenter.addHistory(country, reqHistory);

                                        let result = {
                                            "ConnectStatus": 200,
                                            "UserID": user._doc.userTag,
                                            "StoredCoin": total_mcs1_coin,
                                            "IngameCoin": ingameCoin - exchangeCoin,
                                            "GameCorrectDoneSyncTime": gameCorrectDoneSyncTime,
                                            "SessionToken": resSessionToken
                                        }
                            
                                        res.status(200).send(JSON.stringify(result));
                                    }).catch((err) => {
                                        res.status(500).send("No data.");
                                    });
                            }).catch((err) => {
                                res.status(500).send("No data.");
                            });
                    } else {
                        let updateData = {"sessionToken": resSessionToken};
                        controllerUsers.updateByUserTag(country, userID, updateData);

                        let result = {
                            "ConnectStatus": 201,
                            "UserID": userID,
                            "StoredCoin": storedCoin,
                            "IngameCoin": 0,
                            "GameCorrectDoneSyncTime": 0,
                            "SessionToken": resSessionToken
                        }
                
                        res.status(201).send(JSON.stringify(result));
                    }

                }).catch((err) => {
                    res.status(500).send("No data.");
                });
        }).catch((err) => {
            res.status(500).send("No data.");
        });
});

//게임 스테이션에서 게임으로 게임코인 전송 시 호출 API
router.post('/:service/receive', function (req, res, next) {
    let body = JSON.parse(req.body.body);
    let service = req.params.service;
    let key = dbconfig.gameCenter.monkeyCrashSaga.key;
    let country = dbconfig.country;
    let userID = body.UserID;
    let storedCoin = body.StoredCoin;
    let ingameCoin = body.IngameCoin;
    let exchangeCoin = body.ExchangeCoin;
    let gameCorrectDoneSyncTime = body.GameCorrectDoneSyncTime;
    let resSessionToken = util.makeToken();
    let checkmd5 = req.body.check;

    controllerUsers.getByUserTag(country, userID)
        .then(user => {
            let sessionToken = user._doc.sessionToken;
            let encodemd5 = md5(req.body.body + sessionToken + key);
            console.log('compare md5 =>' + checkmd5 + " : " + encodemd5);
            if(checkmd5 != encodemd5) {
                let updateData = {"sessionToken": resSessionToken};
                controllerUsers.updateByUserTag(country, userID, updateData);

                let result = {
                    "ConnectStatus": 202,
                    "UserID": userID,
                    "StoredCoin": storedCoin,
                    "IngameCoin": 0,
                    "GameCorrectDoneSyncTime": 0,
                    "SessionToken": resSessionToken
                }
        
                res.status(202).send(JSON.stringify(result));
                return;
            }

            controllerGameCenter.getByUserId(country, user._doc._id)
                .then(gameCenter => {
                    if(gameCenter._doc.total_mcs1_coin == storedCoin) {
                        let total_mcs1_coin =  gameCenter._doc.total_mcs1_coin - exchangeCoin;
                        if(total_mcs1_coin < 0) {
                            let updateData = {"sessionToken": resSessionToken};
                            controllerUsers.updateByUserTag(country, userID, updateData);

                            let result = {
                                "ConnectStatus": 201,
                                "UserID": userID,
                                "StoredCoin": storedCoin,
                                "IngameCoin": 0,
                                "GameCorrectDoneSyncTime": 0,
                                "SessionToken": resSessionToken
                            }
                    
                            res.status(201).send(JSON.stringify(result));
                            return;                           
                        }

                        let reqData = {"total_mcs1_coin" : total_mcs1_coin};
                        controllerGameCenter.update(country, user._doc._id, reqData)
                            .then(() => {
                                let updateData = {"sessionToken": resSessionToken};
                                controllerUsers.updateByUserTag(country, userID, updateData)
                                    .then(() => {
                                        let reqHistory = {
                                            "service": service, 
                                            "type": "receive",
                                            "userId": user._doc._id,
                                            "storedCoin": storedCoin,
                                            "ingameCoin": ingameCoin,
                                            "exchangeCoin": exchangeCoin,
                                            "saveTotalCoin": total_mcs1_coin,
                                            "regDate": util.formatDate(new Date().toString()),
                                            "sessionToken": sessionToken
                                        }

                                        controllerGameCenter.addHistory(country, reqHistory);
                                        
                                        let result = {
                                            "ConnectStatus": 200,
                                            "UserID": user._doc.userTag,
                                            "StoredCoin": total_mcs1_coin,
                                            "IngameCoin": ingameCoin + exchangeCoin,
                                            "GameCorrectDoneSyncTime": gameCorrectDoneSyncTime,
                                            "SessionToken": resSessionToken
                                        }
                            
                                        res.status(200).send(JSON.stringify(result));
                                    }).catch((err) => {
                                        res.status(500).send("No data.");
                                    });
                            }).catch((err) => {
                                res.status(500).send("No data.");
                            });
                    } else {
                        let updateData = {"sessionToken": resSessionToken};
                        controllerUsers.updateByUserTag(country, userID, updateData);

                        let result = {
                            "ConnectStatus": 201,
                            "UserID": userID,
                            "StoredCoin": storedCoin,
                            "IngameCoin": 0,
                            "GameCorrectDoneSyncTime": 0,
                            "SessionToken": updateData
                        }
                
                        res.status(201).send(JSON.stringify(result));
                    }

                }).catch((err) => {
                    res.status(500).send("No data.");
                });
        }).catch((err) => {
            res.status(500).send("No data.");
        });
});

//게임 스테이션 게임 리스트
router.post('/games/list', function(req, res, next) {
    let bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let condition = {};

    controllerMachgames.count(country, condition)
    .then(count => {
        controllerMachgames.list(country, condition)
        .then(machgames => {
            let result = {
                "list":machgames,
                "count": count
            }
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
            console.error('games list err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }).catch((err) => {
        console.error('games list err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
})

//게임 스테이션 게임 상세보기
router.get('/games/:machGameId', function(req, res, next) {
    let bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let condition = {"_id":req.params.machGameId};

    controllerMachgames.get(country, condition)
    .then(machGame => {
        bitwebResponse.code = 200;
        bitwebResponse.data = machGame;
        res.status(200).send(bitwebResponse.create())
    }).catch((err) => {
        console.error('games list err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
})

//게임 스테이션 플레이 정보
router.get('/:userId/info', function(req, res, next) {
    let bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let userId = req.params.userId;

    controllerGameCenter.getByUserId(country, userId)
    .then(userGameCenter => {
        if(userGameCenter == null) {
            bitwebResponse.code = 200;
            bitwebResponse.data = userGameCenter;
            res.status(200).send(bitwebResponse.create())
        } else {
            let condition = {
                "gameCenterId": userGameCenter._doc._id
            }
            controllerGameCenter.getRecords(country, condition)
            .then(gameRecords => {
                
                userGameCenter._doc['gameRecords'] = gameRecords;
                bitwebResponse.code = 200;
                bitwebResponse.data = userGameCenter;
                res.status(200).send(bitwebResponse.create())
            }).catch((err) => {
                console.error('user game center err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            })
        }
    }).catch((err) => {
        console.error('user game center err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
})

//mach로 교환 
router.post('/:userId/exchange/mach', function(req, res, next) {
    let userId = req.params.userId;
    let reqData = req.body;
    let country = dbconfig.country;
    let bitwebResponse = new BitwebResponse();
    let machGameCondition = {
        "coinName":"mcs1"
    }

    controllerMachgames.get(country, machGameCondition)
    .then(machGame => {
        controllerUsers.getById(country, userId) 
        .then(user => {
            controllerGameCenter.getByUserId(country, userId)
            .then(userGameCenter => {
                if(userGameCenter == null) {
                    let message = "게임이 등록되어 있지 않습니다. 게임에서 로그인 후 사용하세요.";
                    if(country != "KR") {
                        message = "The game is not registered. Please sign in the game."
                    }
                    let result = {
                        "successYn": "N",
                        "code" : "E001",
                        "msg": message
                    }
                    bitwebResponse.code = 200;
                    bitwebResponse.data = result;
                    res.status(200).send(bitwebResponse.create())
                    return;
                }

                let total_coin = userGameCenter._doc['total_' + reqData.gameType + '_coin'];
                if(total_coin == undefined) {
                    let message = "존재하지 않는 게임 코인입니다.";
                    if(country != "KR") {
                        message = "This game coin does not exist."
                    }
                    let result = {
                        "successYn": "N",
                        "code" : "E002",
                        "msg": message
                    }
                    bitwebResponse.code = 200;
                    bitwebResponse.data = result;
                    res.status(200).send(bitwebResponse.create())
                    return;
                }
                let req_exchange_gamecoin = reqData.gameCoin;
                let balance_total_coin = parseFloat((total_coin - req_exchange_gamecoin).toFixed());
                if(balance_total_coin < 0) {
                    let message = "교환할 게임 코인 잔액이 부족합니다.";
                    if(country != "KR") {
                        message = "There is not enough game coin balance to exchange."
                    }
                    let result = {
                        "successYn": "N",
                        "code" : "E003",
                        "msg": message
                    }
                    bitwebResponse.code = 200;
                    bitwebResponse.data = result;
                    res.status(200).send(bitwebResponse.create())
                    return;
                }

                let exchange_rate = req.body.mach_rate;
                let exchange_mach = parseFloat((req_exchange_gamecoin * exchange_rate).toFixed());
                if(machGame._doc.issueAmount < exchange_mach) {
                    let message = "교환 가능한 MACH를 초과하여 교환할 수 없습니다.";
                    if(country != "KR") {
                        message = "You can not exchange more than the exchangeable MACH."
                    }
                    let result = {
                        "successYn": "N",
                        "code" : "E004",
                        "msg": message
                    }
                    bitwebResponse.code = 200;
                    bitwebResponse.data = result;
                    res.status(200).send(bitwebResponse.create())
                    return;
                }
                
                let updateGameCenter = {};
                updateGameCenter['total_' + reqData.gameType + '_coin'] = balance_total_coin;
                //1.gamecoin update.
                controllerGameCenter.updateByCondition(country, {"userId": userId}, updateGameCenter)
                .then(updateGameCenter => {
                    //2.mach update.
                    let coinId = {"_id" : user._doc.coinId};
                    let updateMachTotalCoin = {$inc : {"total_mach": exchange_mach}};
                    controllerCoins.updateCoin(country, coinId, updateMachTotalCoin)
                    .then(updateCoin => {
                        let issueAmount = parseFloat((machGame._doc.issueAmount - exchange_mach).toFixed());
                        //3.discount issueAmount.
                        controllerMachgames.update(country, machGameCondition,{"issueAmount":issueAmount});
                        
                        updateCoin._doc.total_mach += exchange_mach;
                        //3.gamestation exchange history 저장
                        let exchangeData = {
                            "userId": userId,
                            "game": reqData.gameType,
                            "category": "exchange-mach",
                            "gamecoin": req_exchange_gamecoin,
                            "price": exchange_mach,
                            "rate": exchange_rate,
                            "regDate" : util.formatDate(new Date().toString())
                        }
                        controllerGameCenter.addExchangeHistory(country, exchangeData);

                        //4.coin history 저장
                        let coinData = {
                            "extType" : "game",
                            "coinId" : user._doc.coinId,
                            "category" : "deposit",
                            "status" : "success",
                            "currencyCode" : "MACH",                        
                            "price" : exchange_mach,
                            "game": reqData.gameType,
                            "amount" : req_exchange_gamecoin,
                            "regDate" : util.formatDate(new Date().toString())
                        }
                        controllerCoinHistorys.createData(country, coinData);

                        updateCoin._doc['successYn'] = "Y";
                        bitwebResponse.code = 200;
                        bitwebResponse.data = updateCoin;
                        res.status(200).send(bitwebResponse.create())
                    }).catch((err) => {
                        console.error('user game center err03=>', err)
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create())
                    })
                }).catch((err) => {
                    console.error('user game center err02=>', err)
                    bitwebResponse.code = 500;
                    bitwebResponse.message = err;
                    res.status(500).send(bitwebResponse.create())
                })
            }).catch((err) => {
                console.error('user game center err01=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            })
        });
    });
})

//게임코인으로 교환 
router.post('/:userId/exchange/gamecoin', function(req, res, next) {
    let userId = req.params.userId;
    let reqData = req.body;
    let country = dbconfig.country;
    let bitwebResponse = new BitwebResponse();

    console.log(reqData);

    controllerUsers.getById(country, userId) 
    .then(user => {
        let coinId = user._doc.coinId;
        controllerCoins.getByCoinId(country, coinId)
        .then(coin => {
            let total_coin = coin._doc.total_mach;
            let req_exchange_mach = reqData.mach;
            let balance_total_coin = parseFloat((total_coin - req_exchange_mach).toFixed(8));
            if(balance_total_coin < 0) {
                let message = "교환할 MACH 잔액이 부족합니다.";
                if(country != "KR") {
                    message = "There is not enough MACH balance to exchange."
                }
                let result = {
                    "successYn": "N",
                    "code" : "E002",
                    "msg": message
                }
                bitwebResponse.code = 200;
                bitwebResponse.data = result;
                res.status(200).send(bitwebResponse.create())
                return;
            }

            controllerGameCenter.getByUserId(country, userId)
            .then(userGameCenter => {
                if(userGameCenter == null) {
                    let message = "게임이 등록되어 있지 않습니다. 게임에서 로그인 후 사용하세요.";
                    if(country != "KR") {
                        message = "The game is not registered. Please sign in the game."
                    }
                    let result = {
                        "successYn": "N",
                        "code" : "E001",
                        "msg": message
                    }
                    bitwebResponse.code = 200;
                    bitwebResponse.data = result;
                    res.status(200).send(bitwebResponse.create())
                    return;
                }

                let exchange_rate = req.body.gamecoin_rate;
                let exchange_gamecoin = parseFloat((req_exchange_mach * exchange_rate).toFixed(8));
                let coinId = {"_id" : user._doc.coinId};
                let updateMachTotalCoin = {"total_mach": balance_total_coin};
                //1. coin update.
                controllerCoins.updateCoin(country, coinId, updateMachTotalCoin)
                .then(updateCoin => {
                    //2. game coin update.
                    let coinId = {"_id" : user._doc.coinId};
                    let reqGameCenter = {};
                    reqGameCenter['$inc'] = {};
                    reqGameCenter['$inc']['total_' + reqData.gameType + '_coin'] = exchange_gamecoin;
                    controllerGameCenter.updateByCondition(country,  {"userId": userId}, reqGameCenter)
                    .then(updateGameCenter => {
                        //3.gamestation exchange history 저장
                        let exchangeData = {
                            "userId": userId,
                            "game": reqData.gameType,
                            "category": "exchange-gamecoin",
                            "gamecoin": exchange_gamecoin,
                            "price": req_exchange_mach,
                            "rate": exchange_rate,
                            "regDate" : util.formatDate(new Date().toString())
                        }
                        controllerGameCenter.addExchangeHistory(country, exchangeData);

                        //4.coin history 저장
                        let coinData = {
                        "extType" : "game",
                        "coinId" : user._doc.coinId,
                        "category" : "withdraw",
                        "status" : "success",
                        "currencyCode" : "MACH",                        
                        "price" : req_exchange_mach,
                        "game": reqData.gameType,
                        "amount" : exchange_gamecoin,
                        "regDate" : util.formatDate(new Date().toString())
                    }
                    controllerCoinHistorys.createData(country, coinData);

                    updateGameCenter._doc['successYn'] = "Y";
                    bitwebResponse.code = 200;
                    bitwebResponse.data = updateGameCenter;
                    res.status(200).send(bitwebResponse.create());
                    }).catch((err) => {
                        console.error('user game center err=>', err)
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create())
                    }) 
                }).catch((err) => {
                    console.error('user game center err=>', err)
                    bitwebResponse.code = 500;
                    bitwebResponse.message = err;
                    res.status(500).send(bitwebResponse.create())
                })    
            }).catch((err) => {
                console.error('user game center err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            })
        }).catch((err) => {
            console.error('user game center err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }).catch((err) => {
        console.error('user game center err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
})

//사용자별 게임 스테이션 내 게임 코인 입출금 내역 조회
router.get('/:userId/gameCoinHistory', function(req, res, next) {
    let bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let condition = {
        "userId": req.params.userId
    };

    controllerGameCenter.getHistoryCount(country, condition)
    .then(gameCenterHistoryCount => {
        controllerGameCenter.getHistorys(country, condition)
        .then(gameCenterHistorys => {
            let result = {
                "list":gameCenterHistorys,
                "count": gameCenterHistoryCount
            }
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
            console.error('games list err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }).catch((err) => {
        console.error('user game center err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
})

//교환내역 가져오기
router.post('/:userId/exchange/history', function(req, res, next) {
    let bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let condition = {
        "userId": req.params.userId,
    };
    if(req.body.category != "all") {
        condition["category"] = req.body.category
    }
    let option = {
        "pageIdx": req.body.pageIdx == undefined ? 20 : req.body.pageIdx,
        "perPage": req.body.perPage == undefined ? 0 : req.body.perPage
    }

    controllerGameCenter.getExchangeHistoryCount(country, condition, option)
    .then(gameCenterHistoryCount => {
        controllerGameCenter.getExchangeHistorys(country, condition, option)
        .then(gameCenterHistorys => {
            let result = {
                "list":gameCenterHistorys,
                "count": gameCenterHistoryCount
            }
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
            console.error('games list err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }).catch((err) => {
        console.error('games list err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

module.exports = router;