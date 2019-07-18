var db = require('../utils/db');
var bitwebGameCenter = require('../services/gameCenter');

function add(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.add(data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByUserId(country, userId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.getByUserId(userId))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getRecords(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.getRecords(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateByCondition(country, condition, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.updateByCondition(condition, data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function update(country, userId, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.update(userId, data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function addHistory(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.addHistory(data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getHistorys(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.getHistorys(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}


function getHistoryCount(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.getHistoryCount(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}


function updateRecord(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.updateRecord(data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function addExchangeHistory(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.addExchangeHistory(data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getExchangeHistoryCount(country, condition, option) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.getExchangeHistoryCount(condition, option))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getExchangeHistorys(country, condition, option) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGameCenter.getExchangeHistorys(condition, option))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
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