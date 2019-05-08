var PointBankHistorys = require('../libs/pointBankHistorys');

function createPointBankHistory (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var pointBankHistorys = new PointBankHistorys(data)
        pointBankHistorys.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createPointBankHistory done: ' + result)
                resolve(result)
            }
        })
    })
}

function listBankHistorys(data) {
    return new Promise((resolve, reject) => {
        PointBankHistorys.find(
            {
                $and: [
                    {"type": data.type},
                    {"_id": { $in: data.bankHistorys}},
                ]
            })
            .limit(data.perPage)
            .skip(data.pageIdx * data.perPage)
            .sort({regDate:'desc'})
            .exec(function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('getItemByRequired done: ' + item)
                resolve(item)
            })
    })
}

function getPointBankHistoryById (id) {
    return new Promise((resolve, reject) => {
        PointBankHistorys.findOne(
            {"_id": id},
            function(err, pointBankHistory) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getPointBankHistoryById done: ' + pointBankHistory)
                resolve(pointBankHistory)
            }
        )
    })
}

function updatePointBankHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        PointBankHistorys.findOneAndUpdate(
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

exports.listBankHistorys = listBankHistorys;
exports.createPointBankHistory = createPointBankHistory
exports.getPointBankHistoryById = getPointBankHistoryById
exports.updatePointBankHistoryById = updatePointBankHistoryById
