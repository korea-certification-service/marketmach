var db = require('../utils/db');
var bitwebCms = require('../services/cms');

function getCmsList(country) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebCms.getCmsList())
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.getCmsList = getCmsList;