var db = require('../utils/db');
var bitwebItems = require('../services/items');
var util = require('../utils/util')

function get(country) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebItems.getItemAll())
            .then((result) => {
                //console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getItemCount(country, data) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebItems.getItemCount(data))
            .then((result) => {
                //console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getItemByRequired(country, data) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebItems.getItemByRequired(data))
            .then((result) => {
                //console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getItemByUserTag(country, data) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebItems.getItemByUserTag(data))
            .then((result) => {
                //console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByTradeType(country, data) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebItems.getItemAllByTradeType(data))
            .then((result) => {
                //console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getByItemId(country, itemId, userId, userTag) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebItems.getItemById(itemId))
            .then((result) => {
                //console.log('result=>', result);
                if(result != null && result.tradePointId != undefined && result.tradePointId != "") {
                    var bitwebPointTrades = require('../services/pointTrades');
                    bitwebPointTrades.getTradePointByIdAndUserId(result.tradePointId, userId)
                        .then((result1) =>{
                            if(result1 == null) {
                                result['_doc']['point_btn_active'] = false;
                            } else {
                                result['_doc']['point_btn_active'] = true;
                            }
                            result['_doc']['tradePoint'] = result1;
                            resolve(result)
                        })
                } else {
                    if(result.status > 0) {
                        let bitwebVtrs = require('../services/vtrs');
                        let data = {
                            "itemId": itemId,
                            "userTag": userTag
                        }
                        bitwebVtrs.getItemIdsByUserIdAndItemId(data)
                            .then((vtr) => {
                                if(vtr.length > 0) {
                                    result['_doc']['vtr_btn_active'] = true;
                                    result['_doc']['payment_status'] = 0;
                                    result['_doc']['from_userTag'] = vtr[0].from_userTag;
                                    result['_doc']['to_userTag'] = vtr[0].to_userTag;
                                } else {
                                    result['_doc']['vtr_btn_active'] = false;

                                    if(vtr.buy_status == undefined) {
                                        result['_doc']['payment_status'] = 1;
                                    } else if(vtr.sell_status == undefined) {
                                        result['_doc']['payment_status'] = 2;
                                    } else {
                                        result['_doc']['payment_status'] = 3;
                                    }
                                }
                                resolve(result)
                            })
                    } else {
                        resolve(result)
                    }
                }
            }).catch((err) => {
            reject(err)
        })
    })
}

function getItemsCountByIds(country, params) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebItems.getItemsCountByIds(params))
            .then((result) => {
                //console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}


function getItemsByIds(country, params, option) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebItems.getItemsByIds(params, option))
            .then((result) => {
                //console.log('result=>', result);
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
            .then(() => bitwebItems.createItem(data))
            .then((result) => {
                console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createByItem(country, item) {
    return new Promise((resolve, reject) => {

        var data = item;
        data['regDate'] = util.formatDate(new Date().toString())

        db.connectDB(country)
            .then(() => bitwebItems.createItem(data))
            .then((result) => {
                console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function update(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var itemId = req.params.itemId;

        var data = {};
        data['email'] = req.body.email;

        if (req.body.password != undefined) {
            var password = crypto.createHash('sha256').update(req.body.password).digest('base64');
            data['password'] = password;
        }

        db.connectDB(country)
            .then(() => bitwebItems.updateItemById(itemId, data))
            .then((result) => {
                console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateById(country, id, body) {
    return new Promise((resolve, reject) => {

        var data = body;

        db.connectDB(country)
            .then(() => bitwebItems.updateItemById(id, data))
            .then((result) => {
                console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateWithHistory(country, itemId, historyId) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebItems.updateItemHistoryId(itemId, historyId))
            .then((result) => {
                console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateTotalItem(country, itemId, data) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebItems.updateItemById(itemId, data))
            .then((result) => {
                console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function remove(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var itemId = req.params.itemId;

        db.connectDB(country)
            .then(() => bitwebItems.deleteItemById(itemId))
            .then((result) => {
                console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function updateStatusAndTradePointIdById(country, itemId, status, tradePointId) {
    return new Promise((resolve, reject) => {

        var data = {};
        data['status'] = status;
        data['tradePointId'] = tradePointId;

        db.connectDB(country)
            .then(() => bitwebItems.updateItemById(itemId, data))
            .then((result) => {
                console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function checkTotalCoin(country, itemId, userId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebItems.getItemById(itemId)
                .then((item) => {
                    let bitwebUsers = require('../services/users');
                    let bitwebCoins = require('../services/coins');
                    bitwebUsers.getUserById(userId)
                        .then((user) => {
                            bitwebCoins.getCoinById(user._doc.coinId)
                                .then((coin) => {
                                    let result = {};
                                    if(coin._doc.total_mach == undefined) {
                                        result['check_total_coin'] = false;
                                    } else {
                                        if (item._doc.total_price > coin._doc.total_mach) {
                                            result['check_total_coin'] = false;
                                        } else {
                                            result['check_total_coin'] = true;
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

function checkTotalPoint(country, itemId, userId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebItems.getItemById(itemId)
                .then((item) => {
                    let bitwebUsers = require('../services/users');
                    let bitwebPoints = require('../services/points');
                    bitwebUsers.getUserById(userId)
                        .then((user) => {
                            bitwebPoints.getPointById(user._doc.pointId)
                                .then((point) => {
                                    let result = {};
                                    if(point._doc.total_point == undefined) {
                                        result['check_total_coin'] = false;
                                    } else {
                                        if (item._doc.total_point > point._doc.total_point) {
                                            result['check_total_coin'] = false;
                                        } else {
                                            result['check_total_coin'] = true;
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

function getItemCountByUserTag(country, userTag) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebItems.getItemCountByUserTag(userTag))
            .then((result) => {
                //console.log('result=>', result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getReply(country, req) {
    return new Promise((resolve, reject) => {

        var itemId = req.params.itemId;

        db.connectDB(country)
            .then(() => bitwebItems.getReplies(itemId))
            .then((replies) => {
                resolve(replies)
            }).catch((err) => {
                reject(err)
            })
    })
}

function addReply(country, req) {
    return new Promise((resolve, reject) => {

        let body = req.body;
        body['regDate'] = util.formatDate(new Date().toString())

        db.connectDB(country)
            .then(() => bitwebItems.addReply(body))
            .then((reply) => {
                console.log('result=>', reply);
                resolve(reply)
            }).catch((err) => {
            reject(err)
        })
    })
}

function modifyReply(country, req) {
    return new Promise((resolve, reject) => {

        let replyId = req.params.replyId;
        let body = req.body;

        db.connectDB(country)
            .then(() => bitwebItems.updateReply(replyId, body))
            .then((reply) => {
                console.log('result=>', reply);
                resolve(reply)
            }).catch((err) => {
            reject(err)
        })
    })
}

function deleteReply(country, req) {
    return new Promise((resolve, reject) => {

        let replyId = req.params.replyId;
        
        db.connectDB(country)
            .then(() => bitwebItems.deleteReply(replyId))
            .then((reply) => {
                console.log('result=>', reply);
                resolve(reply)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.get = get;
exports.getItemByRequired = getItemByRequired;
exports.getItemByUserTag = getItemByUserTag;
exports.getByTradeType = getByTradeType;
exports.getByItemId = getByItemId;
exports.getItemsByIds = getItemsByIds;
exports.create = create;
exports.createByItem = createByItem;
exports.update = update;
exports.updateById = updateById;
exports.updateWithHistory = updateWithHistory;
exports.updateTotalItem = updateTotalItem;
exports.remove = remove;
exports.updateStatusAndTradePointIdById = updateStatusAndTradePointIdById;
exports.checkTotalCoin = checkTotalCoin;
exports.checkTotalPoint = checkTotalPoint;
exports.getItemCount = getItemCount;
exports.getItemsCountByIds = getItemsCountByIds;
exports.getItemCountByUserTag = getItemCountByUserTag;
exports.getReply = getReply;
exports.addReply = addReply;
exports.modifyReply = modifyReply;
exports.deleteReply = deleteReply;