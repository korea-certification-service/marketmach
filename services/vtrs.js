var Vtrs = require('../libs/vtrs');
var VtrTemps = require('../libs/vtrTemps');
var Escrows = require('../libs/escrows');
var CancelHistorys = require('../libs/cancelHistorys');

function createVtr (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var vtrs = new Vtrs(data)
        vtrs.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createVtrs done: ' + result)
                resolve(result)
            }
        })
    })
}

function createVtrTemp (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var vtrTemps = new VtrTemps(data)
        vtrTemps.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createVtrTemp done: ' + result)
                resolve(result)
            }
        })
    })
}

function getVtrs (body) {
    return new Promise((resolve, reject) => {
        Vtrs.find(
            body,
            function(err, vtrs) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getVtrs done: ' + vtrs)
                resolve(vtrs)
            }
        )
    })
}

function getVtrTemp (id, buyer_id, seller_id) {
    return new Promise((resolve, reject) => {
        VtrTemps.findOne(
            {
                "_id": id,
                $or: [ { "buyer_id": buyer_id }, { "seller_id": seller_id } ]
            },
            function(err, vtr) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getVtrTemp done: ' + vtr)
                resolve(vtr)
            }
        )
    })
}

function getVtrById (id) {
    return new Promise((resolve, reject) => {
        Vtrs.findOne(
            {"_id": id},
            function(err, vtr) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getVtrById done: ' + vtr)
                resolve(vtr)
            }
        )
    })
}

function getByItemId(itemId) {
    return new Promise((resolve, reject) => {
        Vtrs.findOne(
            {"item._id": itemId},
            function(err, vtr) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                //console.log('getByItemId done: ' + vtr)
                resolve(vtr)
            }
        )
    })
}


function getTempByItemId(itemId) {
    return new Promise((resolve, reject) => {
        VtrTemps.findOne(
            {"item._id": itemId},
            function(err, vtr) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                //console.log('getByItemId done: ' + vtr)
                resolve(vtr)
            }
        )
    })
}

function getVtrByIdAndPassword (data) {
    return new Promise((resolve, reject) => {
        Vtrs.findOne(
            {
                "vtrTag"        : data.vtrTag,
                "password"  : data.password
            },
            function(err, vtr) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getVtrById done: ' + vtr)
                resolve(vtr)
            }
        )
    })
}

function getVtrByEmail (email, body) {
    return new Promise((resolve, reject) => {
        Vtrs.findOne(
            {"email": email},
            function(err, vtr) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getVtrById done: ' + vtr)
                resolve(vtr)
            }
        )
    })
}

function getItemIdsByUserId(data) {
    return new Promise((resolve, reject) => {
        if (data['pageIdx'] == undefined) data['pageIdx'] = 0;
        if (data['perPage'] == undefined) data['perPage'] = 10;

        Vtrs.find(
            {
                $or: [{"from_userId": data.userId}, {"to_userId": data.userId}]
            })
            .limit(data.perPage)
            .skip(data.pageIdx * data.perPage)
            .sort({regDate:'desc'})
            .exec(function(err, vtrs) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getItemIdsByUserId done: ' + vtrs)
                resolve(vtrs)
            })
    })
}

function getItemIdsByUserTag(data) {
    return new Promise((resolve, reject) => {
        VtrTemps.find(
            {
                $or: [{"buyer_id": data.userId}, {"seller_id": data.userId}]
            })
            .exec(function(err, vtrs) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getItemIdsByUserId done: ' + vtrs)
                resolve(vtrs)
            })
    })
}

function getItemIdsByUserIdAndItemId(data) {
    if (data['pageIdx'] == undefined) data['pageIdx'] = 0
    if (data['perPage'] == undefined) data['perPage'] = 10

    return new Promise((resolve, reject) => {
        VtrTemps.find(
            {
                "item._id": data.itemId,
                $or: [{"buyer_id": data.userTag}, {"seller_id": data.userTag}]
            })
            .limit(data.perPage)
            .skip(data.pageIdx * data.perPage)
            .sort({regDate:'desc'})
            .exec(function(err, vtrTemps) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getItemIdsByUserIdAndItemId done: ' + vtrTemps)
                resolve(vtrTemps)
            })
    })
}

