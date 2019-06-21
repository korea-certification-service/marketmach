
var db = require('../utils/db');
var bitwebCoins = require('../services/coins');
var util = require('../utils/util')

function list(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebCoins.list(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
} 

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var coinId = req.params.coinId;

        db.connectDB(country)
            .then(() => bitwebCoins.getCoinById(coinId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getByCoinId(country, coinId) {

    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebCoins.getCoinById(coinId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function create(req) {
    return new Promise((resolve, reject) => {

        if (req.body.total_mach == undefined) req['body']['total_mach'] = 0

        let country = req.session.country;
        let data = req.body;

        db.connectDB(country)
            .then(() => bitwebCoins.createCoin(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createByCoin(country, coin) {
    return new Promise((resolve, reject) => {

        var data = {};
        if (coin != undefined) {
            data = coin;
        } else {
            data['total_mach'] = 0;
        }


        db.connectDB(country)
            .then(() => bitwebCoins.createCoin(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createWithIds(req, coinId, agreementId, bankId) {
    return new Promise((resolve , reject) => {

        let country = req.session.country;
        var data = req.body;
        delete data['coins'];
        delete data['agreements'];
        delete data['banks'];

        var password = crypto.createHash('sha256').update(req.body.password).digest('base64');
        data['password'] = password;
        data['coinId'] = coinId;
        data['agreementId'] = agreementId;
        data['bankId'] = bankId;
        data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))

        console.log('createWithIds data=>', data);

        db.connectDB(country)
            .then(() => bitwebCoins.createCoin(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function update(req) {
    return new Promise((resolve , reject) => {

        let country = req.session.country;
        var coinId = req.params.coinId;

        var data = {};
        data['email'] = req.body.email;

        if (req.body.password != undefined) {
            var password = crypto.createHash('sha256').update(req.body.password).digest('base64');
            data['password'] = password;
        }

        db.connectDB(country)
            .then(() => bitwebCoins.updateCoinById(coinId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateById(country, id, body) {
    return new Promise((resolve , reject) => {

        var data = body;

        db.connectDB(country)
            .then(() => bitwebCoins.updateCoinById(id, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateWithHistory(country, coinType, coinId, historyId) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => {
                if (coinType == "ether") {
                    bitwebCoins.updateCoinEtherHistoryId(coinId, historyId)
                } else if (coinType == "btc") {
                    bitwebCoins.updateCoinBtcHistoryId(coinId, historyId)
                } else if (coinType == "mach") {
                    bitwebCoins.updateCoinMachHistoryId(coinId, historyId)
                } else {
                    bitwebCoins.updateCoinHistoryId(coinId, historyId)
                }
            })
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateWithWithdrawHistory(country, coinType, coinId, historyId) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => {
                if (coinType == "ether") {
                    bitwebCoins.updateCoinEtherWithdrawHistoryId(coinId, historyId)
                } else if (coinType == "mach") {
                    bitwebCoins.updateCoinMachWithdrawHistoryId(coinId, historyId)
                } else if (coinType == "btc") {
                    bitwebCoins.updateCoinBtcWithdrawHistoryId(coinId, historyId)
                } else {
                    console.log('exception > updateWithWithdrawHistory')
                }
            })
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateTotalCoin(country, coinId, data) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebCoins.updateCoinById(coinId, data))
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
        var coinId = req.params.coinId;

        db.connectDB(country)
            .then(() => bitwebCoins.deleteCoinById(coinId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

exports.list = list;
exports.get = get;
exports.getByCoinId = getByCoinId;
exports.create = create;
exports.createByCoin = createByCoin;
exports.createWithIds = createWithIds;
exports.update = update;
exports.updateById = updateById;
exports.updateWithHistory = updateWithHistory;
exports.updateWithWithdrawHistory = updateWithWithdrawHistory;
exports.updateTotalCoin = updateTotalCoin;
exports.remove = remove;

