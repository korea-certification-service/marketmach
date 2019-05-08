var db = require('../utils/db');
var bitwebCategories = require('../services/categories');
var util = require('../utils/util')

function getAll(country) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebCategories.getAll())
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getByCategory1(country, category1) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebCategories.getByCategory1(category1))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByRegexCategory1(country, category1) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebCategories.getByRegexCategory1(category1))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.getAll = getAll;
exports.getByCategory1 = getByCategory1;
exports.getByRegexCategory1 = getByRegexCategory1;