
var db = require('../utils/db');
var bitwebGames = require('../services/games');
var util = require('../utils/util')

function getAll(country) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebGames.getGameAll())
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var gameId = req.params.gameId;

        db.connectDB(country)
            .then(() => bitwebGames.getGameById(gameId))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getByGameName(country, gameName) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGames.getGameByName(gameName))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByRegexGameName(country, gameName) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGames.getByRegexGameName(gameName))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByGameId(country, gameId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGames.getGameById(gameId))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function create(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var data = req.body;

        db.connectDB(country)
            .then(() => bitwebGames.createGame(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createByGame(country, game) {
    return new Promise((resolve, reject) => {

        var data = game;
        db.connectDB(country)
            .then(() => bitwebGames.createGame(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function insertBulk(country, game_list) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebGames.insertBulk(game_list))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function insertBulkCn(country, game_list) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebGames.insertBulkCn(game_list))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function createWithIds(req, gameId, agreementId, bankId) {
    return new Promise((resolve , reject) => {

        let country = req.session.country;
        var data = req.body;
        delete data['games'];
        delete data['agreements'];
        delete data['banks'];

        var password = crypto.createHash('sha256').update(req.body.password).digest('base64');
        data['password'] = password;
        data['gameId'] = gameId;
        data['agreementId'] = agreementId;
        data['bankId'] = bankId;
        data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))

        console.log('createWithIds data=>', data);

        db.connectDB(country)
            .then(() => bitwebGames.createGame(data))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function update(req) {
    return new Promise((resolve , reject) => {

        let country = req.session.country;
        var gameId = req.params.gameId;

        var data = req.body;

        db.connectDB(country)
            .then(() => bitwebGames.updateGameById(gameId, data))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateById(country, id, body) {
    return new Promise((resolve , reject) => {

        var data = body;

        db.connectDB(country)
            .then(() => bitwebGames.updateGameById(id, data))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateWithHistory(country, gameId, historyId) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebGames.updateGameHistoryId(gameId, historyId))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateTotalGame(country, gameId, data) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebGames.updateGameById(gameId, data))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function remove(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var gameId = req.params.gameId;

        db.connectDB(country)
            .then(() => bitwebGames.deleteGameById(gameId))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getCnAll(country) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebGames.getCnGameAll())
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}
function getCnByGameName(country, gameName) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebGames.getCnGameByName(gameName))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getCnByRegexGameName(country, gameName) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebGames.getCnByRegexGameName(gameName))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.getAll = getAll;
exports.get = get;
exports.getByGameName = getByGameName;
exports.getByGameId = getByGameId;
exports.getByRegexGameName = getByRegexGameName;
exports.insertBulk = insertBulk;
exports.insertBulkCn = insertBulkCn;
exports.create = create;
exports.createByGame = createByGame;
exports.createWithIds = createWithIds;
exports.update = update;
exports.updateById = updateById;
exports.updateWithHistory = updateWithHistory;
exports.updateTotalGame = updateTotalGame;
exports.remove = remove;
exports.getCnAll = getCnAll;
exports.getCnByGameName = getCnByGameName;
exports.getCnByRegexGameName = getCnByRegexGameName;

