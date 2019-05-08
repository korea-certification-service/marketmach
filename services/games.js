var Games = require('../libs/games');
var Games_cn = require('../libs/games_cn');

function createGame (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var games = new Games(data)
        games.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createGames done: ' + result)
                resolve(result)
            }
        })
    })
}

function insertBulk (data) {
    return new Promise((resolve, reject) => {
        // console.log(data)
        Games.insertMany(data)
            .then((result) => {
                console.log('result=>', result)
                resolve(result)
            })
            .catch(err => {
                console.log('err=>', err)
                reject(err)
            })
    })
}

function insertBulkCn (data) {
    return new Promise((resolve, reject) => {
        // console.log(data)
        Games_cn.insertMany(data)
            .then((result) => {
                console.log('result=>', result)
                resolve(result)
            })
            .catch(err => {
                console.log('err=>', err)
                reject(err)
            })
    })
}
function getCnGameAll () {
    return new Promise((resolve, reject) => {
        Games_cn.find(
            {},
            function(err, game) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                // console.log('getGameAll done: ' + game)
                resolve(game)
            }
        )
    })
}

function getCnGameByName (gameName) {
    return new Promise((resolve, reject) => {
        Games_cn.findOne(
            {"game_name": gameName},
            function(err, game) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                // console.log('gameName done: ' + game)
                resolve(game)
            }
        )
    })
}

function getCnByRegexGameName (gameName) {
    return new Promise((resolve, reject) => {
        Games_cn.find(
            {"game_name": { $regex: gameName, $options: 'i' }},
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('gameName done: ' + game)
                resolve(game)
            }
        )
    })
}


function getGameAll () {
    return new Promise((resolve, reject) => {
        Games.find(
            {},
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('getGameAll done: ' + game)
                resolve(game)
            }
        )
    })
}

function getGameByName (gameName) {
    return new Promise((resolve, reject) => {
        Games.findOne(
            {"game_name": gameName},
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('gameName done: ' + game)
                resolve(game)
            }
        )
    })
}

function getByRegexGameName (gameName) {
    return new Promise((resolve, reject) => {
        Games.find(
            {"game_name": { $regex: gameName, $options: 'i' }},
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('gameName done: ' + game)
                resolve(game)
            }
        )
    })
}

function getGameById (id) {
    return new Promise((resolve, reject) => {
        Games.findOne(
            {"_id": id},
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('getGameById done: ' + game)
                resolve(game)
            }
        )
    })
}

function getGameByIdAndPassword (data) {
    return new Promise((resolve, reject) => {
        Games.findOne(
            {
                "gameTag"        : data.gameTag,
                "password"  : data.password
            },
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('getGameById done: ' + game)
                resolve(game)
            }
        )
    })
}

function getGameByEmail (email, body) {
    return new Promise((resolve, reject) => {
        Games.findOne(
            {"email": email},
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('getGameById done: ' + game)
                resolve(game)
            }
        )
    })
}

function updateGameById(gameId, body) {
    return new Promise((resolve, reject) => {
        Games.findOneAndUpdate(
            {"_id": gameId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateGameHistoryId(gameId, historyId) {
    return new Promise((resolve, reject) => {

        Games.findOneAndUpdate(
            {
                "_id": gameId
            },
            {
                $push: {historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function deleteGameById (id) {
    return new Promise((resolve, reject) => {
        Games.findByIdAndRemove(
            id,
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getGameById done: ' + game)
                resolve(game)
            }
        )
    })
}

exports.insertBulk = insertBulk;
exports.insertBulkCn = insertBulkCn;
exports.createGame = createGame;
exports.getCnGameAll = getCnGameAll;
exports.getCnGameByName = getCnGameByName;
exports.getCnByRegexGameName = getCnByRegexGameName;
exports.getGameAll = getGameAll;
exports.getGameByName = getGameByName;
exports.getByRegexGameName = getByRegexGameName;
exports.getGameById = getGameById;
exports.getGameByIdAndPassword = getGameByIdAndPassword;
exports.getGameByEmail = getGameByEmail;
exports.updateGameById = updateGameById;
exports.updateGameHistoryId = updateGameHistoryId;
exports.deleteGameById = deleteGameById;
