var GameCenter = require('../libs/gameCenter');
var GameCenterHistory = require('../libs/gameCenterHistorys');
var GameCenterRecord = require('../libs/gameCenterRecords');
var GameCenterRecordHistory = require('../libs/gameCenterRecordHistorys');
var GameCenterExchangeHistory = require('../libs/gameCenterExchangeHistory');

function add(data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var gameCenter = new GameCenter(data)
        gameCenter.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('add done: ' + result)
                resolve(result)
            }
        })
    })
}

function getByUserId (userId) {
    return new Promise((resolve, reject) => {
        GameCenter.findOne({
            "userId": userId
        })
        .exec(function (err, result) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            console.log('getByUserId done: ' + result)
            resolve(result)
        })
    })
}

function update (userId, data) {
    return new Promise((resolve, reject) => {
        GameCenter.findOneAndUpdate(
        {
            "userId": userId
        },
        {
            $set: data
        },
        {upsert: false, new: true},
        function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }
            console.log('getByUserId done: ' + result)
            resolve(result)
        })
    })
}

function updateByCondition (condition, data) {
    return new Promise((resolve, reject) => {
        GameCenter.findOneAndUpdate(
            condition,
            data,
        {upsert: false, new: true},
        function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }
            console.log('updateByCondition done: ' + result)
            resolve(result)
        })
    })
}

function addHistory(data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var gameCenterHistory = new GameCenterHistory(data)
        gameCenterHistory.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('addHistory done: ' + result)
                resolve(result)
            }
        })
    })
}

function getHistoryCount (condition) {
    return new Promise((resolve, reject) => {
        GameCenterHistory.count(condition)
        .exec(function (err, result) {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}


function getHistorys (condition) {
    return new Promise((resolve, reject) => {
        GameCenterHistory.find(condition)
        .exec(function (err, result) {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

function getRecords (condition) {
    return new Promise((resolve, reject) => {
        GameCenterRecord.findOne(condition)
        .exec(function (err, result) {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}


function updateRecord(data) {
    return new Promise((resolve, reject) => {
        GameCenterRecord.findOneAndUpdate(
        {
            "gameCenterId":data.gameCenterId,
            "service": data.service
        },
        {
            $set: data
        },
        {upsert: false, new: true},
        function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            if(result == null) {
                var gameCenterRecord = new GameCenterRecord(data)
                gameCenterRecord.save(function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        console.log('add done: ' + result)
                        resolve(result)
                        return;
                    }
                })
            }
            
            console.log('updateRecord done: ' + result)
            resolve(result)
        })
    })
}

function updateRecordHistory(data) {
    return new Promise((resolve, reject) => {
        var gameCenterRecordHistory = new GameCenterRecordHistory(data)
        gameCenterRecordHistory.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}

function addExchangeHistory(data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var gameCenterExchangeHistory = new GameCenterExchangeHistory(data)
        gameCenterExchangeHistory.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('addHistory done: ' + result)
                resolve(result)
            }
        })
    })
}

function getExchangeHistoryCount (condition,option) {
    return new Promise((resolve, reject) => {
        GameCenterExchangeHistory
        .count(condition)
        .skip(option.pageIdx * option.perPage)
        .sort({regDate:'desc'})
        .exec(function (err, result) {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

function getExchangeHistorys (condition,option) {
    return new Promise((resolve, reject) => {
        GameCenterExchangeHistory
        .find(condition)
        .skip(option.pageIdx * option.perPage)
        .sort({regDate:'desc'})
        .exec(function (err, result) {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}


exports.add = add;
exports.getByUserId = getByUserId;
exports.update = update;
exports.addHistory = addHistory;
exports.getHistorys = getHistorys;
exports.getHistoryCount = getHistoryCount;
exports.updateRecord = updateRecord;
exports.getRecords = getRecords;
exports.addExchangeHistory = addExchangeHistory;
exports.getExchangeHistorys = getExchangeHistorys;
exports.updateByCondition = updateByCondition;
exports.getExchangeHistoryCount = getExchangeHistoryCount;
exports.updateRecordHistory = updateRecordHistory;