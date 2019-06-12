var Escrows = require('../libs/escrows');

function count(condition, option) {
    return new Promise((resolve, reject) => {
        Escrows.count(condition)
        .exec(function(err, escrows) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(escrows)
        })
    })
}

function list(condition, option) {
    return new Promise((resolve, reject) => {
        Escrows.find(condition)
        .limit(option.perPage)
        .skip(option.pageIdx * option.perPage)
        .sort({regDate:'desc'})
        .exec(function(err, escrows) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(escrows)
        })
    })
}

function detail(condition) {
    return new Promise((resolve, reject) => {
        Escrows.find(condition)
        .exec(function(err, escrow) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(escrow)
        })
    })
}

exports.count = count;
exports.list = list;
exports.detail = detail;