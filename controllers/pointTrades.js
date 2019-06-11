
var db = require('../utils/db');
var bitwebPointTrades = require('../services/pointTrades');
var util = require('../utils/util')
var bitwebVtrs = require('../services/vtrs');
var bitwebPoints = require('../services/points');
var bitwebUsers = require('../services/users');
var bitwebItems = require('../services/items');
var bitwebPointHistorys = require('../services/pointHistorys');

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

function getByItemId(country, itemId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebPointTrades.getByItemId(itemId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getItemsByUserId(country, userId, option) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebPointTrades.getItemsByUserId(userId, option))
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
        let pointTax = (req.params.pointTax == undefined ? 0 : req.params.pointTax);
        var data = {};

        data[tradeType + '_status'] = req.body.status;
        data['completed_' + tradeType + '_date'] = util.formatDate(new Date().toString())

        db.connectDB(country)
            .then(() => bitwebPointTrades.updateTradePointById(tradePointId, data))
            .then((result) => {
                console.log('result=>' , result);

                let point = result.item.point;
                let from_userId = result.from_userId;
                let to_userId = result.to_userId;

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
                    //ui-ux 개편 시 오픈
                    let itemId = result._doc.item._id;
                    let body = {"status": 103}
                    bitwebItems.updateItemById(itemId, body)
                        .then((item) => {
                            console.log('result=>', result);
                            resolve(result);
                        }).catch((err) => {
                        console.log('err=>', err)
                    });
                }


                if (result.buy_status == true
                    && result.sell_status == true
                    && tradeType == "confirm") {

                    let data = {}
                    data['completed'] = true;
                    data['completed_date'] = util.formatDate(new Date().toString())

                    bitwebPointTrades.getTradePointById(tradePointId)
                        .then(tradePoint => {

                            if(tradePoint._doc.completed != undefined) {
                                console.log('already completed => ', tradePoint);
                                tradePoint['_doc']['resultType'] = 0;
                                tradePoint['_doc']['resultMsg'] = 'already point trade completed';
                                resolve(tradePoint)
                                return;
                            }

                            bitwebUsers.getUserById(from_userId)
                                .then(user => {
                                    let pointId = user._doc.pointId;
                                    bitwebPoints.getPointById(pointId)
                                        .then(points => {
                                            let user_point = points.total_point;
                                            let discountPoint =  parseInt(point * pointTax);
                                            user_point = user_point + (point - discountPoint);
                                            let point_json = {"total_point": user_point}
                                            bitwebPoints.updatePointById(pointId, point_json)
                                            .then(() => {
                                                bitwebPointTrades.updateTradePointById(tradePointId, data)
                                                    .then((result) => {
                                                        let itemId = result._doc.item._id;
                                                        //ui-ux 개편 시 오픈
                                                        let body = {"status": 104}
                                                        bitwebItems.updateItemById(itemId, body)
                                                            .then((item) => {
                                                                let body3 = {
                                                                    "type": "withdraw",
                                                                    "itemId": result._doc.item._id,
                                                                    "pointTrade": result,
                                                                    "point": point,
                                                                    "reqUser":result._doc.from_userId,
                                                                    "regDate": util.formatDate(new Date().toString())
                                                                };
                                                                
                                                                bitwebVtrs.createEscrow(body3)
                                                                    .then(() => {
                                                                        console.log('result=>', result);
                                                                        resolve(result);
                                                                    }).catch((err) => {
                                                                    console.log('err=>', err)
                                                                    reject(err)
                                                                })
                                                            });
                                                    }).catch((err) => {
                                                    console.log('err=>', err)
                                                    reject(err)
                                                })
                                            }).catch((err) => {
                                            console.log('err=>', err)
                                            reject(err)
                                        })
                                    })
                                }).catch((err) => {
                                console.log('err=>', err)
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
                            bitwebItems.getItemById(itemId)
                                .then((item) => {
                                    if(tradeType == "buy") {
                                        let userTag = item._doc.userTag;
                                        bitwebUsers.getByUserTag(country, userTag)
                                            .then((user) => {
                                                let pointId = user._doc.pointId;
                                                bitwebPoints.getPointById(pointId)
                                                    .then(points => {
                                                        let user_point = points.total_point;
                                                        user_point = user_point + item._doc.total_point;
                                                        let point_json = {"total_point": user_point}
                                                        bitwebPoints.updateTotalPoint(country, pointId, point_json)
                                                            .then(() => bitwebItems.updateItemById(itemId, body))
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
                                                            .then(() => bitwebItems.updateItemById(itemId, body))
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

function deleteByItemId(country, itemId, userId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebPointTrades.getByItemId(itemId)
                .then((pointTrade) => {   
                    if(pointTrade != null) {       
                        let pointTradeId = pointTrade._doc._id;          
                        bitwebUsers.getUserById(pointTrade._doc.to_userId)
                            .then((user) => {
                                if(pointTrade._doc.buy_status != undefined) {
                                    //구매자가 구매 확인 후 취소 요청이 들어 오면 거래 취소 불가능 처리
                                    if(pointTrade._doc.to_userId.toString() == userId) {
                                        if(pointTrade._doc.sell_status == undefined) {
                                            console.log('구매자 구매확인 후 취소 요청 불가');
                                            let result = {
                                                "code": 32,
                                                "msg": '현재 상태에서는 거래취소가 불가능합니다. 판매자님에게 환불을 요청하세요.'
                                            }
                                            resolve(result);
                                            return;
                                        } else {
                                            if(pointTrade._doc.completed != undefined) {
                                                console.log('거래 완료 후 취소 요청 불가');
                                                let result = {
                                                    "code": 52,
                                                    "msg": '거래가 완료되어 거래취소하실 수 없습니다.'
                                                }
                                                resolve(result);
                                                return;
                                            } else {
                                                console.log('구매자 구매확인 후 취소 요청 불가');
                                                let result = {
                                                    "code": 42,
                                                    "msg": '현재 상태에서는 거래취소가 불가능합니다. 판매자님에게 환불을 요청하거나 사이트에서 이의신청 해주세요.'
                                                }
                                                resolve(result);
                                                return;
                                            }
                                        }
                                    } 
                                } 

                                if(pointTrade._doc.completed != undefined) {
                                    console.log('거래 완료 후 취소 요청 불가');
                                    let result = {
                                        "code": 52,
                                        "msg": '거래가 완료되어 거래취소하실 수 없습니다.'
                                    }
                                    resolve(result);
                                    return;
                                }

                                //cancel history 추가
                                bitwebItems.getItemById(pointTrade._doc.item._id)
                                    .then(item => {
                                        let body4 = {
                                            "pointTrade": pointTrade,
                                            "item": item,
                                            "from_userId": pointTrade._doc.from_userId,
                                            "to_userId": pointTrade._doc.to_userId,
                                            "status": "user_cancel",
                                            "refund": pointTrade._doc.buy_status == undefined ? false : true,
                                            "regDate": util.formatDate(new Date().toString())
                                        };

                                        bitwebVtrs.createCancelHistory(body4);
                                    })

                                if(pointTrade._doc.buy_status != undefined) {
                                    let pointId = user._doc.pointId;
                                    bitwebPoints.getPointById(pointId)
                                        .then((point) => {
                                            let total_point = point._doc.total_point + pointTrade._doc.item.total_point;
                                            let data1 = {"total_point": total_point};
                                            bitwebPoints.updatePointById(pointId, data1)
                                                .then(() => {
                                                    let data2 = {"status": 0};

                                                    bitwebItems.updateItemById(pointTrade._doc.item._id, data2)
                                                        .then((item) => {
                                                            bitwebPointTrades.deleteTradePointById(pointTradeId)
                                                                .then(()=> {
                                                                    bitwebVtrs.deleteVtrTempById(item._doc.vtrTempId)
                                                                        .then((vtrTemp) => {
                                                                            let body3 = {
                                                                                "type": "cancel",
                                                                                "itemId": pointTrade._doc.item._id,
                                                                                "pointTrade": pointTrade,
                                                                                "point": pointTrade._doc.item.total_point,
                                                                                "reqUser":pointTrade._doc.to_userId,
                                                                                "regDate": util.formatDate(new Date().toString())
                                                                            };

                                                                            bitwebVtrs.createEscrow(body3)
                                                                                .then(() => {
                                                                                    console.log('cancel pointTrade : ', pointTrade);                                                                                    
                                                                                    let result = {
                                                                                        "code": 31,
                                                                                        "msg": '판매자님이 거래를 취소 하였습니다.에스크로에 보관된 거래금액이 구매자님의 지갑으로 환불되었습니다.'
                                                                                    }
                                                                                    if(pointTrade._doc.sell_status != undefined) {
                                                                                        result = {
                                                                                            "code": 41,
                                                                                            "msg": '판매자님이 거래를 취소 하였습니다.에스크로에 보관된 거래금액이 구매자님의 지갑으로 환불되었습니다.'
                                                                                        }
                                                                                    }

                                                                                    console.log('result=>', pointTrade);
                                                                                    resolve(result);
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
                                                }).catch((err) => {
                                                reject(err)
                                            })
                                        })
                                } else {
                                    // OB에서는 임시로 값을 1로 함
                                    //let data2 = {"status": 1};
                                    let data2 = {"status": 0};

                                    bitwebItems.updateItemById(pointTrade._doc.item._id, data2)
                                        .then((item) => {
                                            bitwebPointTrades.deleteTradePointById(pointTradeId)
                                                .then(()=> {
                                                    bitwebVtrs.deleteVtrTempById(item._doc.vtrTempId)
                                                        .then(() => {
                                                            let result = {
                                                                "code": 11,
                                                                "msg": '판매자님이 거래를 취소했습니다.'
                                                            }
                                                            if(pointTrade._doc.to_userId == userId) {
                                                                result = {
                                                                    "code": 21,
                                                                    "msg": '구매자님이 거래를 취소했습니다.'
                                                                }                
                                                            } 

                                                            console.log('result=>', pointTrade);
                                                            resolve(result);
                                                        }).catch((err) => {
                                                        reject(err)
                                                    })
                                                }).catch((err) => {
                                                reject(err)
                                            })
                                        }).catch((err) => {
                                        reject(err)
                                    }).catch((err) => {
                                        reject(err)
                                    })
                                }

                            }).catch((err) => {
                                reject(err)
                            })
                        } else {
                            bitwebVtrs.deleteVtrTempByItemId(itemId)
                                .then(vtrTemp => {
                                    let data2 = {"status": 0};
                                    bitwebItems.updateItemById(itemId, data2)
                                        .then((item) => {
                                            console.log('result=>', vtr);
                                            resolve(vtrTemp);
                                        }).catch((err) => {
                                        reject(err)
                                    })
                                }).catch((err) => {
                                reject(err)
                            })
                        }
                }).catch((err) => {
                    reject(err)
                })
            )
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
exports.getByItemId = getByItemId;
exports.deleteByItemId = deleteByItemId;
exports.getItemsByUserId = getItemsByUserId;
