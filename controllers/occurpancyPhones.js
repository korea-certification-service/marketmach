var db = require('../utils/db');
var bitwebOccupancyPhones = require('../services/occupancyPhones');

function count(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebOccupancyPhones.count(condition))
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
            .then(() => bitwebOccupancyPhones.list(condition, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function detail(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebOccupancyPhones.detail(condition))
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
            .then(() => bitwebOccupancyPhones.add(reqData))
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
exports.detail = detail;