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

exports.add = add;
exports.getByUserId = getByUserId;
exports.update = update;
exports.addHistory = addHistory;
exports.updateRecord = updateRecord;
