var db = require('../utils/db');
var bitwebUsers = require('../services/users');
var bitwebPoints = require('../services/points');
var bitwebPointBankHistorys = require('../services/pointBankHistorys');
var util = require('../utils/util')

function listBankHistorys(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        let userId = req.params.userId == undefined ? req.session.userId : req.params.userId ;
        let type = req.params.type; //deposit, withdraw
        let pageIdx = req.query.pageIdx == undefined ? 0 : req.query.pageIdx;
        let perPage = req.query.perPage == undefined ? 10 : req.query.perPage;

        let data = {};
        data['type'] = type;
        if (pageIdx != undefined) data['pageIdx'] = parseInt(pageIdx);
        if (perPage != undefined) data['perPage'] = parseInt(perPage);

        db.connectDB(country)
            .then(() =>  bitwebUsers.getUserById(userId)
                .then((user) => {
                    let pointId = user._doc.pointId;
                    bitwebPoints.getPointById(pointId)
                        .then((point) => {
                            data['bankHistorys'] = point._doc.bank_historys;
                            bitwebPointBankHistorys.listBankHistorys(data)
                                .then((result) => {
                                    console.log('result=>' , result);
                                    if(point._doc.bank_account_type != undefined) {
                                        for(var i in result) {
                                            result[i]['_doc']['bank_account_type'] = point._doc.bank_account_type;
                                            result[i]['_doc']['bank_account'] = point._doc.bank_account;
                                        }
                                    }
                                    resolve(result)
                                }).catch((err) => {
                                    reject(err)
                                })
                        }).catch((err) => {
                            reject(err)
                        })
                }).catch((err) => {
                    reject(err)
                })
    )

    })
}

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var historyId = req.params.historyId;

        db.connectDB(country)
            .then(() => bitwebPointBankHistorys.getPointBankHistoryById(historyId))
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
            .then(() => bitwebPointBankHistorys.createPointBankHistory(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createPointBankHistoryByPointBankId(country, pointBankId , body) {
    return new Promise((resolve, reject) => {

        var data = body;
        data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))

        db.connectDB(country)
            .then(() => bitwebPointBankHistorys.createPointBankHistory(data))
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
            .then(() => bitwebPointBankHistorys.updatePointBankHistoryById(historyId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updatePointBankHistoryStatusById(country, historyId) {
    return new Promise((resolve , reject) => {

        var data = {};
        data['completeDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
        data['status'] = true;
        db.connectDB(country)
            .then(() => bitwebPointBankHistorys.updatePointBankHistoryById(historyId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.listBankHistorys = listBankHistorys;
exports.get = get;
exports.create = create;
exports.createPointBankHistoryByPointBankId = createPointBankHistoryByPointBankId;
exports.update = update;
exports.updatePointBankHistoryStatusById = updatePointBankHistoryStatusById;
