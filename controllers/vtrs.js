
var db = require('../utils/db');
var bitwebVtrs = require('../services/vtrs');
var bitwebUsers = require('../services/users');
var bitwebCoins = require('../services/coins');
var bitwebItems = require('../services/items');
var util = require('../utils/util');
var dbconfig = require('../config/dbconfig');
var bitwebCoinHistorys = require('../services/coinHistorys');
var request = require('request');

function getVtrs(country, body) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getVtrs(body))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var vtrId = req.params.vtrId;

        db.connectDB(country)
            .then(() => bitwebVtrs.getVtrById(vtrId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getByVtrId(country, vtrId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getVtrById(vtrId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getItemIdsByUserId(data) {
    return new Promise((resolve, reject) => {
        db.connectDB(data.country)
            .then(() => bitwebVtrs.getItemIdsByUserId(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getItemIdsByUserTag(data) {
    return new Promise((resolve, reject) => {
        db.connectDB(data.country)
            .then(() => bitwebVtrs.getItemIdsByUserTag(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByItemId(country, itemId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getByItemId(itemId))
            .then((result) => {
                //console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getTempByItemId(country, itemId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getTempByItemId(itemId))
            .then((result) => {
                //console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function create(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var data = req.body;

        data['regDate'] = util.formatDate(new Date().toString())

        db.connectDB(country)
            .then(() => bitwebVtrs.createVtr(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createVtrTemp(data) {
    return new Promise((resolve, reject) => {

        let country = data.country;

        data['regDate'] = util.formatDate(new Date().toString())

        db.connectDB(country)
            .then(() => bitwebVtrs.createVtrTemp(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getVtrTemp(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        let vtrTempId = req.body.vtrTempId;
        let buyer_id = req.body.user_id;
        let seller_id = req.body.user_id;

        db.connectDB(country)
            .then(() => bitwebVtrs.getVtrTemp(vtrTempId,buyer_id,seller_id))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getVtrTempByItemId(country, itemId) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebVtrs.getTempByItemId(itemId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createByVtr(country, vtr) {
    return new Promise((resolve, reject) => {

        var data = vtr;
        db.connectDB(country)
            .then(() => bitwebVtrs.createVtr(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function updateStatus(country, req) {
    return new Promise((resolve , reject) => {
        let bitwebUsers = require('../controllers/users');
        let bitwebCoins = require('../controllers/coins');

        var vtrId = req.params.vtrId;
        var tradeType = req.params.tradeType;
        var category = req.body.category;
        var data = {};

        data[tradeType + '_status'] = req.body.status;
        data['completed_' + tradeType + '_date'] = util.formatDate(new Date().toString());
        if (tradeType == "sell") {
            let currentDate = new Date().toString();
            if(category == "game") {
                data['auto_completed_confirm_date'] = util.calculateDate(currentDate, "D", 1);
            } else {
                data['auto_completed_confirm_date'] = util.calculateDate(currentDate, "D", 7);
            }
        }

        db.connectDB(country)
            .then(() => {
                bitwebVtrs.getEscrow(vtrId)
                    .then(count => {
                        if(tradeType != "buy" && count == 0) {
                            let msg = {
                                "status": "fail",
                                "code" : "E002",
                                "msg" : "해당 거래의 에스크로가 적용되어 있지 않아 거래를 진행할 수 없습니다."
                            };
                            resolve(msg);
                            return;
                        } else {
                            bitwebVtrs.getVtrById(vtrId)
                                .then(vtr => {
                                    let mach = vtr._doc.mach;
                                    let from_userId = vtr._doc.from_userId;
                                    let to_userId = vtr._doc.to_userId;
                                    bitwebUsers.getById(country, to_userId)
                                        .then(user => {
                                            let coinId = user.coinId;
                                            bitwebCoins.getByCoinId(country, coinId)
                                                .then(coin => {
                                                    let to_user_mach = coin.total_mach;
                                                    let to_user_output_mach = (coin._doc.total_mach == undefined ? 0 : coin._doc.total_mach);
                                                    if(to_user_mach >= to_user_output_mach) {
                                                        to_user_output_mach = (to_user_output_mach - req.body.mach < 0 ? 0 : to_user_output_mach - req.body.mach);
                                                    }
                                                    to_user_mach = to_user_mach - vtr._doc.mach;
                                                    if (tradeType == "buy" && to_user_mach < 0) {
                                                        let msg = {
                                                            "status": "fail",
                                                            "code" : "E001",
                                                            "msg" : "거래금액이 구매자의 보유 금액보다 클 수 없습니다."
                                                        };
                                                        resolve(msg);
                                                        return;
                                                    } else {
                                                        bitwebVtrs.updateVtrById(vtrId, data)
                                                            .then((result) => {
                                                                console.log('result=>', result);
                                                                if (tradeType == "buy") {
                                                                    let mach_json = {"total_mach": to_user_mach, "output_total_mach":to_user_output_mach}
                                                                    bitwebCoins.updateTotalCoin(country, coinId, mach_json)
                                                                        .then(() => {
                                                                            // console.log('result=>', result);
                                                                            // resolve(result);

                                                                            //ui-ux 개편 시 오픈
                                                                            let itemId = result._doc.item._id;
                                                                            let body = {"status": 2}
                                                                            bitwebItems.updateItemById(itemId, body)
                                                                                .then((item) => {
                                                                                    let body3 = {
                                                                                        "type": "deposit",
                                                                                        "itemId": result._doc.item._id,
                                                                                        "vtr": result,
                                                                                        "mach": mach,
                                                                                        "reqUser":result._doc.to_userId,
                                                                                        "regDate": util.formatDate(new Date().toString())
                                                                                    };
                                                                                    
                                                                                    bitwebVtrs.createEscrow(body3)
                                                                                        .then(() => {
                                                                                            console.log('result=>', result);
                                                                                            resolve(result);
                                                                                        }).catch((err) => {
                                                                                        console.log('err=>', err)
                                                                                        reject(err)
                                                                                    })
                                                                                }).catch((err) => {
                                                                                console.log('err=>', err)
                                                                                reject(err)
                                                                            });
                                                                        }).catch((err) => {
                                                                        console.log('err=>', err)
                                                                        reject(err)
                                                                    });
                                                                }

                                                                if (tradeType == "sell") {
                                                                    //ui-ux 개편 시 오픈
                                                                    let itemId = result._doc.item._id;
                                                                    let body = {"status": 3}
                                                                    bitwebItems.updateItemById(itemId, body)
                                                                        .then((item) => {
                                                                            console.log('result=>', result);
                                                                            resolve(result);
                                                                        }).catch((err) => {
                                                                        console.log('err=>', err)
                                                                    });
                                                                }

                                                                if (result.buy_status == true && result.sell_status == true && tradeType == "confirm") {
                                                                    let data = {}
                                                                    data['completed'] = true;
                                                                    data['completed_date'] = util.formatDate(new Date().toString())
                                                                    //data['item']['status'] = 3;

                                                                    bitwebUsers.getById(country, from_userId)
                                                                        .then(user => {
                                                                            let coinId = user.coinId;
                                                                            bitwebCoins.getByCoinId(country, coinId)
                                                                                .then(coin => {
                                                                                    let user_mach = coin.total_mach;
                                                                                    user_mach = user_mach + mach;
                                                                                    let user_output_mach = (coin.output_total_mach == undefined ? 0 : coin.output_total_mach) + mach;
                                                                                    let mach_json = {"total_mach": user_mach, "output_total_mach":user_output_mach};
                                                                                    console.log('escrow go to mach : ', mach_json);
                                                                                    if(coin._doc.firstVtr == undefined) {
                                                                                        mach_json['firstVtr'] = true;
                                                                                        if(dbconfig.bonus.firstVtr > 0) {
                                                                                            mach_json.total_mach += dbconfig.bonus.firstVtr;

                                                                                            let data10 = {
                                                                                                "extType":"mach",
                                                                                                "coinId": user._doc.coinId,
                                                                                                "category": "event-firstVtr",          
                                                                                                "status": "success",
                                                                                                "currencyCode": "MACH",
                                                                                                "amount": dbconfig.bonus.firstVtr,
                                                                                                "mach": dbconfig.bonus.firstVtr,
                                                                                                "regDate": util.formatDate(new Date().toString())  
                                                                                            }
                                                                        
                                                                                            bitwebCoinHistorys.createCoinHistory(data10);
                                                                                        }
                                                                                    }

                                                                                    if(dbconfig.bonus.firstVtr > 0) {
                                                                                        bitwebUsers.getById(country, to_userId)
                                                                                            .then(to_user => {
                                                                                                let to_coinId = to_user.coinId;
                                                                                                bitwebCoins.getByCoinId(country, to_coinId)
                                                                                                    .then(to_coin => {
                                                                                                        let to_user_mach = to_coin.total_mach;
                                                                                                        to_user_mach = to_user_mach + dbconfig.bonus.firstVtr;
                                                                                                        let to_mach_json = {"total_mach": to_user_mach, "firstVtr": true}
                                                                                                        if(to_coin._doc.firstVtr == undefined) {
                                                                                                            bitwebCoins.updateTotalCoin(country, to_coinId, to_mach_json)
                                                                                                                .then(() => {
                                                                                                                    let data10 = {
                                                                                                                        "extType":"mach",
                                                                                                                        "coinId": to_user._doc.coinId,
                                                                                                                        "category": "event-firstVtr",          
                                                                                                                        "status": "success",
                                                                                                                        "currencyCode": "MACH",
                                                                                                                        "amount": dbconfig.bonus.firstVtr,
                                                                                                                        "mach": dbconfig.bonus.firstVtr,
                                                                                                                        "regDate": util.formatDate(new Date().toString())  
                                                                                                                    }
                                                                                                
                                                                                                                    bitwebCoinHistorys.createCoinHistory(data10);

                                                                                                                    bitwebVtrs.updateVtrById(vtrId, data)
                                                                                                                        .then((result) => {
                                                                                                                            let itemId = result._doc.item._id;
                                                                                                                            // let body = {"status": 3}
                                                                                                                            //ui-ux 개편 시 오픈
                                                                                                                            let body = {"status": 4}
                                                                                                                            bitwebItems.updateItemById(itemId, body)
                                                                                                                                .then((item) => {
                                                                                                                                    let body3 = {
                                                                                                                                        "type": "withdraw",
                                                                                                                                        "itemId": result._doc.item._id,
                                                                                                                                        "vtr": result,
                                                                                                                                        "mach": mach,
                                                                                                                                        "reqUser":result._doc.from_userId,
                                                                                                                                        "regDate": util.formatDate(new Date().toString())
                                                                                                                                    };
                                                                                                                                    
                                                                                                                                    bitwebVtrs.createEscrow(body3)
                                                                                                                                        .then(() => {
                                                                                                                                            console.log('result=>', result);
                                                                                                                                            resolve(result);
                                                                                                                                        }).catch((err) => {
                                                                                                                                        console.log('err=>', err)
                                                                                                                                        reject(err)
                                                                                                                                    })
                                                                                                                                });
                                                                                                                        }).catch((err) => {
                                                                                                                        console.log('err=>', err)
                                                                                                                        reject(err)
                                                                                                                    })
                                                                                                                }).catch((err) => {
                                                                                                                console.log('err=>', err)
                                                                                                            })
                                                                                                        }
                                                                                                    }).catch((err) => {
                                                                                                    console.log('err=>', err)
                                                                                                })
                                                                                            }).catch((err) => {
                                                                                            console.log('err=>', err)
                                                                                        })
                                                                                    } else {
                                                                                        bitwebCoins.updateTotalCoin(country, coinId, mach_json)
                                                                                            .then(() => {
                                                                                                bitwebVtrs.updateVtrById(vtrId, data)
                                                                                                    .then((result) => {
                                                                                                        let itemId = result._doc.item._id;
                                                                                                        // let body = {"status": 3}
                                                                                                        //ui-ux 개편 시 오픈
                                                                                                        let body = {"status": 4}
                                                                                                        bitwebItems.updateItemById(itemId, body)
                                                                                                            .then((item) => {
                                                                                                                let body3 = {
                                                                                                                    "type": "withdraw",
                                                                                                                    "itemId": result._doc.item._id,
                                                                                                                    "vtr": result,
                                                                                                                    "mach": mach,
                                                                                                                    "reqUser":result._doc.from_userId,
                                                                                                                    "regDate": util.formatDate(new Date().toString())
                                                                                                                };
                                                                                                                
                                                                                                                bitwebVtrs.createEscrow(body3)
                                                                                                                    .then(() => {
                                                                                                                        console.log('result=>', result);
                                                                                                                        resolve(result);
                                                                                                                    }).catch((err) => {
                                                                                                                    console.log('err=>', err)
                                                                                                                    reject(err)
                                                                                                                })
                                                                                                            });
                                                                                                    }).catch((err) => {
                                                                                                    console.log('err=>', err)
                                                                                                    reject(err)
                                                                                                })
                                                                                            }).catch((err) => {
                                                                                            console.log('err=>', err)
                                                                                            reject(err)
                                                                                        })
                                                                                    }  
                                                                                }).catch((err) => {
                                                                                console.log('err=>', err)
                                                                                reject(err)
                                                                            })
                                                                        }).catch((err) => {
                                                                        console.log('err=>', err)
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
                                }).catch((err) => {
                                reject(err)
                            })
                        }).catch((err) => {
                        reject(err)
                    })
                }
            })
        })
    })
}

function updateStatusByItemId(country, req) {
    return new Promise((resolve , reject) => {
        let bitwebUsers = require('../controllers/users');
        let bitwebCoins = require('../controllers/coins');

        var itemId = req.params.itemId;
        var tradeType = req.params.tradeType;
        var category = req.body.category;
        var data = {};

        data[tradeType + '_status'] = req.body.status;
        data['completed_' + tradeType + '_date'] = util.formatDate(new Date().toString());
        if (tradeType == "sell") {
            let currentDate = new Date().toString();
            if(category == "game") {
                data['auto_completed_confirm_date'] = util.calculateDate(currentDate, "D", 1);
            } else {
                data['auto_completed_confirm_date'] = util.calculateDate(currentDate, "D", 7);
            }
        }

        db.connectDB(country)
            .then(() => {
                bitwebVtrs.getByItemId(itemId)
                    .then(vtr => {
                        let mach = vtr._doc.mach;
                        let from_userId = vtr._doc.from_userId;
                        let to_userId = vtr._doc.to_userId;
                        bitwebUsers.getById(country, to_userId)
                            .then(user => {
                                let coinId = user.coinId;
                                bitwebCoins.getByCoinId(country, coinId)
                                    .then(coin => {
                                        let to_user_mach = coin.total_mach;
                                        let to_user_output_mach = (coin._doc.total_mach == undefined ? 0 : coin._doc.total_mach);
                                        if(to_user_mach >= to_user_output_mach) {
                                            to_user_output_mach = (to_user_output_mach - req.body.mach < 0 ? 0 : to_user_output_mach - req.body.mach);
                                        }
                                        to_user_mach = to_user_mach - vtr._doc.mach;
                                        if (tradeType == "buy" && to_user_mach < 0) {
                                            let msg = {
                                                "status": "fail",
                                                "code" : "E001",
                                                "msg" : "거래금액이 구매자의 보유 금액보다 클 수 없습니다."
                                            };
                                            resolve(msg);
                                            return;
                                        } else {
                                            bitwebVtrs.updateVtrByItemId(itemId, data)
                                                .then((result) => {
                                                    console.log('result=>', result);
                                                    if (tradeType == "buy") {
                                                        let mach_json = {"total_mach": to_user_mach, "output_total_mach":to_user_output_mach}
                                                        bitwebCoins.updateTotalCoin(country, coinId, mach_json)
                                                            .then(() => {
                                                                // console.log('result=>', result);
                                                                // resolve(result);

                                                                //ui-ux 개편 시 오픈
                                                                let itemId = result._doc.item._id;
                                                                let body = {"status": 2}
                                                                bitwebItems.updateItemById(itemId, body)
                                                                    .then((item) => {
                                                                        let body3 = {
                                                                            "type": "deposit",
                                                                            "itemId": result._doc.item._id,
                                                                            "vtr": result,
                                                                            "mach": mach,
                                                                            "reqUser":result._doc.to_userId,
                                                                            "regDate": util.formatDate(new Date().toString())
                                                                        };
                                                                        
                                                                        bitwebVtrs.createEscrow(body3)
                                                                            .then(() => {
                                                                                console.log('result=>', result);
                                                                                resolve(result);
                                                                            }).catch((err) => {
                                                                            console.log('err=>', err)
                                                                            reject(err)
                                                                        })
                                                                    }).catch((err) => {
                                                                    console.log('err=>', err)
                                                                });
                                                            }).catch((err) => {
                                                            console.log('err=>', err)
                                                        });
                                                    }

                                                    if (tradeType == "sell") {
                                                        //ui-ux 개편 시 오픈
                                                        let itemId = result._doc.item._id;
                                                        let body = {"status": 3}
                                                        bitwebItems.updateItemById(itemId, body)
                                                            .then((item) => {
                                                                console.log('result=>', result);
                                                                resolve(result);
                                                            }).catch((err) => {
                                                            console.log('err=>', err)
                                                        });
                                                        resolve(result)
                                                    }

                                                    if (result.buy_status == true && result.sell_status == true && tradeType == "confirm") {
                                                        let data = {}
                                                        data['completed'] = true;
                                                        data['completed_date'] = util.formatDate(new Date().toString())
                                                        //data['item']['status'] = 3;

                                                        bitwebUsers.getById(country, from_userId)
                                                            .then(user => {
                                                                let coinId = user.coinId;
                                                                bitwebCoins.getByCoinId(country, coinId)
                                                                    .then(coin => {
                                                                        let user_mach = coin.total_mach;
                                                                        user_mach = user_mach + mach;
                                                                        let user_output_mach = (coin.output_total_mach == undefined ? 0 : coin.output_total_mach) + mach;
                                                                        let mach_json = {"total_mach": user_mach, "output_total_mach":user_output_mach}
                                                                        // VTR 첫 거래 이벤트 진행 시 주석 풀기(바로 구매 진행 여부는 확인 후 결정)
                                                                        // if(coin._doc.firstVtr == undefined) {
                                                                        //     if(dbconfig.bonus.firstVtr > 0) {
                                                                        //         mach_json['firstVtr'] = true;
                                                                        //         mach_json.total_mach += dbconfig.bonus.firstVtr;

                                                                        //         let data10 = {
                                                                        //             "extType":"mach",
                                                                        //             "coinId": user._doc.coinId,
                                                                        //             "category": "event-firstVtr",          
                                                                        //             "status": "success",
                                                                        //             "currencyCode": "MACH",
                                                                        //             "amount": dbconfig.bonus.firstVtr,
                                                                        //             "mach": dbconfig.bonus.firstVtr,
                                                                        //             "regDate": util.formatDate(new Date().toString())  
                                                                        //         }
                                                            
                                                                        //         bitwebCoinHistorys.createCoinHistory(data10);
                                                                        //     }
                                                                        // }

                                                                        // if(dbconfig.bonus.firstVtr > 0) {
                                                                        //     bitwebUsers.getById(country, to_userId)
                                                                        //         .then(to_user => {
                                                                        //             let to_coinId = to_user.coinId;
                                                                        //             bitwebCoins.getByCoinId(country, to_coinId)
                                                                        //                 .then(to_coin => {
                                                                        //                     let to_user_mach = to_coin.total_mach;
                                                                        //                     to_user_mach = to_user_mach + dbconfig.bonus.firstVtr;
                                                                        //                     let to_mach_json = {"total_mach": user_mach, "firstVtr": true}
                                                                        //                     if(to_coin._doc.firstVtr == undefined) {
                                                                        //                         bitwebCoins.updateTotalCoin(country, to_coinId, to_mach_json)
                                                                        //                             .then(() => {
                                                                        //                                 let data10 = {
                                                                        //                                     "extType":"mach",
                                                                        //                                     "coinId": to_user._doc.coinId,
                                                                        //                                     "category": "event-firstVtr",          
                                                                        //                                     "status": "success",
                                                                        //                                     "currencyCode": "MACH",
                                                                        //                                     "amount": dbconfig.bonus.firstVtr,
                                                                        //                                     "mach": dbconfig.bonus.firstVtr,
                                                                        //                                     "regDate": util.formatDate(new Date().toString())  
                                                                        //                                 }
                                                                                    
                                                                        //                                 bitwebCoinHistorys.createCoinHistory(data10);

                                                                        //                             }).catch((err) => {
                                                                        //                             console.log('err=>', err)
                                                                        //                         })
                                                                        //                     }
                                                                        //                 }).catch((err) => {
                                                                        //                 console.log('err=>', err)
                                                                        //             })
                                                                        //         }).catch((err) => {
                                                                        //         console.log('err=>', err)
                                                                        //     })
                                                                        // }
                                                                        
                                                                        bitwebCoins.updateTotalCoin(country, coinId, mach_json)
                                                                            .then(() => {
                                                                                bitwebVtrs.updateVtrByItemId(itemId, data)
                                                                                    .then((result) => {
                                                                                        let itemId = result._doc.item._id;
                                                                                        // let body = {"status": 3}
                                                                                        //ui-ux 개편 시 오픈
                                                                                        let body = {"status": 4}
                                                                                        bitwebItems.updateItemById(itemId, body)
                                                                                            .then((item) => {
                                                                                                let body3 = {
                                                                                                    "type": "withdraw",
                                                                                                    "itemId": result._doc.item._id,
                                                                                                    "vtr": result,
                                                                                                    "mach": mach,
                                                                                                    "reqUser":result._doc.from_userId,
                                                                                                    "regDate": util.formatDate(new Date().toString())
                                                                                                };
                                                                                                
                                                                                                bitwebVtrs.createEscrow(body3)
                                                                                                    .then(() => {
                                                                                                        console.log('result=>', result);
                                                                                                        resolve(result);
                                                                                                    }).catch((err) => {
                                                                                                    console.log('err=>', err)
                                                                                                    reject(err)
                                                                                                })
                                                                                            });
                                                                                    }).catch((err) => {
                                                                                    console.log('err=>', err)
                                                                                })
                                                                            }).catch((err) => {
                                                                            console.log('err=>', err)
                                                                        })
                                                                    }).catch((err) => {
                                                                    console.log('err=>', err)
                                                                })
                                                            }).catch((err) => {
                                                            console.log('err=>', err)
                                                        })
                                                    }
                                                }).catch((err) => {
                                                reject(err)
                                            })
                                        }
                                    }).catch((err) => {
                                    reject(err)
                                })
                            }).catch((err) => {
                            console.log('err=>', err)
                        })           
                    }).catch((err) => {
                    reject(err)
                })
            })
    })
}

function updateById(country, id, body) {
    return new Promise((resolve , reject) => {

        var data = body;

        db.connectDB(country)
            .then(() => bitwebVtrs.updateVtrById(id, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateByItemId(country, id, body) {
    return new Promise((resolve , reject) => {

        var data = body;

        db.connectDB(country)
            .then(() => bitwebVtrs.updateVtrByItemId(id, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateWithHistory(country, vtrId, historyId) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebVtrs.updateVtrHistoryId(vtrId, historyId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateTotalVtr(country, vtrId, data) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebVtrs.updateVtrById(vtrId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function remove(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var vtrId = req.params.vtrId;

        db.connectDB(country)
            .then(() => bitwebVtrs.deleteVtrById(vtrId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function removeVtrTemp(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var vtrTempId = req.params.vtrTempId;

        db.connectDB(country)
            .then(() => bitwebVtrs.deleteVtrTempById(vtrTempId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function deleteVtrs(country, vtrId, userId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getVtrById(vtrId)
                .then((vtr) => {                    
                    bitwebUsers.getUserById(vtr._doc.to_userId)
                        .then((user) => {
                            if(vtr._doc.buy_status != undefined) {
                                //구매자가 구매 확인 후 취소 요청이 들어 오면 거래 취소 불가능 처리
                                if(vtr._doc.to_userId.toString() == userId) {
                                    if(vtr._doc.sell_status == undefined) {
                                        console.log('구매자 구매확인 후 취소 요청 불가');
                                        let result = {
                                            "code": 32,
                                            "msg": '현재 상태에서는 거래취소가 불가능합니다. 판매자님에게 환불을 요청하세요.'
                                        }
                                        resolve(result);
                                        return;
                                    } else {
                                        if(vtr._doc.completed != undefined) {
                                            console.log('거래 완료 후 취소 요청 불가');
                                            let result = {
                                                "code": 52,
                                                "msg": '거래가 완료되어 거래취소하실 수 없습니다.'
                                            }
                                            resolve(result);
                                            return;
                                        } else {
                                            console.log('구매자 구매확인 후 취소 요청 불가');
                                            let result = {
                                                "code": 42,
                                                "msg": '현재 상태에서는 거래취소가 불가능합니다. 판매자님에게 환불을 요청하거나 사이트에서 이의신청 해주세요.'
                                            }
                                            resolve(result);
                                            return;
                                        }
                                    }
                                } 
                            } 

                            if(vtr._doc.completed != undefined) {
                                console.log('거래 완료 후 취소 요청 불가');
                                let result = {
                                    "code": 52,
                                    "msg": '거래가 완료되어 거래취소하실 수 없습니다.'
                                }
                                resolve(result);
                                return;
                            }
                            
                            //cancel history 추가
                            bitwebItems.getItemById(vtr._doc.item._id)
                                .then(item => {
                                    let body4 = {
                                        "vtr": vtr,
                                        "item": item,
                                        "from_userId": vtr._doc.from_userId,
                                        "to_userId": vtr._doc.to_userId,
                                        "status": "user_cancel",
                                        "refund": vtr._doc.buy_status == undefined ? false : true,
                                        "regDate": util.formatDate(new Date().toString())
                                    };

                                    bitwebVtrs.createCancelHistory(body4);
                                })
                            
                            if(vtr._doc.buy_status != undefined) {
                                let coinId = user._doc.coinId;
                                bitwebCoins.getCoinById(coinId)
                                    .then((coin) => {
                                        let total_mach = coin._doc.total_mach + vtr._doc.item.total_price;
                                        let data1 = {"total_mach": total_mach};
                                        bitwebCoins.updateCoinById(coinId, data1)
                                            .then(() => {
                                                // OB에서는 임시로 값을 1로 함
                                                let data2 = {"status": 1};
                                                //let data2 = {"status": 0};

                                                bitwebItems.updateItemById(vtr._doc.item._id, data2)
                                                    .then(() => {
                                                        bitwebVtrs.deleteVtrById(vtrId)
                                                            .then(()=> {
                                                                let body3 = {
                                                                    "type": "cancel",
                                                                    "itemId": vtr._doc.item._id,
                                                                    "vtr": vtr,
                                                                    "mach": vtr._doc.item.total_price,
                                                                    "reqUser":vtr._doc.to_userId,
                                                                    "regDate": util.formatDate(new Date().toString())
                                                                };

                                                                bitwebVtrs.createEscrow(body3)
                                                                    .then(() => {
                                                                        let result = {
                                                                            "code": 31,
                                                                            "msg": '판매자님이 거래를 취소 하였습니다.에스크로에 보관된 거래금액이 구매자님의 지갑으로 환불되었습니다.'
                                                                        }
                                                                        if(vtr._doc.sell_status != undefined) {
                                                                            result = {
                                                                                "code": 41,
                                                                                "msg": '판매자님이 거래를 취소 하였습니다.에스크로에 보관된 거래금액이 구매자님의 지갑으로 환불되었습니다.'
                                                                            }
                                                                        }

                                                                        console.log('result=>', vtr);
                                                                        resolve(result);
                                                                    }).catch((err) => {
                                                                    reject(err)
                                                                })
                                                            }).catch((err) => {
                                                            reject(err)
                                                        })
                                                    }).catch((err) => {
                                                    reject(err)
                                                })
                                            }).catch((err) => {
                                            reject(err)
                                        })
                                    })
                            } else {
                                // OB에서는 임시로 값을 1로 함
                                let data2 = {"status": 1};
                                //let data2 = {"status": 0};

                                bitwebItems.updateItemById(vtr._doc.item._id, data2)
                                    .then(() => {
                                        bitwebVtrs.deleteVtrById(vtrId)
                                            .then(()=> {
                                                let result = {
                                                    "code": 11,
                                                    "msg": '판매자님이 거래를 취소했습니다.'
                                                }
                                                if(vtr._doc.to_userId == userId) {
                                                    result = {
                                                        "code": 21,
                                                        "msg": '구매자님이 거래를 취소했습니다.'
                                                    }                
                                                } 

                                                console.log('result=>', vtr);
                                                resolve(result);
                                            }).catch((err) => {
                                            reject(err)
                                        })
                                    }).catch((err) => {
                                    reject(err)
                                }).catch((err) => {
                                    reject(err)
                                })
                            }

                        }).catch((err) => {
                            reject(err)
                        })
                }).catch((err) => {
                    reject(err)
                })
            )
    })
}

function deleteVtrsByItemId(country, itemId, userId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getByItemId(itemId)
                .then((vtr) => {   
                    if(vtr != null) {       
                        let vtrId = vtr._doc._id;          
                        bitwebUsers.getUserById(vtr._doc.to_userId)
                            .then((user) => {
                                if(vtr._doc.buy_status != undefined) {
                                    //구매자가 구매 확인 후 취소 요청이 들어 오면 거래 취소 불가능 처리
                                    if(vtr._doc.to_userId.toString() == userId) {
                                        if(vtr._doc.sell_status == undefined) {
                                            console.log('구매자 구매확인 후 취소 요청 불가');
                                            let result = {
                                                "code": 32,
                                                "msg": '현재 상태에서는 거래취소가 불가능합니다. 판매자님에게 환불을 요청하세요.'
                                            }
                                            resolve(result);
                                            return;
                                        } else {
                                            if(vtr._doc.completed != undefined) {
                                                console.log('거래 완료 후 취소 요청 불가');
                                                let result = {
                                                    "code": 52,
                                                    "msg": '거래가 완료되어 거래취소하실 수 없습니다.'
                                                }
                                                resolve(result);
                                                return;
                                            } else {
                                                console.log('구매자 구매확인 후 취소 요청 불가');
                                                let result = {
                                                    "code": 42,
                                                    "msg": '현재 상태에서는 거래취소가 불가능합니다. 판매자님에게 환불을 요청하거나 사이트에서 이의신청 해주세요.'
                                                }
                                                resolve(result);
                                                return;
                                            }
                                        }
                                    } 
                                } 

                                if(vtr._doc.completed != undefined) {
                                    console.log('거래 완료 후 취소 요청 불가');
                                    let result = {
                                        "code": 52,
                                        "msg": '거래가 완료되어 거래취소하실 수 없습니다.'
                                    }
                                    resolve(result);
                                    return;
                                }

                                //cancel history 추가
                                bitwebItems.getItemById(vtr._doc.item._id)
                                    .then(item => {
                                        let body4 = {
                                            "vtr": vtr,
                                            "item": item,
                                            "from_userId": vtr._doc.from_userId,
                                            "to_userId": vtr._doc.to_userId,
                                            "status": "user_cancel",
                                            "refund": vtr._doc.buy_status == undefined ? false : true,
                                            "regDate": util.formatDate(new Date().toString())
                                        };

                                        bitwebVtrs.createCancelHistory(body4);
                                    })

                                if(vtr._doc.buy_status != undefined) {
                                    let coinId = user._doc.coinId;
                                    bitwebCoins.getCoinById(coinId)
                                        .then((coin) => {
                                            let total_mach = coin._doc.total_mach + vtr._doc.item.total_price;
                                            let data1 = {"total_mach": total_mach};
                                            bitwebCoins.updateCoinById(coinId, data1)
                                                .then(() => {
                                                    // OB에서는 임시로 값을 1로 함
                                                    //let data2 = {"status": 1};
                                                    let data2 = {"status": 0};

                                                    bitwebItems.updateItemById(vtr._doc.item._id, data2)
                                                        .then((item) => {
                                                            bitwebVtrs.deleteVtrById(vtrId)
                                                                .then(()=> {
                                                                    bitwebVtrs.deleteVtrTempById(item._doc.vtrTempId)
                                                                        .then((vtrTemp) => {
                                                                            let body3 = {
                                                                                "type": "cancel",
                                                                                "itemId": vtr._doc.item._id,
                                                                                "vtr": vtr,
                                                                                "mach": vtr._doc.item.total_price,
                                                                                "reqUser":vtr._doc.to_userId,
                                                                                "regDate": util.formatDate(new Date().toString())
                                                                            };

                                                                            bitwebVtrs.createEscrow(body3)
                                                                                .then(() => {
                                                                                    console.log('cancel vtr : ', vtr);
                                                                                    // 거래 취소 시 페르소나 API 호출
                                                                                    let seller_userTag = vtrTemp._doc.seller_id;
                                                                                    let url = dbconfig.chatbot_base_url + 'api/v1/vtrs/trade/cancel/'+vtr._doc._id+'/' + seller_userTag;
                                                                                    request({uri: url, 
                                                                                        method:'GET'}, function (error, response, body) {
                                                                                        if (!error && response.statusCode == 200) {
                                                                                            console.log('success : ', body);
                                                                                        } else {
                                                                                            console.log('error = ' + error);
                                                                                        }
                                                                                    });

                                                                                    let result = {
                                                                                        "code": 31,
                                                                                        "msg": '판매자님이 거래를 취소 하였습니다.에스크로에 보관된 거래금액이 구매자님의 지갑으로 환불되었습니다.'
                                                                                    }
                                                                                    if(vtr._doc.sell_status != undefined) {
                                                                                        result = {
                                                                                            "code": 41,
                                                                                            "msg": '판매자님이 거래를 취소 하였습니다.에스크로에 보관된 거래금액이 구매자님의 지갑으로 환불되었습니다.'
                                                                                        }
                                                                                    }

                                                                                    console.log('result=>', vtr);
                                                                                    resolve(result);
                                                                                }).catch((err) => {
                                                                                reject(err)
                                                                            })
                                                                        }).catch((err) => {
                                                                        reject(err)
                                                                    })
                                                                }).catch((err) => {
                                                                reject(err)
                                                            })
                                                        }).catch((err) => {
                                                        reject(err)
                                                    })
                                                }).catch((err) => {
                                                reject(err)
                                            })
                                        })
                                } else {
                                    // OB에서는 임시로 값을 1로 함
                                    //let data2 = {"status": 1};
                                    let data2 = {"status": 0};

                                    bitwebItems.updateItemById(vtr._doc.item._id, data2)
                                        .then((item) => {
                                            bitwebVtrs.deleteVtrById(vtrId)
                                                .then(()=> {
                                                    bitwebVtrs.deleteVtrTempById(item._doc.vtrTempId)
                                                        .then(() => {
                                                            let result = {
                                                                "code": 11,
                                                                "msg": '판매자님이 거래를 취소했습니다.'
                                                            }
                                                            if(vtr._doc.to_userId == userId) {
                                                                result = {
                                                                    "code": 21,
                                                                    "msg": '구매자님이 거래를 취소했습니다.'
                                                                }                
                                                            } 

                                                            console.log('result=>', vtr);
                                                            resolve(result);
                                                        }).catch((err) => {
                                                        reject(err)
                                                    })
                                                }).catch((err) => {
                                                reject(err)
                                            })
                                        }).catch((err) => {
                                        reject(err)
                                    }).catch((err) => {
                                        reject(err)
                                    })
                                }

                            }).catch((err) => {
                                reject(err)
                            })
                        } else {
                            bitwebVtrs.deleteVtrTempByItemId(itemId)
                                .then(vtrTemp => {
                                    let data2 = {"status": 0};
                                    bitwebItems.updateItemById(itemId, data2)
                                        .then((item) => {
                                            console.log('result=>', vtr);
                                            resolve(vtrTemp);
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
            )
    })
}

function opposition(country, itemId) {
    return new Promise((resolve, reject) => {
        // let body = {"status": 3}
        //ui-ux 개편 시 오픈
        let body = {
            "status": 5,
            "item.status": 5,
            "completed": false,
            "opposition_date": util.formatDate(new Date().toString()),
            "auto_completed_confirm_date": "opposition"
        };

        db.connectDB(country)
            .then(() => {
                bitwebVtrs.updateVtrByItemId(itemId, body)
                    .then((result) => {
                        bitwebItems.updateItemById(itemId, body)
                            .then(() => {
                                console.log('result=>', result);
                                resolve(result);
                            }).catch((err) => {
                            console.log('err=>', err);
                            reject(err);
                        });
                    }).catch((err) => {
                    console.log('err=>', err);
                    reject(err);
                });
            }).catch((err) => {
            console.log('err=>', err);
            reject(err);
        });

    });
}

function getItemsByUserId(country, userId, option) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebVtrs.getItemsByUserId(userId, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function createEscrow(country, data) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebVtrs.createEscrow(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getCountCancels(country, params) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getCountCancels(params))
            .then((result) => {
                //console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}


function getCancels(country, params, option) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebVtrs.getCancels(params, option))
            .then((result) => {
                //console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.get = get;
exports.getByVtrId = getByVtrId;
exports.getItemIdsByUserId = getItemIdsByUserId;
exports.getByItemId = getByItemId;
exports.getTempByItemId = getTempByItemId;
exports.create = create;
exports.createByVtr = createByVtr;
exports.updateStatus = updateStatus;
exports.updateById = updateById;
exports.updateWithHistory = updateWithHistory;
exports.updateTotalVtr = updateTotalVtr;
exports.remove = remove;
exports.createVtrTemp = createVtrTemp;
exports.getVtrTemp = getVtrTemp;
exports.removeVtrTemp = removeVtrTemp;
exports.getItemIdsByUserTag = getItemIdsByUserTag;
exports.getVtrs = getVtrs;
exports.updateByItemId = updateByItemId;
exports.getVtrTempByItemId = getVtrTempByItemId;
exports.deleteVtrs = deleteVtrs;
exports.opposition = opposition;
exports.deleteVtrsByItemId = deleteVtrsByItemId;
exports.updateStatusByItemId = updateStatusByItemId;
exports.getItemsByUserId = getItemsByUserId;
exports.createEscrow = createEscrow;
exports.getCountCancels = getCountCancels; 
exports.getCancels = getCancels; 