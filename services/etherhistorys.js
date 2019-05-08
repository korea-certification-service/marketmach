var EtherHistorys = require('../libs/etherHistorys');

function createEtherHistory (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var etherHistorys = new EtherHistorys(data)
        etherHistorys.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createEtherHistory done: ' + result)
                resolve(result)
            }
    })
})
}

function getEtherHistoryById (id) {
    return new Promise((resolve, reject) => {
        EtherHistorys.findOne(
            {"_id": id},
            function(err, etherHistory) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getEtherHistoryById done: ' + etherHistory)
                resolve(etherHistory)
            }
        )
    })
}

function updateEtherHistoryById (historyId, body) {
    return new Promise((resolve, reject) => {
        EtherHistorys.findOneAndUpdate(
            {"_id": historyId
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

exports.createEtherHistory = createEtherHistory
exports.getEtherHistoryById = getEtherHistoryById
exports.updateEtherHistoryById = updateEtherHistoryById
