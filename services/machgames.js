var MachGames = require('../libs/machgames');

function count (condition) {
    return new Promise((resolve, reject) => {
        GameCenter.count(condition)
        .exec(function (err, result) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(result)
        })
    })
}

function list (condition) {
    return new Promise((resolve, reject) => {
        GameCenter.find(condition)
        .exec(function (err, result) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(result)
        })
    })
}

function get (condition) {
    return new Promise((resolve, reject) => {
        GameCenter.findOne(condition)
        .exec(function (err, result) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(result)
        })
    })
}

function add(data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var gameCenter = new GameCenter(data)
        gameCenter.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('add done: ' + result)
                resolve(result)
            }
        })
    })
}

function update (condition, data) {
    return new Promise((resolve, reject) => {
        GameCenter.findOneAndUpdate(
            condition,
        {
            $set: data
        },
        {upsert: false, new: true},
        function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }
            console.log('getByUserId done: ' + result)
            resolve(result)
        })
    })
}

exports.add = add;
exports.get = get;
exports.update = update;
exports.count = count;
exports.list = list;