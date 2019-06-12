var db = require('../utils/db');
var bitwebAuthPhones = require('../services/authPhones');

function count(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebAuthPhones.count(condition))
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
            .then(() => bitwebAuthPhones.list(condition, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function add(country, reqData) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebAuthPhones.add(reqData))
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
exports.add = add;