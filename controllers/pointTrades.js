
var db = require('../utils/db');
var bitwebPointTrades = require('../services/pointTrades');
var util = require('../utils/util')

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var tradePointId = req.params.tradePointId;

        db.connectDB(country)
            .then(() => bitwebPointTrades.getTradePointById(tradePointId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getItemIdsByUserId(data) {
    return new Promise((resolve, reject) => {
        db.connectDB(data.country)
            .then(() => bitwebPointTrades.getItemIdsByUserId(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getTradePointById(country, tradePointId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebPointTrades.getTradePointById(tradePointId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function create(req, itemId) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        let pointId = req.body.pointId;
        let status = 2;
        var data = req.body;

        let controllerItems = require('../controllers/items');
        let controllerPointHistorys = require('../controllers/pointHistorys');

        const tradePointData = {
            "item":req.body.item,
            "from_userId": req.body.from_userId,
            "to_userId": req.body.to_userId,
            "regDate": util.formatDate(new Date().toLocaleString('ko-KR'))
        }

        const historyData = {
            "point": req.body.point,
            "pointId": req.body.pointId,
            "trade_type":req.body.trade_type,
            "from_userId": req.body.from_userId,
            "to_userId": req.body.to_userId
        }

        db.connectDB(country)
            .then(() => {
                controllerPointHistorys.createPointHistory(country, pointId, itemId, historyData)
                    .then(() => {
                        bitwebPointTrades.createTradePoint(tradePointData)
                            .then((tradePoint) => {
                                let tradePointId = tradePoint._doc._id;
                                controllerItems.updateStatusAndTradePointIdById(country, itemId, status,tradePointId)
                                    .then   ((result) => {
                                        result.tradePointId = tradePointId;
                                        console.log('result=>' , result);
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
            }).catch((err) => {
            reject(err)
        })
    })

}

function createByTradePoint(country, tradePoint) {
    return new Promise((resolve, reject) => {

        var data = tradePoint;
        db.connectDB(country)
            .then(() => bitwebPointTrades.createTradePoint(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
                //to-do : items status update 필요 - 2
            }).catch((err) => {
            reject(err)
        })
    })

}

function updateStatus(req) {
    return new Promise((resolve , reject) => {

        let country = req.session.country;
        var tradePointId = req.params.tradePointId;
        var tradeType = req.params.tradeType;
        let pointTax = (req.params.pointTax == undefined ? 0.03 : req.params.pointTax);
        var data = {};

        data[tradeType + '_status'] = req.body.status;
        data['completed_' + tradeType + '_date'] = util.formatDate(new Date().toLocaleString('ko-KR'))

        db.connectDB(country)
            .then(() => bitwebPointTrades.updateTradePointById(tradePointId, data))
            .then((result) => {
                console.log('result=>' , result);

                let point = result.item.point;
                let from_userId = result.from_userId;
                let to_userId = result.to_userId;

                let bitwebUsers = require('../controllers/users');
                let bitwebPoints = require('../controllers/points');
                let bitwebItems = require('../controllers/items');

                if (tradeType == "buy") {
                    // bitwebUsers.getById(country, to_userId)
                    //     .then(user => {
                    //         let pointId = user._doc.pointId;
                    //         bitwebPoints.getByPointId(country, pointId)
                    //             .then(points => {
                    //                 let user_point = points.total_point;
                    //                 user_point = user_point - point;
                    //                 let point_json = {"total_point": user_point}
                    //                 bitwebPoints.updateTotalPoint(country, pointId, point_json)
                    //             })
                    //     }).catch((err) => {
                    //         console.log('err=>', err)
                    //     })
                } else if (tradeType == "sell") {

                    bitwebPointTrades.getTradePointById(tradePointId)
                        .then(tradePoint => {

                            if(tradePoint._doc.completed != undefined) {
                                console.log('already completed => ', tradePoint);
                                tradePoint['_doc']['resultType'] = 0;
                                tradePoint['_doc']['resultMsg'] = 'already point trade completed';
                                resolve(tradePoint)
                                return;
                            }

                            bitwebUsers.getById(country, from_userId)
                                .then(user => {
                                    let pointId = user._doc.pointId;
                                    bitwebPoints.getByPointId(country, pointId)
                                        .then(points => {
                                            let user_point = points.total_point;
                                            let discountPoint =  parseInt(point * pointTax);
                                            user_point = user_point + (point - discountPoint);
                                            let point_json = {"total_point": user_point}
                                            bitwebPoints.updateTotalPoint(country, pointId, point_json)
                                        })
                                }).catch((err) => {
                                console.log('err=>', err)
                            })
                    })
                }


                if (result.buy_status == true
                    && result.sell_status == true) {

                    let data = {}
                    data['completed'] = true;
                    data['completed_date'] = util.formatDate(new Date().toLocaleString('ko-KR'))


                        bitwebPointTrades.updateTradePointById(tradePointId, data)
                            .then((result) => {
                                console.log('result=>' , result);
                                //to-do : items status update 필요 - 3
                                bitwebPointTrades.getTradePointById(tradePointId)
                                    .then(tradePoint => {
                                    let itemId = tradePoint._doc.item._id;
                                    let status = 3;
                                    let controllerItems = require('../controllers/items');
                                    let controllerPointHistorys = require('../controllers/pointHistorys');

                                    controllerItems.updateStatusAndTradePointIdById(country, itemId, status, tradePointId)
                                        .then(result => {
                                            controllerPointHistorys.getByItemId(country, itemId)
                                                .then((pointHistory) => {
                                                    let pointHistoryId = pointHistory._id;
                                                    controllerPointHistorys.updatePointHistoryStatusById(country, pointHistoryId)
                                                        .then(() => {
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
                                })
                            })
                } else {
                    resolve(result)
                }
            }).catch((err) => {
            reject(err)
        })
    })
}

// function updateById(country, id, body) {
//     return new Promise((resolve , reject) => {
//
//         var data = body;
//
//         db.connectDB(country)
//             .then(() => bitwebPointTrades.updateTradePointById(id, data))
//             .then((result) => {
//                 console.log('result=>' , result);
//                 resolve(result)
//             }).catch((err) => {
//             reject(err)
//         })
//     })
// }

// function updateWithHistory(country, pointId, historyId) {
//     return new Promise((resolve , reject) => {
//
//         db.connectDB(country)
//             .then(() => bitwebPointTrades.updateTradePointHistoryId(pointId, historyId))
//             .then((result) => {
//                 console.log('result=>' , result);
//                 resolve(result)
//             }).catch((err) => {
//             reject(err)
//         })
//     })
// }

// function updateTotalPoint(country, pointId, data) {
//     return new Promise((resolve , reject) => {
//
//         db.connectDB(country)
//             .then(() => bitwebPointTrades.updateTradePointById(pointId, data))
//             .then((result) => {
//                 console.log('result=>' , result);
//                 resolve(result)
//             }).catch((err) => {
//             reject(err)
//         })
//     })
// }

function remove(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        let tradePointId = req.params.tradePointId;
        let tradeType = req.params.tradeType;
        let bitwebUsers = require('../controllers/users');
        let bitwebItems = require('../controllers/items');
        let bitwebPoints = require('../controllers/points');
        var bitwebPointHistorys = require('../services/pointHistorys');

        db.connectDB(country)
            .then(() => bitwebPointTrades.getTradePointById(tradePointId))
                .then((tradePoint) => {

                    if(tradePoint._doc.completed != undefined) {
                        console.log('already completed => ', tradePoint);
                        tradePoint['_doc']['resultType'] = 0;
                        tradePoint['_doc']['resultMsg'] = 'already point trade completed';
                        resolve(tradePoint)
                        return;
                    }
                    bitwebPointTrades.deleteTradePointById(tradePointId)
                        .then(() => {
                            let itemId = tradePoint._doc.item._id;
                            let body = {'status': 0, 'tradePointId':''};
                            bitwebItems.getByItemId(country, itemId, "", "")
                                .then((item) => {
                                    if(tradeType == "buy") {
                                        let userTag = item._doc.userTag;
                                        bitwebUsers.getByUserTag(country, userTag)
                                            .then((user) => {
                                                let pointId = user._doc.pointId;
                                                bitwebPoints.getByPointId(country, pointId)
                                                    .then(points => {
                                                        let user_point = points.total_point;
                                                        user_point = user_point + item._doc.total_point;
                                                        let point_json = {"total_point": user_point}
                                                        bitwebPoints.updateTotalPoint(country, pointId, point_json)
                                                            .then(() => bitwebItems.updateById(country, itemId, body))
                                                            .then(() => bitwebPointHistorys.deletePointHistoryByItemId(itemId))
                                                            .then((result) => {
                                                                console.log('result=>', result);
                                                                item['_doc']['resultType'] = 1;
                                                                resolve(item)
                                                            }).catch((err) => {
                                                            reject(err)
                                                        })
                                                    }).catch((err) => {
                                                    console.log('err=>', err)
                                                })
                                            }).catch((err) => {
                                            console.log('err=>', err)
                                        })
                                    } else {
                                        let userId = tradePoint.to_userId;
                                        bitwebUsers.getById(country, userId)
                                            .then((user) => {
                                                let pointId = user._doc.pointId;
                                                bitwebPoints.getByPointId(country, pointId)
                                                    .then(points => {
                                                        let user_point = points.total_point;
                                                        user_point = user_point + item._doc.total_point;
                                                        let point_json = {"total_point": user_point}
                                                        bitwebPoints.updateTotalPoint(country, pointId, point_json)
                                                            .then(() => bitwebItems.updateById(country, itemId, body))
                                                            .then(() => bitwebPointHistorys.deletePointHistoryByItemId(itemId))
                                                            .then((result) => {
                                                                console.log('result=>', result);
                                                                item['_doc']['resultType'] = 1;
                                                                resolve(item)
                                                            }).catch((err) => {
                                                            reject(err)
                                                        })
                                                    }).catch((err) => {
                                                    console.log('err=>', err)
                                                })
                                            }).catch((err) => {
                                            console.log('err=>', err)
                                        })
                                    }
                                }).catch((err) => {
                                console.log('err=>', err)
                            })
                })
            })
    })

}

exports.get = get;
exports.getItemIdsByUserId = getItemIdsByUserId;
exports.getTradePointById = getTradePointById;
exports.create = create;
exports.createByTradePoint = createByTradePoint;
exports.updateStatus = updateStatus;
// exports.updateById = updateById;
// exports.updateWithHistory = updateWithHistory;
// exports.updateTotalPoint = updateTotalPoint;
exports.remove = remove;

