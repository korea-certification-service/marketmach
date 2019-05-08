var Points = require('../libs/points');

function createPoint (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var points = new Points(data)
        points.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createPoints done: ' + result)
                resolve(result)
            }
        })
    })
}

function getPointById (id) {
    return new Promise((resolve, reject) => {
        Points.findOne(
            {"_id": id},
            function(err, point) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getPointById done: ' + point)
                resolve(point)
            }
        )
    })
}

function getPointByIdAndPassword (data) {
    return new Promise((resolve, reject) => {
        Points.findOne(
            {
                "pointTag"        : data.pointTag,
                "password"  : data.password
            },
            function(err, point) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getPointById done: ' + point)
                resolve(point)
            }
        )
    })
}

function getPointByEmail (email, body) {
    return new Promise((resolve, reject) => {
        Points.findOne(
            {"email": email},
            function(err, point) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getPointById done: ' + point)
                resolve(point)
            }
        )
    })
}

function updatePointById(pointId, body) {
    return new Promise((resolve, reject) => {
        Points.findOneAndUpdate(
            {"_id": pointId
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

function updatePointHistoryId(pointId, historyId) {
    return new Promise((resolve, reject) => {

        Points.findOneAndUpdate(
            {
                "_id": pointId
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

function updatePointBankHistoryId(pointId, historyId) {
    return new Promise((resolve, reject) => {

        Points.findOneAndUpdate(
            {
                "_id": pointId
            },
            {
                $push: {bank_historys: historyId}
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

function deletePointById (id) {
    return new Promise((resolve, reject) => {
        Points.findByIdAndRemove(
            id,
            function(err, point) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getPointById done: ' + point)
                resolve(point)
            }
        )
    })
}

exports.createPoint = createPoint;
exports.getPointById = getPointById;
exports.getPointByIdAndPassword = getPointByIdAndPassword;
exports.getPointByEmail = getPointByEmail;
exports.updatePointById = updatePointById;
exports.updatePointHistoryId = updatePointHistoryId;
exports.updatePointBankHistoryId = updatePointBankHistoryId;
exports.deletePointById = deletePointById;
