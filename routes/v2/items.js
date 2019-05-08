var express = require('express');
var router = express.Router();
var controllerItems = require('../../controllers/items')
var controllerUsers = require('../../controllers/users');
var BitwebResponse = require('../../utils/BitwebResponse')
var util = require('../../utils/util')
const smsController = require('../../controllers/sms')
const controllerVtrs = require('../../controllers/vtrs')
const controllerCms = require('../../controllers/cms')
const shortUrl = require('node-url-shortener')
var dbconfig = require('../../config/dbconfig');
const request = require("request");

router.get('/', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();

    let country = dbconfig.country;
    let category = req.query.category;
    let data = {}
    if ((category == "game") || (category == "etc")) {

        if (category == "game") {
            let split_title = (req.query.title == undefined ? "" : req.query.title.toString().split(" "));

            let game_name = split_title.length == 0 ? split_title : split_title[0];
            let game_server = split_title.length == 0 ? split_title : split_title[1];
            let title = split_title.length == 0 ? split_title : split_title[2];
            let type = req.query.type;

            if (game_name != undefined) data['game_name'] = game_name;
            if (game_server != undefined) data['game_server'] = game_server;
            if (title != undefined) data['title'] = title;
            if (type != undefined) data['type'] = type;
        } else {
            let title = req.query.title;
            if (title != undefined) data['title'] = title;
        }

        let trade_type = req.query.trade_type;
        let pageIdx = req.query.pageIdx;
        let perPage = req.query.perPage;
        let userTag = req.query.userTag;

        if (trade_type != undefined) data['trade_type'] = trade_type;
        if (pageIdx != undefined) data['pageIdx'] = parseInt(pageIdx);
        if (perPage != undefined) data['perPage'] = parseInt(perPage);
        if (userTag != undefined) data['userTag'] = userTag;

        data['category'] = category;
        controllerItems.getItemCount(country, data)
            .then((count) => {
                controllerItems.getItemByRequired(country, data)
                    .then(result => {
                        let resultSet = {
                            "count": count,
                            "list": result
                        }

                        console.log('test=>', resultSet)
                        bitwebResponse.code = 200;
                        bitwebResponse.data = resultSet;

                        let jsonResult = bitwebResponse.create();

                        if (data.pageIdx != undefined) data.pageIdx = pageIdx ? data.pageIdx : 0
                        if (data.perPage != undefined) data.perPage = perPage ? data.perPage : 10

                        jsonResult['pageIdx'] = data.pageIdx;
                        jsonResult['perPage'] = data.perPage;

                        res.status(200).send(jsonResult)
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
    } else {
        bitwebResponse.code = 400;
        bitwebResponse.message = "Check category in query! (buy, sell)";
        res.status(400).send(bitwebResponse.create())
    }

});

router.get('/all', function (req, res, next) {
    //game - buy
    var bitwebResponse = new BitwebResponse();

    let country = dbconfig.country;
    let category = "game";
    let trade_type = "buy";
    let pageIdx = 0;
    let perPage = 5;
    let data = {};

    data['trade_type'] = trade_type;
    data['pageIdx'] = pageIdx;
    data['perPage'] = perPage;
    data['category'] = category;

    controllerItems.getItemByRequired(country, data)
        .then(game_buys => {
            data['trade_type'] = "sell";
            controllerItems.getItemByRequired(country, data)
                .then(game_sells => {
                    data['category'] = "etc";
                    data['trade_type'] = "buy";
                    controllerItems.getItemByRequired(country, data)
                        .then(etc_buys => {
                            data['trade_type'] = "sell";
                            controllerItems.getItemByRequired(country, data)
                                .then(etc_sells => {
                                    controllerCms.getCmsList(country)
                                        .then((cms) => {
                                            let result = {
                                                "game_buys" : game_buys,
                                                "game_sells" : game_sells,
                                                "etc_buys" : etc_buys,
                                                "etc_sells" : etc_sells,
                                                "cms": cms
                                            }
                                            console.log('test=>', result)
                                            bitwebResponse.code = 200;
                                            bitwebResponse.data = result;

                                            let jsonResult = bitwebResponse.create();

                                            if (data.pageIdx != undefined) data.pageIdx = pageIdx ? data.pageIdx : 0
                                            if (data.perPage != undefined) data.perPage = perPage ? data.perPage : 10

                                            jsonResult['pageIdx'] = data.pageIdx;
                                            jsonResult['perPage'] = data.perPage;

                                            res.status(200).send(jsonResult)
                                        })
                                })
                        })
                })
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })

    //game - sell
    //etc - buy
    //etc - sell
});

router.get('/users/:userTag', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();

    let country = dbconfig.country;
    let userTag = req.params.userTag;
    let data = {}

    let trade_type = req.query.tradeType;
    let category = req.query.category;
    let pageIdx = req.query.pageIdx;
    let perPage = req.query.perPage;

    if (userTag != undefined) {
        if (trade_type != undefined) data['trade_type'] = trade_type;
        if (category != undefined) data['category'] = category;
        if (pageIdx != undefined) data['pageIdx'] = parseInt(pageIdx);
        if (perPage != undefined) data['perPage'] = parseInt(perPage);

        data['userTag'] = userTag;

        controllerItems.getItemCount(country, data)
            .then((count) => {
                controllerItems.getItemByUserTag(country, data)
                    .then(result => {
                        let resultSet = {
                            "count": count,
                            "list": result
                        };

                        console.log('test=>', resultSet)
                        bitwebResponse.code = 200;
                        bitwebResponse.data = resultSet;

                        let jsonResult = bitwebResponse.create();

                        if (data.pageIdx != undefined) data.pageIdx = pageIdx ? data.pageIdx : 0
                        if (data.perPage != undefined) data.perPage = perPage ? data.perPage : 10

                        jsonResult['pageIdx'] = data.pageIdx;
                        jsonResult['perPage'] = data.perPage;

                        res.status(200).send(jsonResult)
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
        });
    } else {
        bitwebResponse.code = 400;
        bitwebResponse.message = "Check category in query! (buy, sell)";
        res.status(400).send(bitwebResponse.create())
    }

});

router.get('/tradeType/:tradeType', function (req, res, next) {
    // res.send('respond with a resource');

    var bitwebResponse = new BitwebResponse();

    if (req.params.tradeType != null) {

        let data = {}
        let trade_type = req.params.tradeType;
        let category = req.query.category;
        let pageIdx = req.query.pageIdx;
        let perPage = req.query.perPage;
        let country = dbconfig.country;

        data['trade_type'] = trade_type;
        data['category'] = category;
        if (pageIdx != undefined) data['pageIdx'] = parseInt(pageIdx);
        if (perPage != undefined) data['perPage'] = parseInt(perPage);

        controllerItems.getItemCount(country, data)
            .then((count) => {
                controllerItems.getByTradeType(country, data)
                    .then(result => {
                        let resultSet = {
                            "count": count,
                            "list": result
                        }

                        bitwebResponse.code = 200;
                        bitwebResponse.data = resultSet;

                        let jsonResult = bitwebResponse.create();

                        if (data.pageIdx != undefined) data.pageIdx = pageIdx ? data.pageIdx : 0
                        if (data.perPage != undefined) data.perPage = perPage ? data.perPage : 10

                        jsonResult['pageIdx'] = data.pageIdx;
                        jsonResult['perPage'] = data.perPage;

                        res.status(200).send(jsonResult)
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
    }
});

router.get('/trade/:userId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    if (req.params.userId != null) {
        let data = {}
        let userId = req.params.userId;
        let tradeType = req.query.tradeType;
        let pageIdx = req.query.pageIdx;
        let perPage = req.query.perPage;
        let country = dbconfig.country;

        data['userId'] = userId;
        data['country'] = country;
        data['trade_type'] = tradeType;
        if (pageIdx != undefined) data['pageIdx'] = parseInt(pageIdx);
        if (perPage != undefined) data['perPage'] = parseInt(perPage);

        controllerItems.getItemCount(country, data)
            .then((count) => {
                if(tradeType == "vtr") {
                    var controllerVtrs = require('../controllers/vtrs')
                    controllerVtrs.getItemIdsByUserId(data)
                        .then(result => {
                            let resultSet = {
                                "count": count,
                                "list": result
                            }

                            bitwebResponse.code = 200;
                            bitwebResponse.data = resultSet;

                            let jsonResult = bitwebResponse.create();

                            if (data.pageIdx != undefined) data.pageIdx = pageIdx ? data.pageIdx : 0
                            if (data.perPage != undefined) data.perPage = perPage ? data.perPage : 10

                            jsonResult['pageIdx'] = data.pageIdx;
                            jsonResult['perPage'] = data.perPage;

                            res.status(200).send(jsonResult)
                        }).catch((err) => {
                        console.error('err=>', err)
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create())
                    })
                } else {
                    var controllerTradePoint = require('../controllers/pointTrades')
                    controllerTradePoint.getItemIdsByUserId(data)
                        .then(result => {
                            let resultSet = {
                                "count": count,
                                "list": result
                            }

                            bitwebResponse.code = 200;
                            bitwebResponse.data = resultSet;

                            let jsonResult = bitwebResponse.create();

                            if (data.pageIdx != undefined) data.pageIdx = pageIdx ? data.pageIdx : 0
                            if (data.perPage != undefined) data.perPage = perPage ? data.perPage : 10

                            jsonResult['pageIdx'] = data.pageIdx;
                            jsonResult['perPage'] = data.perPage;

                            res.status(200).send(jsonResult)
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
        });
    }
})

router.get('/:itemId', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();

    if (req.params.itemId != null) {

        let itemId = req.params.itemId;
        let country = dbconfig.country;
        let userId = req.session.userId;
        let userTag = req.session.userTag;

        controllerItems.getByItemId(country, itemId, userId, userTag)
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

router.get('/check/:coinType/:itemId', function(req, res, next){
    var bitwebResponse = new BitwebResponse();

    if (req.params.itemId != null) {
        let coinType = req.params.coinType;
        let itemId = req.params.itemId;
        let country = dbconfig.country;
        let userId = req.session.userId;

        if(coinType == "coin") {
            controllerItems.checkTotalCoin(country, itemId, userId)
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
        } else {
            controllerItems.checkTotalPoint(country, itemId, userId)
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
})

router.post('/', function (req, res, next) {

    let sampleJson =
        {
            "userTag": "5bc9a10de399867b00e2e30f",
            "type": "point",
            "trade_type": "buy",
            "category": "game",
            "game_name": "리니지",
            "game_server": "발록",
            "name": "홍길동",
            "title": "리니지 집행검+8 팝니다.",
            "desc": "강화 8짜리 입니다.",
            "price": 100,
            "point": 20,
            "count": 1,
            "game_character": "홍길동의캐릭터",
            "status": 0
        }

    if (req.body.userTag != null) {

        let country = dbconfig.country;
        let data = {}
        data = req.body;
        data['total_price'] = req.body.price * req.body.count;
        data['total_point'] = req.body.point * req.body.count;

        var bitwebResponse = new BitwebResponse();

        controllerItems.createByItem(country, data)
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

router.post('/:itemId/images', function (req, res, next) {

    let bitwebResponse = new BitwebResponse();
    let itemId = req.params.itemId;
    let country = dbconfig.country;
    let awsS3 = require('../../utils/awsS3');
    let multiUpload = awsS3.multiUpload();

    if (itemId != null) {
        multiUpload(req, res, function (err, result) {
            if (err) {
                res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
                return;
            }

            console.log('req.file=>', JSON.stringify(req.files))
            let data = {
                "images": []
            }
            for(var i =0; i< req.files.length; i++) {
                let image = {
                    "path": req.files[i].location,
                    "bucket": req.files[i].bucket,
                    "key": req.files[i].key,
                    "origin_name": req.files[i].originalname,
                    "size": req.files[i].size,
                    "mimetype": req.files[i].mimetype,
                    "regDate": util.formatDate(new Date().toLocaleString('ko-KR'))
                }

                data['images'].push(image);
            }

            controllerItems.updateById(country, itemId, data)
                .then((result) => {

                    bitwebResponse.code = 200;
                    bitwebResponse.data = result.images;
                    res.status(200).send(bitwebResponse.create())
                }).catch((err) => {
                console.error('err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            })
        });
    } else {
        let err = "Need itemId in path parameter"
        bitwebResponse.code = 400;
        bitwebResponse.message = err;
        res.status(400).send(bitwebResponse.create())
    }

});

router.put('/:itemId', function (req, res, next) {

    // "itemId": "5bcd8ed68e05c3e3707291a8"
    let sampleJson =
        {
            "userId": "5bc9a10de399867b00e2e30f",
            "type": "item",
            "trade_type": "buy",
            "category": "game",
            "game_name": "리니지",
            "game_server": "발록",
            "name": "홍길동",
            "title": "리니지 집행검+8 팝니다.",
            "desc": "강화 8짜리 입니다.",
            "price": 90,
            "point": 110,
            "count": 2,
            "total_price": 100,
            "game_character": "홍길동의캐릭터",
            "status": 0
        }

    var bitwebResponse = new BitwebResponse();
    if (req.params.itemId != null) {

        let itemId = req.params.itemId;
        let country = dbconfig.country;
        let data = {}

        data = req.body;
        data['total_price'] = req.body.price * req.body.count;
        data['total_point'] = req.body.point * req.body.count;
        data['modifyDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))

        controllerItems.updateById(country, itemId, data)
            .then((result) => {

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

router.put('/:itemId/total_mach', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    if (req.params.itemId != null) {

        let itemId = req.params.itemId;
        let country = dbconfig.country;
        let data = {}
        data['price'] = req.body.mach;
        data['total_price'] = req.body.mach;

        controllerItems.updateById(country, itemId, data)
            .then((result) => {

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

router.put('/updateStatus/:itemId', function (req, res, next) {
    let country = dbconfig.country;
    req.body['country'] = country;
    req.params['country'] = country;
    req.params['userId'] = req.body.user_id;
    let itemId = req.params.itemId;
    let data = {"roomToken": req.body.roomToken, "status": req.body.status};

    var bitwebResponse = new BitwebResponse();

    controllerItems.getByItemId(country, itemId, "", "")
        .then((item) => {
            req.body['item'] = item;

            let userTags = [item._doc.userTag, req.session.userTag];
            controllerUsers.getByUserTags(country, userTags)
                .then((users) => {

                    for (var i in users) {
                        if (users[i]._doc.phone == undefined || users[i]._doc.phone == "") {
                            let errMsg = "There is no phone."
                            bitwebResponse.code = 403;
                            bitwebResponse.data = errMsg;
                            res.status(403).send(bitwebResponse.create());
                            return;
                        }
                    }

                    controllerVtrs.getByItemId(country, itemId)
                        .then((vtr) => {
                            controllerVtrs.createVtrTemp(req)
                                .then((vtrTemp) => {
                                    data['vtrTempId'] = vtrTemp._doc._id;
                                    controllerItems.updateById(country, itemId, data)
                                        .then((result) => {
                                            //result._doc['resultUrl'] = reqFromUrl;
                                            let from_req_url, to_req_url;
                                            if(item._doc.trade_type == "buy") {
                                                from_req_url = req.headers.origin + '/sms/room?roomToken='+req.body.roomToken+'&itemId=' + itemId + '&user_id=' + req.body.user_id + '&vtrTempId=' + vtrTemp._doc._id;
                                                to_req_url = req.headers.origin + '/sms/room?roomToken='+req.body.roomToken+'&itemId=' + itemId + '&user_id=' + item._doc.userTag + '&vtrTempId=' + vtrTemp._doc._id;
                                            } else {
                                                to_req_url = req.headers.origin + '/sms/room?roomToken='+req.body.roomToken+'&itemId=' + itemId + '&user_id=' + req.body.user_id + '&vtrTempId=' + vtrTemp._doc._id;
                                                from_req_url = req.headers.origin + '/sms/room?roomToken='+req.body.roomToken+'&itemId=' + itemId + '&user_id=' + item._doc.userTag + '&vtrTempId=' + vtrTemp._doc._id;
                                            }
                                            console.log("HOST : ", req.headers.origin);
                                            console.log("SMS URL : ", from_req_url, to_req_url);
                                            if(req.headers.origin.indexOf("mymach") > 0) {
                                                shortUrl.short(encodeURIComponent(from_req_url), function (err, resultUrl) {
                                                    console.log(resultUrl);
                                                    req.body['from_url'] = resultUrl;
                                                    shortUrl.short(encodeURIComponent(to_req_url), function (err, resultUrl1) {
                                                        req.body['to_url'] = resultUrl1;
                                                        smsController.sendSms(req, res, 'use')
                                                            .then(() => {
                                                                bitwebResponse.code = 200;
                                                                bitwebResponse.data = item._doc.trade_type == "buy" ? from_req_url.replace('/sms','') : to_req_url.replace('/sms','');
                                                                res.status(200).send(bitwebResponse.create())
                                                            });
                                                    });
                                                });
                                            } else {
                                                req.body['from_url'] = from_req_url;
                                                req.body['to_url'] = to_req_url;
                                                smsController.sendSms(req, res, 'no')
                                                    .then(() => {
                                                        bitwebResponse.code = 200;
                                                        bitwebResponse.data = item._doc.trade_type == "buy" ? from_req_url.replace('/sms','') : to_req_url.replace('/sms','');
                                                        res.status(200).send(bitwebResponse.create())
                                                    }).catch((err) => {
                                                    console.error('err=>', err)
                                                    bitwebResponse.code = 500;
                                                    bitwebResponse.message = err;
                                                    res.status(500).send(bitwebResponse.create())
                                                });
                                            }
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
                }).catch((err) => {
                console.error('err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            });
        })
});

router.post('/getVtrStatus/:itemId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let itemId = req.params.itemId;

    controllerVtrs.getByItemId(country, itemId)
        .then((vtr) => {
            let payment_status = 0;
            if(vtr == null) {
                payment_status = 0;
            } else {
                payment_status = 1;
                if(vtr._doc.buy_status) {
                    payment_status = 2;
                }

                if(vtr._doc.sell_status) {
                    payment_status = 3;
                }
            }

        controllerVtrs.getVtrTemp(req)
            .then((vtrTemp)=>{
                if(vtrTemp != null) {
                    vtrTemp._doc['payment_status'] = payment_status;
                }
                bitwebResponse.code = 200;
                bitwebResponse.data = vtrTemp;
                res.status(200).send(bitwebResponse.create())
            }).catch((err) => {
                console.error('err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            });
        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
})

router.put('/status/:country/:itemId/:status', function (req, res, next) {
    let country = req.params.country;
    let itemId = req.params.itemId;
    let data = {"status": req.params.status};

    var bitwebResponse = new BitwebResponse();

    controllerItems.updateById(country, itemId, data)
        .then((result) => {

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

router.delete('/:itemId', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();
    if (req.params.itemId != null) {
        controllerItems.remove(req)
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

router.put("/:itemId/clicked", function(req, res, next) {
    let country = dbconfig.country;
    let itemId = req.params.itemId;
    let userId = req.session.userId;
    let userTag = req.session.userTag;

    var bitwebResponse = new BitwebResponse();

    controllerItems.getByItemId(country, itemId, userId, userTag)
        .then(item => {
            let data = {
                "clicked": (item._doc.clicked == undefined ? 0 : item._doc.clicked) + 1
            };
            controllerItems.updateById(country, itemId, data)
                .then((result) => {

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
});

module.exports = router;
