var CoinHistorys = require('../libs/coinHistorys');
var CoinEtherHistorys = require('../libs/coinEtherHistorys');
var CoinMachHistorys = require('../libs/coinMachHistorys');
var CoinBtcHistorys = require('../libs/coinBtcHistorys');
var CoinEtherWithdrawHistory = require('../libs/coinEtherWithdrawHistorys');
var CoinMachWithdrawHistory = require('../libs/coinMachWithdrawHistorys');
var CoinBtcWithdrawHistory = require('../libs/coinBtcWithdrawHistorys');

function createCoinHistory (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var coinHistorys = new CoinHistorys(data)
        coinHistorys.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                //console.log('createCoinHistory done: ' + result)
                resolve(result)
            }
        })
    })
}

function createCoinEtherHistorys (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var coinEtherHistorys = new CoinEtherHistorys(data)
        coinEtherHistorys.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createCoinEtherHistorys done: ' + result)
                resolve(result)
            }
        })
    })
}

function createCoinMachHistorys (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var coinMachHistorys = new CoinMachHistorys(data)
        coinMachHistorys.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createCoinMachHistorys done: ' + result)
                resolve(result)
            }
        })
    })
}

function createCoinEtherWithdrawHistorys (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var coinEtherWithdrawHistory = new CoinEtherWithdrawHistory(data)
        coinEtherWithdrawHistory.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createCoinEtherWithdrawHistorys done: ' + result)
                resolve(result)
            }
        })
    })
}

function createCoinMachWithdrawHistorys (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var coinMachWithdrawHistory = new CoinMachWithdrawHistory(data)
        coinMachWithdrawHistory.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createCoinEtherWithdrawHistorys done: ' + result)
                resolve(result)
            }
        })
    })
}

function createCoinBtcWithdrawHistorys (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var coinBtcWithdrawHistory = new CoinBtcWithdrawHistory(data)
        coinBtcWithdrawHistory.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createCoinBtcWithdrawHistorys done: ' + result)
                resolve(result)
            }
        })
    })
}

function createCoinBtcHistorys (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var coinBtcHistorys = new CoinBtcHistorys(data)
        coinBtcHistorys.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createCoinBtcHistorys done: ' + result)
                resolve(result)
            }
        })
    })
}

