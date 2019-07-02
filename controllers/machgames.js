var db = require('../utils/db');
var bitwebMachgames = require('../services/machgames');

function add(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebMachgames.add(data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function count(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebMachgames.count(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function list(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebMachgames.list(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function get(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebMachgames.get(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function update(country, condition, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebMachgames.update(condition, data))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.add = add;
exports.update = update;
exports.count = count;
exports.list = list;
exports.get = get;
