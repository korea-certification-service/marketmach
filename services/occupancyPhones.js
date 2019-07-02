var OccupancyPhones = require('../libs/occupancyPhones');

function count(condition, option) {
    return new Promise((resolve, reject) => {
        OccupancyPhones.count(condition)
        .exec(function(err, occupancyPhones) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(occupancyPhones)
        })
    })
}

function list(condition, option) {
    return new Promise((resolve, reject) => {
        OccupancyPhones.find(condition)
        .limit(option.perPage)
        .skip(option.pageIdx * option.perPage)
        .sort({regDate:'desc'})
        .exec(function(err, occupancyPhones) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(occupancyPhones)
        })
    })
}

function detail(condition) {
    return new Promise((resolve, reject) => {
        OccupancyPhones.findOne(condition)
        .sort({regDate:'desc'})
        .exec(function(err, occupancyPhone) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(occupancyPhone)
        })
    })
}

function add(reqData) {
    return new Promise((resolve, reject) => {
        var occupancyPhones = new OccupancyPhones(reqData)
        occupancyPhones.save(function (err, result) {
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
exports.detail = detail;