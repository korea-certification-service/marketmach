var PointHistorys = require('../libs/pointHistorys');

function createPointHistory (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var pointHistorys = new PointHistorys(data)
        pointHistorys.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createPointHistory done: ' + result)
                resolve(result)
            }
        })
    })
}

function getPointHistoryById (id) {
    return new Promise((resolve, reject) => {
        PointHistorys.findOne(
            {"_id": id},
            function(err, pointHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getPointHistoryById done: ' + pointHistory)
                resolve(pointHistory)
            }
        )
    })
}

function getPointHistoryByItemId (itemId) {
    return new Promise((resolve, reject) => {
        PointHistorys.findOne(
            {"itemId": itemId},
            function(err, pointHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getPointHistoryByItemId done: ' + pointHistory)
                resolve(pointHistory)
            }
        )
    })
}

function updatePointHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        PointHistorys.findOneAndUpdate(
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

function deletePointHistoryByItemId(itemId) {
    return new Promise((resolve, reject) => {
        PointHistorys.findOneAndRemove(
            {"itemId":itemId},
            function(err, pointHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('deletePointHistoryByItemId done: ' + pointHistory)
                resolve(pointHistory)
            })
    })
}

function getPointHistorys(data, option) {
    return new Promise((resolve, reject) => {
        PointHistorys.find(data)
        .limit(option.perPage)
        .skip(option.pageIdx * option.perPage)
        .sort({regDate:'desc'})
        .exec(function (err, pointHistorys) {
            if (err) {
                console.error(err)
                reject(err)
            }
            console.log('getPointHistorys done: ' + pointHistorys)
            resolve(pointHistorys)
        })
    })
}

exports.createPointHistory = createPointHistory
exports.getPointHistoryById = getPointHistoryById
exports.updatePointHistoryById = updatePointHistoryById
exports.deletePointHistoryByItemId = deletePointHistoryByItemId
exports.getPointHistoryByItemId = getPointHistoryByItemId
exports.getPointHistorys = getPointHistorys
