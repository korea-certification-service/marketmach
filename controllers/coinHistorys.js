var db = require('../utils/db');
var bitwebCoinHistorys = require('../services/coinHistorys');
var util = require('../utils/util')

function getDepositHistorys(country, historyIds, coinType) {
    return new Promise((resolve, reject) => {

        if (historyIds.length > 0) {
            db.connectDB(country)
                .then(() => {

                    if (coinType == "ether") {
                        bitwebCoinHistorys.getCoinEtherHistorys(historyIds)
                            .then((result) => {
                                console.log('result=>', result);
                                resolve(result)
                            })
                    } else if (coinType == "mach") {
                        bitwebCoinHistorys.getCoinMachHistorys(historyIds)
                            .then((result) => {
                                console.log('result=>', result);
                                resolve(result)
                            })
                    } else if (coinType == "btc") {
                        bitwebCoinHistorys.getCoinBtcHistorys(historyIds)
                            .then((result) => {
                                console.log('result=>', result);
                                resolve(result)
                            })
                    } else {
                        console.log('not select ! getCoinHistoryById api')
                        reject(-1)
                    }
                }).catch((err) => {
                reject(err)
            })
        } else {
            resolve([])
        }
    })
}

function getWithdrawHistorys(country, historyIds, coinType) {
    return new Promise((resolve, reject) => {

        if (historyIds.length > 0) {
            db.connectDB(country)
                .then(() => {

                    if (coinType == "ether") {
                        bitwebCoinHistorys.getCoinEtherWithdrawHistorysByIds(historyIds)
                            .then((result) => {
                                console.log('result=>', result);
                                resolve(result)
                            })
                    } else if (coinType == "mach") {
                        bitwebCoinHistorys.getCoinMachWithdrawHistorysByIds(historyIds)
                            .then((result) => {
                                console.log('result=>', result);
                                resolve(result)
                            })
                    } else if (coinType == "btc") {
                        bitwebCoinHistorys.getCoinBtcWithdrawHistorysByIds(historyIds)
                            .then((result) => {
                                console.log('result=>', result);
                                resolve(result)
                            })
                    } else {
                        console.log('not select ! getCoinHistoryById api')
                        reject(-1)
                    }
                }).catch((err) => {
                reject(err)
            })
        } else {
            resolve([])
        }
    })
}

function getDeposit(req) {
    return new Promise((resolve, reject) => {

        var historyId = req.params.historyId;
        var coinType = req.params.coinType;
        let country = req.session.country;

        db.connectDB(country)
            .then(() => {

                if (coinType == "ether") {
                    bitwebCoinHistorys.getCoinEtherHistoryById(historyId)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        })
                } else if (coinType == "mach") {
                    bitwebCoinHistorys.getCoinMachHistoryById(historyId)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        })
                } else if (coinType == "btc") {
                    bitwebCoinHistorys.getCoinBtcHistoryById(historyId)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        })
                } else {
                    console.log('not select ! getCoinHistoryById api')
                }
            }).catch((err) => {
            reject(err)
        })
    })

}

function getWithdraw(req) {
    return new Promise((resolve, reject) => {

        var historyId = req.params.historyId;
        var coinType = req.params.coinType;
        let country = req.session.country;

        db.connectDB(country)
            .then(() => {

                if (coinType == "ether") {
                    bitwebCoinHistorys.getCoinEtherWithdrawHistorys(historyId)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        })
                } else if (coinType == "mach") {
                    bitwebCoinHistorys.getCoinMachWithdrawHistorys(historyId)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        })
                } else if (coinType == "btc") {
                    bitwebCoinHistorys.getCoinBtcWithdrawHistorys(historyId)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        })
                } else {
                    console.log('not select ! getCoinHistoryById api')
                    reject(-1)
                }
            }).catch((err) => {
            reject(err)
        })
    })

}

