var db = require('../utils/db');
var bitwebEtherHistorys = require('../services/etherhistorys');
var util = require('../utils/util')

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var historyId = req.params.historyId;

        db.connectDB(country)
            .then(() => bitwebEtherHistorys.getEtherHistoryById(historyId))
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
            .then(() => bitwebEtherHistorys.createEtherHistory(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createEtherHistoryByEtherId(country, etherId , body) {
    return new Promise((resolve, reject) => {

        var data = {};
        data['coin'] = body.coin;
        data['etherId'] = etherId;
        data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['completeDate'] = "";
        data['status'] = false;
        data['bonus'] = body.bonus;
        data['mach'] = body.mach;

        db.connectDB(country)
            .then(() => bitwebEtherHistorys.createEtherHistory(data))
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
            .then(() => bitwebEtherHistorys.updateEtherHistoryById(historyId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateEtherHistoryStatusById(country, historyId) {
    return new Promise((resolve , reject) => {

        var data = {};
        data['completeDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['status'] = true;
        db.connectDB(country)
            .then(() => bitwebEtherHistorys.updateEtherHistoryById(historyId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.get = get;
exports.create = create;
exports.createEtherHistoryByEtherId = createEtherHistoryByEtherId;
exports.update = update;
exports.updateEtherHistoryStatusById = updateEtherHistoryStatusById;
