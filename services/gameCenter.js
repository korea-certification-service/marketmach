var GameCenter = require('../libs/gameCenter');
var GameCenterHistory = require('../libs/gameCenterHistorys');

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

function getByUserId (userId) {
    return new Promise((resolve, reject) => {
        GameCenter.findOne({
            "userId": userId
        })
        .exec(function (err, result) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            console.log('getByUserId done: ' + result)
            resolve(result)
        })
    })
}

function update (userId, data) {
    return new Promise((resolve, reject) => {
        GameCenter.findOneAndUpdate(
        {
            "userId": userId
        },
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


function addHistory(data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var gameCenterHistory = new GameCenterHistory(data)
        gameCenterHistory.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('addHistory done: ' + result)
                resolve(result)
            }
        })
    })
}

exports.add = add;
exports.getByUserId = getByUserId;
exports.update = update;
exports.addHistory = addHistory;