function updateVtrById(vtrId, body) {
    return new Promise((resolve, reject) => {
        Vtrs.findOneAndUpdate(
            {"_id": vtrId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateVtrByItemId(itemId, body) {
    return new Promise((resolve, reject) => {
        Vtrs.findOneAndUpdate(
            {"item._id": itemId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateVtrHistoryId(vtrId, historyId) {
    return new Promise((resolve, reject) => {

        Vtrs.findOneAndUpdate(
            {
                "_id": vtrId
            },
            {
                $push: {historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function deleteVtrById (id) {
    return new Promise((resolve, reject) => {
        Vtrs.findByIdAndRemove(
            id,
            function(err, vtr) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getVtrById done: ' + vtr)
                resolve(vtr)
            }
        )
    })
}

function deleteVtrTempByItemId (id) {
    return new Promise((resolve, reject) => {
        VtrTemps.findOneAndRemove(
            {
                "item._id": id
            },
            function(err, vtr) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('deleteVtrTempByItemId done: ' + vtr)
                resolve(vtr)
            }
        )
    })
}

function deleteVtrTempById (id) {
    return new Promise((resolve, reject) => {
        VtrTemps.findByIdAndRemove(
            id,
            function(err, vtr) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('deleteVtrTempById done: ' + vtr)
                resolve(vtr)
            }
        )
    })
}

function getItemsByUserId(userId,option) {
    return new Promise((resolve, reject) => {
        Vtrs.find(
                option
            )
            .exec(function(err, vtrs) {
                if (err) {
                    //console.error(err)
                    reject(err)
                }
                //console.log('getItemsByUserId done: ' + vtrs)
                resolve(vtrs)
            }
        )
    })
}

function createEscrow(data) {
    return new Promise((resolve, reject) => {
        //console.log(data)
        var escrows = new Escrows(data);
        escrows.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createEscrow done: ' + result)
                resolve(result)
            }
        })
    })
}

function getEscrow(vtrId) {
    return new Promise((resolve, reject) => {
        //console.log(data)
        Escrows.count({
            "vtr._id": vtrId
        })
        .exec(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('getEscrow done: ' + result)
                resolve(result)
            }
        })
    })
}

function createCancelHistory(data) {
    return new Promise((resolve, reject) => {
        //console.log(data)
        var cancelHistorys = new CancelHistorys(data);
        cancelHistorys.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createCancelHistory done: ' + result)
                resolve(result)
            }
        })
    })
}

function getCountCancels(params) {
    return new Promise((resolve, reject) => {
        CancelHistorys.count(params)
            .limit(100)
            .sort({regDate:'desc'})
            .exec(function(err, cancels) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getCancels done: ' + cancels)
                resolve(cancels)
            })
    })
}

function getCancels(params, data) {
    return new Promise((resolve, reject) => {
        CancelHistorys.find(params)
            .limit(data.perPage)
            .skip(data.pageIdx * data.perPage)
            .sort({regDate:'desc'})
            .exec(function(err, cancels) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getCancels done: ' + cancels)
                resolve(cancels)
            })
    })
}

function getTradingItems(condition) {
    return new Promise((resolve, reject) => {
        Vtrs.find(condition)
            .sort({regDate:'desc'})
            .exec(function(err, cancels) {
                if (err) {
                    reject(err)
                }
                resolve(cancels)
            })
    })
}


exports.createVtr = createVtr;
exports.createVtrTemp = createVtrTemp;
exports.getVtrTemp = getVtrTemp;
exports.getVtrById = getVtrById;
exports.getByItemId = getByItemId;
exports.getTempByItemId = getTempByItemId;
exports.getVtrByIdAndPassword = getVtrByIdAndPassword;
exports.getVtrByEmail = getVtrByEmail;
exports.getItemIdsByUserId = getItemIdsByUserId;
exports.getItemIdsByUserIdAndItemId = getItemIdsByUserIdAndItemId;
exports.updateVtrById = updateVtrById;
exports.updateVtrHistoryId = updateVtrHistoryId;
exports.deleteVtrById = deleteVtrById;
exports.deleteVtrTempById = deleteVtrTempById;
exports.getItemIdsByUserTag = getItemIdsByUserTag;
exports.getVtrs = getVtrs;
exports.updateVtrByItemId = updateVtrByItemId;
exports.getItemsByUserId = getItemsByUserId;
exports.createEscrow = createEscrow;
exports.deleteVtrTempByItemId = deleteVtrTempByItemId;
exports.createCancelHistory = createCancelHistory;
exports.getCountCancels = getCountCancels;
exports.getCancels = getCancels;
exports.getEscrow = getEscrow;
exports.getTradingItems = getTradingItems;