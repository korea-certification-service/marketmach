var Ethers = require('../libs/ethers');

function createEther (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var ethers = new Ethers(data)
        ethers.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createEthers done: ' + result)
                resolve(result)
            }
        })
    })
}

function getEtherById (id) {
    return new Promise((resolve, reject) => {
        Ethers.findOne(
            {"_id": id},
            function(err, ether) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getEtherById done: ' + ether)
                resolve(ether)
            }
        )
    })
}

function updateEtherById(etherId, body) {
    return new Promise((resolve, reject) => {
        Ethers.findOneAndUpdate(
            {
                "_id": etherId
            },
            {
                $set: body
            },
            {upsert: false, new: true},
            function (err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateEtherHistoryId(etherId, historyId) {
    return new Promise((resolve, reject) => {

        Ethers.findOneAndUpdate(
            {
                "_id": etherId
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

function updateEtherTotalCoinById(etherId, total_coin) {
    return new Promise((resolve, reject) => {
        Ethers.findOneAndUpdate(
            {
                "_id": etherId
            },
            {
                $set: {"total_coin": total_coin}
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

exports.createEther = createEther
exports.getEtherById = getEtherById
exports.updateEtherById = updateEtherById
exports.updateEtherHistoryId = updateEtherHistoryId
exports.updateEtherTotalCoinById = updateEtherTotalCoinById
