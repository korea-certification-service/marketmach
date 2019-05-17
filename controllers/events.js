let db = require('../utils/db');
let bitwebEvents = require('../services/events');
let bitwebUsers = require('../services/users');
let bitwebCoins = require('../services/coins');
let bitwebPoints = require('../services/points');
var dbconfig = require('../config/dbconfig');

function count(req) {
    return new Promise((resolve, reject) => {
        let country = dbconfig.country;
        let eventEnd = true;
        if(req.params.eventEnd == "now") {
            eventEnd = false;
        }
        let data = {"eventEnd": eventEnd};
        let option = {
            "perPage": req.query.perPage == undefined ? 20 : parseInt(req.query.perPage),
            "pageIdx": req.query.pageIdx == undefined ? 0 : parseInt(req.query.pageIdx)
        };
        // if(req.query.title != undefined) {
        //     data = {
        //         $or: [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }}, {'category' : { $regex: req.query.title, $options: 'i' }}, ]
        //     }
        // };

        db.connectDB(country)
            .then(() => bitwebEvents.count(data, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function list(req) {
    return new Promise((resolve, reject) => {
        let country = dbconfig.country;
        let eventEnd = true;
        if(req.params.eventEnd == "now") {
            eventEnd = false;
        }
        let data = {"eventEnd": eventEnd};
        let option = {
            "perPage": req.query.perPage == undefined ? 20 : parseInt(req.query.perPage),
            "pageIdx": req.query.pageIdx == undefined ? 0 : parseInt(req.query.pageIdx)
        };
        // if(req.query.title != undefined) {
        //     data = {
        //         $or: [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }}, {'category' : { $regex: req.query.title, $options: 'i' }}, ]
        //     }
        // }

        db.connectDB(country)
            .then(() => bitwebEvents.search(data, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function get(country, eventId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebEvents.getById(eventId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function buy(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => {
                let search = {
                    "product":data.product
                };

                bitwebEvents.timeKillBuy(search)
                    .then((timekill) => {
                        let total_amount = 0;
                        for(var i in timekill) {
                            total_amount += timekill[i]._doc.amount;
                        }

                        if(total_amount > 1) {
                            let result = {
                                "result": false,
                                "code":"E002",
                                "msg": "해당 상품이 모두 구매 완료 되었습니다. 다음 기회를 이용하세요."
                            }
                            resolve(result);
                            return;
                        } else {
                            bitwebUsers.getUserByTag(data.userTag)
                                .then((user) => {
                                    data['countryCode']=user._doc.countryCode;
                                    data['phone']=user._doc.phone;
                                    if(data.currencyType == "MACH") {
                                        bitwebCoins.getCoinById(user._doc.coinId)
                                            .then((coin) => {
                                                // 구매 요청 금액 보다 코인 개수가 적으면 에러 처리
                                                if(coin._doc.total_mach < data.total_price) {
                                                    let result = {
                                                        "result": false,
                                                        "code":"E001",
                                                        "msg": "보유 코인이 구매 요청 코인보다 적습니다. 코인 입금 후 다시 요청하세요."
                                                    }
                                                    resolve(result);
                                                    return;
                                                }
                                                let update_total_mach = coin._doc.total_mach - data.total_price;
                                                bitwebCoins.updateCoinById(user._doc.coinId, {"total_mach": update_total_mach})
                                                    .then(() => {
                                                        bitwebEvents.buy(data)
                                                            .then((result) => {
                                                                result._doc['successYn'] = true;
                                                                console.log('result=>' , result);
                                                                resolve(result)
                                                            }).catch((err) => {
                                                                reject(err)
                                                            })   
                                                    }).catch((err) => {
                                                        reject(err)
                                                    }) 
                                            }).catch((err) => {
                                                reject(err)
                                            })   
                                    } else {
                                        bitwebPoints.getPointById(user._doc.pointId)
                                            .then((point) => {
                                                // 구매 요청 금액 보다 포인트 개수가 적으면 에러 처리
                                                if(point._doc.total_point < data.total_price) {
                                                    let result = {
                                                        "successYn": false,
                                                        "code":"E001",
                                                        "msg": "보유 포인트가 구매 요청 포인트보다 적습니다. 포인트 입금 후 다시 요청하세요."
                                                    }
                                                    resolve(result);
                                                    return;
                                                }
                                                let update_total_point = point._doc.total_point - data.total_price;
                                                bitwebPoints.updatePointById(user._doc.pointId, {"total_point": update_total_point})
                                                    .then(() => {
                                                        bitwebEvents.buy(data)
                                                            .then((result) => {
                                                                result._doc['successYn'] = true;
                                                                console.log('result=>' , result);
                                                                resolve(result)
                                                            }).catch((err) => {
                                                                reject(err)
                                                            })   
                                                    }).catch((err) => {
                                                        reject(err)
                                                    }) 
                                            }).catch((err) => {
                                                reject(err)
                                            })
                                    }
                                }).catch((err) => {
                                    reject(err)
                                })    
                        }
                    }).catch((err) => {
                        reject(err)
                    })                 
            })
    })
}

exports.list = list;
exports.get = get;
exports.count = count;
exports.buy = buy;