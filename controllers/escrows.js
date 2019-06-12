var db = require('../utils/db');
var bitwebEscrows = require('../services/escrows');
var util = require('../utils/util');

function count(country, condition, option) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebEscrows.count(condition, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function list(country, condition, option) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebEscrows.list(condition, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function detail(condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebEscrows.detail(condition))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.count = count;
exports.list = list;
exports.detail = detail;
exports.count = count;