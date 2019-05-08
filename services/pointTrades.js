var TradePoints = require('../libs/pointTrades');

function createTradePoint (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var tradePoints = new TradePoints(data)
        tradePoints.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createTradePoints done: ' + result)
                resolve(result)
            }
        })
    })
}

function getItemIdsByUserId(data) {
    if (data['pageIdx'] == undefined) data['pageIdx'] = 0
    if (data['perPage'] == undefined) data['perPage'] = 10

    return new Promise((resolve, reject) => {
        TradePoints.find(
            {
                $or: [{"from_userId": data.userId}, {"to_userId": data.userId}]
            })
            .limit(data.perPage)
            .skip(data.pageIdx * data.perPage)
            .sort({regDate:'desc'})
            .exec(function(err, items) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getItemIdsByUserId done: ' + items)
                resolve(items)
            })
    })
}

function getTradePointById (id) {
    return new Promise((resolve, reject) => {
        TradePoints.findOne(
            {"_id": id},
            function(err, tradePoint) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getTradePointById done: ' + tradePoint)
                resolve(tradePoint)
            }
        )
    })
}

function getTradePointByIdAndUserId (id, userId) {
    return new Promise((resolve, reject) => {
        TradePoints.findOne({
            "_id":id,
            $or: [{"from_userId": userId}, {"to_userId": userId}]
        })
            .exec(function(err, tradePoint) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    console.log('getTradePointById done: ' + tradePoint)
                    resolve(tradePoint)
                }
            )
    })
}

function getTradePointByIdAndPassword (data) {
    return new Promise((resolve, reject) => {
        TradePoints.findOne(
            {
                "tradePointTag"        : data.tradePointTag,
                "password"  : data.password
            },
            function(err, tradePoint) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getTradePointById done: ' + tradePoint)
                resolve(tradePoint)
            }
        )
    })
}

function getTradePointByEmail (email, body) {
    return new Promise((resolve, reject) => {
        TradePoints.findOne(
            {"email": email},
            function(err, tradePoint) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getTradePointById done: ' + tradePoint)
                resolve(tradePoint)
            }
        )
    })
}

function updateTradePointById(pointId, body) {
    return new Promise((resolve, reject) => {
        TradePoints.findOneAndUpdate(
            {"_id": pointId
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

function updateTradePointHistoryId(pointId, historyId) {
    return new Promise((resolve, reject) => {

        TradePoints.findOneAndUpdate(
            {
                "_id": pointId
            },
            {
                $push: {historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function deleteTradePointById (id) {
    return new Promise((resolve, reject) => {
        TradePoints.findByIdAndRemove(
            id,
            function(err, tradePoint) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('deleteTradePointById done: ' + tradePoint)
                resolve(tradePoint)
            }
        )
    })
}

exports.createTradePoint = createTradePoint;
exports.getTradePointById = getTradePointById;
exports.getTradePointByIdAndUserId = getTradePointByIdAndUserId;
exports.getTradePointByIdAndPassword = getTradePointByIdAndPassword;
exports.getTradePointByEmail = getTradePointByEmail;
exports.updateTradePointById = updateTradePointById;
exports.updateTradePointHistoryId = updateTradePointHistoryId;
exports.deleteTradePointById = deleteTradePointById;
exports.getItemIdsByUserId = getItemIdsByUserId;
