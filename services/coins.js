var Coins = require('../libs/coins');

function createCoin (data) {
    return new Promise((resolve, reject) => {
        // console.log(data)
        var coins = new Coins(data)
        coins.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createCoins done: ' + result)
                resolve(result)
            }
        })
    })
}

function list(condition) {
    return new Promise((resolve, reject) => {
        Coins.find(
            condition,
            function(err, coin) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(coin)
            }
        )
    })
}

function getCoinById (id) {
    return new Promise((resolve, reject) => {
        Coins.findOne(
            {
                "_id": id
            })
            .exec(function (err, coin) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getCoinById done: ' + coin)
                resolve(coin)
            })
    })
}

function getCoinByIdAndPassword (data) {
    return new Promise((resolve, reject) => {
        Coins.findOne(
            {
                "coinTag"        : data.coinTag,
                "password"  : data.password
            },
            function(err, coin) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getCoinById done: ' + coin)
                resolve(coin)
            }
        )
    })
}

function getCoinByEmail (email, body) {
    return new Promise((resolve, reject) => {
        Coins.findOne(
            {"email": email},
            function(err, coin) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getCoinById done: ' + coin)
                resolve(coin)
            }
        )
    })
}

function updateCoinById(coinId, body) {
    return new Promise((resolve, reject) => {
        Coins.findOneAndUpdate(
            {"_id": coinId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinHistoryId(coinId, historyId) {
    return new Promise((resolve, reject) => {

        Coins.findOneAndUpdate(
            {
                "_id": coinId
            },
            {
                $push: {historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinEtherHistoryId(coinId, historyId) {
    return new Promise((resolve, reject) => {

        Coins.findOneAndUpdate(
            {
                "_id": coinId
            },
            {
                $push: {ether_historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinEtherWithdrawHistoryId(coinId, historyId) {
    return new Promise((resolve, reject) => {

        Coins.findOneAndUpdate(
            {
                "_id": coinId
            },
            {
                $push: {ether_withdraw_historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinMachWithdrawHistoryId(coinId, historyId) {
    return new Promise((resolve, reject) => {

        Coins.findOneAndUpdate(
            {
                "_id": coinId
            },
            {
                $push: {mach_withdraw_historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinBtcWithdrawHistoryId(coinId, historyId) {
    return new Promise((resolve, reject) => {

        Coins.findOneAndUpdate(
            {
                "_id": coinId
            },
            {
                $push: {btc_withdraw_historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinBtcHistoryId(coinId, historyId) {
    return new Promise((resolve, reject) => {

        Coins.findOneAndUpdate(
            {
                "_id": coinId
            },
            {
                $push: {btc_historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateCoinMachHistoryId(coinId, historyId) {
    return new Promise((resolve, reject) => {

        Coins.findOneAndUpdate(
            {
                "_id": coinId
            },
            {
                $push: {mach_historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function deleteCoinById (id) {
    return new Promise((resolve, reject) => {
        Coins.findByIdAndRemove(
            id,
            function(err, coin) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getCoinById done: ' + coin)
                resolve(coin)
            }
        )
    })
}

exports.list = list;
exports.createCoin = createCoin;
exports.getCoinById = getCoinById;
exports.getCoinByIdAndPassword = getCoinByIdAndPassword;
exports.getCoinByEmail = getCoinByEmail;
exports.updateCoinById = updateCoinById;
exports.updateCoinHistoryId = updateCoinHistoryId;
exports.updateCoinEtherHistoryId = updateCoinEtherHistoryId;
exports.updateCoinBtcHistoryId = updateCoinBtcHistoryId;
exports.updateCoinMachHistoryId = updateCoinMachHistoryId;
exports.updateCoinEtherWithdrawHistoryId = updateCoinEtherWithdrawHistoryId;
exports.updateCoinMachWithdrawHistoryId = updateCoinMachWithdrawHistoryId;
exports.updateCoinBtcWithdrawHistoryId = updateCoinBtcWithdrawHistoryId;
exports.deleteCoinById = deleteCoinById;
