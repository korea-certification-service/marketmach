var db = require('../utils/db');
var bitwebPointHistorys = require('../services/pointHistorys');
var util = require('../utils/util')

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var historyId = req.params.historyId;

        db.connectDB(country)
            .then(() => bitwebPointHistorys.getPointHistoryById(historyId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getByItemId(country, itemId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebPointHistorys.getPointHistoryByItemId(itemId))
            .then((result) => {
                console.log('result=>' , result);
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
            .then(() => bitwebPointHistorys.createPointHistory(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createPointHistoryByPointId(country, pointId , body) {
    return new Promise((resolve, reject) => {

        var data = {};
        data['point'] = body.point;
        data['pointId'] = pointId;
        data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['completeDate'] = "";
        data['status'] = false;
        data['trade_type'] = body.trade_type;
        data['from_userId'] = body.from_userId;
        data['to_userId'] = body.to_userId;

        db.connectDB(country)
            .then(() => bitwebPointHistorys.createPointHistory(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createPointHistory(country, pointId, itemId, body) {
    return new Promise((resolve, reject) => {

        var data = {};
        data['point'] = body.point;
        data['pointId'] = pointId;
        data['itemId'] = itemId;
        data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['completeDate'] = "";
        data['status'] = false;
        data['trade_type'] = body.trade_type;
        data['from_userId'] = body.from_userId;
        data['to_userId'] = body.to_userId;

        db.connectDB(country)
            .then(() => bitwebPointHistorys.createPointHistory(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function update(req) {
    return new Promise((resolve , reject) => {

        let country = req.session.country;
        var historyId = req.params.historyId;
        var data = req.body;

        db.connectDB(country)
            .then(() => bitwebPointHistorys.updatePointHistoryById(historyId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updatePointHistoryStatusById(country, historyId) {
    return new Promise((resolve , reject) => {

        var data = {};
        data['completeDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['status'] = true;

        db.connectDB(country)
            .then(() => bitwebPointHistorys.updatePointHistoryById(historyId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getPointHistorys(country, data, option) {
    return new Promise((resolve , reject) => {
        db.connectDB(country)
            .then(() => bitwebPointHistorys.getPointHistorys(data, option))
            .then((result) => {
                //console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.get = get;
exports.create = create;
exports.createPointHistoryByPointId = createPointHistoryByPointId;
exports.update = update;
exports.updatePointHistoryStatusById = updatePointHistoryStatusById;
exports.createPointHistory = createPointHistory
exports.getByItemId = getByItemId;
exports.getPointHistorys = getPointHistorys;
