var AuthPhones = require('../libs/authPhones');

function count(condition, option) {
    return new Promise((resolve, reject) => {
        AuthPhones.count(condition)
        .exec(function(err, authPhones) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(authPhones)
        })
    })
}

function list(condition, option) {
    return new Promise((resolve, reject) => {
        AuthPhones.find(condition)
        .limit(option.perPage)
        .skip(option.pageIdx * option.perPage)
        .sort({regDate:'desc'})
        .exec(function(err, authPhones) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(authPhones)
        })
    })
}

function add(reqData) {
    return new Promise((resolve, reject) => {
        var authPhones = new AuthPhones(reqData)
        authPhones.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

exports.count = count;
exports.list = list;
exports.add = add;