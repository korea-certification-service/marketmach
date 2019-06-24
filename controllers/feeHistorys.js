let bitwebFeeHistorys = require('../services/feeHistorys');
let db = require('../utils/db');

function list(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebFeeHistorys.list(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function detail(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebFeeHistorys.detail(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function add(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebFeeHistorys.createFeeHistory(data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function modify(country, condition, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebFeeHistorys.modify(condition, data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function remove(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebFeeHistorys.remove(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

exports.list = list;
exports.detail = detail;
exports.add = add;
exports.modify = modify;
exports.remove = remove;