function create(req) {
    return new Promise((resolve, reject) => {

        var data = req.body;
        let country = req.session.country;

        db.connectDB(country)
            .then(() => bitwebCoinHistorys.createCoinHistory(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function createData(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebCoinHistorys.createCoinHistory(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function createCoinHistoryByCoinId(country, coinId , req) {
    return new Promise((resolve, reject) => {

        var data = {};
        data['price'] = req.body.price;
        data['coinId'] = coinId;
        // data['type'] = req.params.coinType;
        data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['completeDate'] = "";
        data['status'] = false;
        data['mach'] = req.body.mach;
        data['from_userId'] = req.body.from_userId;
        data['to_userId'] = req.body.to_userId;

        db.connectDB(country)
            .then(() => {
                if (req.params.coinType == "ether") {
                    bitwebCoinHistorys.createCoinEtherHistorys(data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else if (req.params.coinType == "btc") {
                    bitwebCoinHistorys.createCoinBtcHistorys(data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else if (req.params.coinType == "mach") {
                    bitwebCoinHistorys.createCoinMachHistorys(data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else {
                    console.log('not create ! createCoinHistoryByCoinId api')
                    reject(-1)
                }
            })

    })

}

function createCoinWithdrawHistoryByCoinId(country, coinId , data) {
    return new Promise((resolve, reject) => {

        data['coinId'] = coinId;
        // data['type'] = req.params.coinType;
        data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['completeDate'] = "";
        data['status'] = false;

        db.connectDB(country)
            .then(() => {
                if (data.coinType == "ether") {
                    bitwebCoinHistorys.createCoinEtherWithdrawHistorys(data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else if (data.coinType == "btc") {
                    bitwebCoinHistorys.createCoinBtcWithdrawHistorys(data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else if (data.coinType == "mach") {
                    bitwebCoinHistorys.createCoinMachWithdrawHistorys(data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else {
                    bitwebCoinHistorys.createCoinHistory(data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                }
            })

    })

}

function update(req) {
    return new Promise((resolve , reject) => {

        let country = req.session.country;
        var historyId = req.params.historyId;
        var data = req.body;

        db.connectDB(country)
            .then(() => bitwebCoinHistorys.updateCoinHistoryById(historyId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateCoinHistoryStatusById(country, historyId, history) {
    return new Promise((resolve , reject) => {

        var data = {};
        data['completeDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['status'] = true;
        data['completedPrice'] = history.completedPrice;

        db.connectDB(country)
            .then(() => {

                if (history['type'] == "ether") {
                    bitwebCoinHistorys.updateCoinEtherHistoryById(historyId, data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else if (history['type'] == "btc") {
                    bitwebCoinHistorys.updateCoinBtcHistoryById(historyId, data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else if (history['type'] == "mach") {
                    bitwebCoinHistorys.updateCoinMachHistoryById(historyId, data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else if (history['type'] == "ether_withdraw") {
                    bitwebCoinHistorys.updateCoinEtherWithdrawHistoryById(historyId, data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else if (history['type'] == "mach_withdraw") {
                    bitwebCoinHistorys.updateCoinMachWithdrawHistoryById(historyId, data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                } else if (history['type'] == "btc_withdraw") {
                    bitwebCoinHistorys.updateCoinBtcWithdrawHistoryById(historyId, data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                }
                else {
                    bitwebCoinHistorys.updateCoinHistoryById(historyId, data)
                        .then((result) => {
                            console.log('result=>' , result);
                            resolve(result)
                        }).catch((err) => {
                        reject(err)
                    })
                }
            })

    })
}

function updateCoinEtherHistoryStatusById(country, historyId) {
    return new Promise((resolve , reject) => {

        var data = {};
        data['completeDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['status'] = true;
        db.connectDB(country)
            .then(() => bitwebCoinHistorys.updateCoinEtherHistoryById(historyId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateCoinBtcHistoryStatusById(country, historyId) {
    return new Promise((resolve , reject) => {

        var data = {};
        data['completeDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['status'] = true;
        db.connectDB(country)
            .then(() => bitwebCoinHistorys.updateCoinBtcHistoryById(historyId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getDepositHistorybyCoinId(country, coinId, option) {
    return new Promise((resolve , reject) => {
        db.connectDB(country)
            .then(() => bitwebCoinHistorys.getDepositHistorybyCoinId(coinId, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getDepositHistoryCountbyCoinId(country, coinId, option) {
    return new Promise((resolve , reject) => {
        db.connectDB(country)
            .then(() => bitwebCoinHistorys.getDepositHistoryCountbyCoinId(coinId, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function createCoinHistoryExtByCoinId(country, data) {
    return new Promise((resolve , reject) => {
        db.connectDB(country)
            .then(() => bitwebCoinHistorys.createCoinHistory(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getCoinHistoryExtByCoinId(country, condition, option) {
    return new Promise((resolve , reject) => {
        db.connectDB(country)
            .then(() => bitwebCoinHistorys.getCoinHistoryExtByCoinId(condition, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getCoinHistorys(country, data, option) {
    return new Promise((resolve , reject) => {
        db.connectDB(country)
            .then(() => bitwebCoinHistorys.getCoinHistorys(data, option))
            .then((result) => {
                //console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.createCoinHistoryExtByCoinId = createCoinHistoryExtByCoinId;
exports.getDepositHistorys = getDepositHistorys;
exports.getWithdrawHistorys = getWithdrawHistorys;
exports.getDeposit = getDeposit;
exports.getWithdraw = getWithdraw;
exports.create = create;
exports.createData = createData;
exports.createCoinHistoryByCoinId = createCoinHistoryByCoinId;
exports.createCoinWithdrawHistoryByCoinId = createCoinWithdrawHistoryByCoinId;
exports.update = update;
exports.updateCoinHistoryStatusById = updateCoinHistoryStatusById;
exports.updateCoinEtherHistoryStatusById = updateCoinEtherHistoryStatusById;
exports.updateCoinBtcHistoryStatusById = updateCoinBtcHistoryStatusById;
exports.getDepositHistorybyCoinId = getDepositHistorybyCoinId;
exports.getDepositHistoryCountbyCoinId = getDepositHistoryCountbyCoinId;
exports.getCoinHistoryExtByCoinId = getCoinHistoryExtByCoinId;
exports.getCoinHistorys = getCoinHistorys;