function getCoinHistoryById (id) {
    return new Promise((resolve, reject) => {
        CoinHistorys.findOne(
            {"_id": id},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getCoinHistoryById done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinEtherHistorys (ids) {
    return new Promise((resolve, reject) => {
        CoinEtherHistorys.find(
            {'_id': { $in: ids}},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                for (var i = 0; i < coinHistory.length; i ++) {
                    coinHistory[i]._doc.type = "ether"
                }
                // console.log('getCoinEtherHistoryById done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinMachHistorys (ids) {
    return new Promise((resolve, reject) => {
        CoinMachHistorys.find(
            {'_id': { $in: ids}},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                for (var i = 0; i < coinHistory.length; i ++) {
                    coinHistory[i]._doc.type = "mach"
                }
                // console.log('getCoinMachHistorys done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinBtcHistorys (ids) {
    return new Promise((resolve, reject) => {
        CoinBtcHistorys.find(
            {'_id': { $in: ids}},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                for (var i = 0; i < coinHistory.length; i ++) {
                    coinHistory[i]._doc.type = "btc"
                }
                // console.log('getCoinBtcHistorys done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinEtherWithdrawHistorysByIds (ids) {
    return new Promise((resolve, reject) => {
        CoinEtherWithdrawHistory.find(
            {'_id': { $in: ids}},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                for (var i = 0; i < coinHistory.length; i ++) {
                    coinHistory[i]._doc.type = "ether"
                }
                // console.log('getCoinEtherHistoryById done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinMachWithdrawHistorysByIds (ids) {
    return new Promise((resolve, reject) => {
        CoinMachWithdrawHistory.find(
            {'_id': { $in: ids}},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                for (var i = 0; i < coinHistory.length; i ++) {
                    coinHistory[i]._doc.type = "mach"
                }
                console.log('getCoinMachHistorys done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinBtcWithdrawHistorysByIds (ids) {
    return new Promise((resolve, reject) => {
        CoinBtcWithdrawHistory.find(
            {'_id': { $in: ids}},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                for (var i = 0; i < coinHistory.length; i ++) {
                    coinHistory[i]._doc.type = "btc"
                }
                console.log('getCoinBtcHistorys done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinEtherHistoryById (id) {
    return new Promise((resolve, reject) => {
        CoinEtherHistorys.findOne(
            {"_id": id},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getCoinEtherHistoryById done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinMachHistoryById (id) {
    return new Promise((resolve, reject) => {
        CoinMachHistorys.findOne(
            {"_id": id},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getCoinMachHistoryById done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinBtcHistoryById (id) {
    return new Promise((resolve, reject) => {
        CoinBtcHistorys.findOne(
            {"_id": id},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getCoinBtcHistoryById done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinEtherWithdrawHistorys (id) {
    return new Promise((resolve, reject) => {
        CoinEtherWithdrawHistory.findOne(
            {"_id": id},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getCoinEtherWithdrawHistorys done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinMachWithdrawHistorys (id) {
    return new Promise((resolve, reject) => {
        CoinMachWithdrawHistory.findOne(
            {"_id": id},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getCoinMachWithdrawHistorys done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function getCoinBtcWithdrawHistorys (id) {
    return new Promise((resolve, reject) => {
        CoinBtcWithdrawHistory.findOne(
            {"_id": id},
            function(err, coinHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getCoinBtcWithdrawHistorys done: ' + coinHistory)
                resolve(coinHistory)
            }
        )
    })
}

function updateCoinHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        CoinHistorys.findOneAndUpdate(
            {"_id": historyId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinEtherHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        CoinEtherHistorys.findOneAndUpdate(
            {"_id": historyId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinMachHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        CoinMachHistorys.findOneAndUpdate(
            {"_id": historyId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinBtcHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        CoinBtcHistorys.findOneAndUpdate(
            {"_id": historyId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinEtherWithdrawHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        CoinEtherWithdrawHistory.findOneAndUpdate(
            {"_id": historyId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinMachWithdrawHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        CoinMachWithdrawHistory.findOneAndUpdate(
            {"_id": historyId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinBtcWithdrawHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        CoinBtcWithdrawHistory.findOneAndUpdate(
            {"_id": historyId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function getDepositHistorybyCoinId(coinId, option) {
    return new Promise((resolve, reject) => {
        CoinHistorys.find(
            {
                "coinId": coinId
            })
            .limit(option.perPage)
            .skip(option.pageIdx * option.perPage)
            .sort({regDate:'desc'})
            .exec(function (err, coinHistorys) {
                if (err) {
                    //console.error(err)
                    reject(err)
                }
                //console.log('getDepositHistorybyCoinId done: ' + coinHistorys)
                resolve(coinHistorys)
            })
    })
}

function getDepositHistoryCountbyCoinId(coinId, option) {
    return new Promise((resolve, reject) => {
        CoinHistorys.count(
            {
                "coinId": coinId,
                "category": option.category
            })
            .exec(function (err, coinHistorys) {
                if (err) {
                    //console.error(err)
                    reject(err)
                }
                //console.log('getDepositHistorybyCoinId done: ' + coinHistorys)
                resolve(coinHistorys)
            })
    })
}

function getCoinHistoryExtByCoinId (condition, option) {
    return new Promise((resolve, reject) => {
        CoinHistorys.find(condition)
            .limit(option.perPage)
            .skip(option.pageIdx * option.perPage)
            .sort({regDate:'desc'})
            .exec(function (err, coinHistorys) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getCoinHistoryExtByCoinId done: ' + coinHistorys)
                resolve(coinHistorys)
            }
        )
    })
}

function getCountCoinHistoryExtByCoinId (condition) {
    return new Promise((resolve, reject) => {
        CoinHistorys.count(condition)
            .exec(function (err, coinHistorys) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(coinHistorys)
            }
        )
    })
}

function getCoinHistorys(data, option) {
    return new Promise((resolve, reject) => {
        CoinHistorys.find(data)
        .limit(option.perPage)
        .skip(option.pageIdx * option.perPage)
        .sort({regDate:'desc'})
        .exec(function (err, coinHistorys) {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(coinHistorys)
        })
    })
}

function getCoinHistory(data) {
    return new Promise((resolve, reject) => {
        CoinHistorys.findOne(data)
        .exec(function (err, coinHistory) {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(coinHistory)
        })
    })
}

function removeCoinHistory(condition) {
    return new Promise((resolve, reject) => {
        CoinHistorys.findOneAndRemove(condition)
        .exec(function (err, coinHistory) {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(coinHistory)
        })
    })
}

exports.createCoinHistory = createCoinHistory
exports.createCoinEtherHistorys = createCoinEtherHistorys
exports.createCoinMachHistorys = createCoinMachHistorys
exports.createCoinBtcHistorys = createCoinBtcHistorys
exports.createCoinEtherWithdrawHistorys = createCoinEtherWithdrawHistorys
exports.createCoinMachWithdrawHistorys = createCoinMachWithdrawHistorys
exports.createCoinBtcWithdrawHistorys = createCoinBtcWithdrawHistorys
exports.getCoinEtherHistorys = getCoinEtherHistorys
exports.getCoinMachHistorys = getCoinMachHistorys
exports.getCoinBtcHistorys = getCoinBtcHistorys
exports.getCoinEtherWithdrawHistorysByIds = getCoinEtherWithdrawHistorysByIds
exports.getCoinMachWithdrawHistorysByIds = getCoinMachWithdrawHistorysByIds
exports.getCoinBtcWithdrawHistorysByIds = getCoinBtcWithdrawHistorysByIds
exports.getCoinHistoryById = getCoinHistoryById
exports.getCoinEtherHistoryById = getCoinEtherHistoryById
exports.getCoinMachHistoryById = getCoinMachHistoryById
exports.getCoinBtcHistoryById = getCoinBtcHistoryById
exports.getCoinEtherWithdrawHistorys = getCoinEtherWithdrawHistorys
exports.getCoinMachWithdrawHistorys = getCoinMachWithdrawHistorys
exports.getCoinBtcWithdrawHistorys = getCoinBtcWithdrawHistorys
exports.updateCoinHistoryById = updateCoinHistoryById
exports.updateCoinEtherHistoryById = updateCoinEtherHistoryById
exports.updateCoinMachHistoryById = updateCoinMachHistoryById
exports.updateCoinBtcHistoryById = updateCoinBtcHistoryById
exports.updateCoinEtherWithdrawHistoryById = updateCoinEtherWithdrawHistoryById
exports.updateCoinMachWithdrawHistoryById = updateCoinMachWithdrawHistoryById
exports.updateCoinBtcWithdrawHistoryById = updateCoinBtcWithdrawHistoryById
exports.getDepositHistorybyCoinId = getDepositHistorybyCoinId;
exports.getDepositHistoryCountbyCoinId = getDepositHistoryCountbyCoinId;
exports.getCoinHistoryExtByCoinId = getCoinHistoryExtByCoinId;
exports.getCoinHistorys = getCoinHistorys;
exports.getCoinHistory = getCoinHistory;
exports.getCountCoinHistoryExtByCoinId = getCountCoinHistoryExtByCoinId;
exports.removeCoinHistory = removeCoinHistory;