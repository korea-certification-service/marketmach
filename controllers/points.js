
var db = require('../utils/db');
var bitwebPoints = require('../services/points');
var bitwebPointHistory = require('../services/pointHistorys');
var bitwebFeeHistory = require('../services/feeHistorys');
var dbconfig = require('../config/dbconfig');
var util = require('../utils/util')

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var pointId = req.params.pointId;

        db.connectDB(country)
            .then(() => bitwebPoints.getPointById(pointId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getByPointId(country, pointId) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebPoints.getPointById(pointId))
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
            .then(() => bitwebPoints.createPoint(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createByPoint(country, point) {
    return new Promise((resolve, reject) => {

        var data = point;
        db.connectDB(country)
            .then(() => bitwebPoints.createPoint(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createWithIds(req, pointId, agreementId, bankId) {
    return new Promise((resolve , reject) => {

        let country = req.session.country;
        var data = req.body;
        delete data['points'];
        delete data['agreements'];
        delete data['banks'];

        var password = crypto.createHash('sha256').update(req.body.password).digest('base64');
        data['password'] = password;
        data['pointId'] = pointId;
        data['agreementId'] = agreementId;
        data['bankId'] = bankId;
        data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))

        console.log('createWithIds data=>', data);

        db.connectDB(country)
            .then(() => bitwebPoints.createPoint(data))
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
        var pointId = req.params.pointId;

        var data = req.body;

        db.connectDB(country)
            .then(() => bitwebPoints.updatePointById(pointId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateById(country, id, body) {
    return new Promise((resolve , reject) => {
        db.connectDB(country)
            .then(() => {
                bitwebPoints.getPointById(id)
                    .then(point => {
                        let fee_rate = parseInt((body.amount * dbconfig.fee.point.deposit).toFixed());
                        let user_amount = body.amount - fee_rate;
                        let data = {
                            "total_point": point._doc.total_point + user_amount
                        };
                        if(body.type == "withdraw") {
                            fee_rate = parseInt((body.amount * dbconfig.fee.point.withdraw).toFixed());
                            user_amount = body.amount - fee_rate;
                            let user_point = point._doc.total_point - user_amount;
                            if(user_point <= 0) {
                                let result = {
                                    "code":"E001",
                                    "msg":"포인트 출금 금액이 가지고 있는 금액보다 적습니다."
                                }

                                console.log('result=>' , result);
                                resolve(result);
                                return;
                            }
                            data = {
                                "total_point": user_point
                            };
                        }

                        // bitwebPoints.updatePointById(id, data)
                        //     .then(() => {
                                let pointHisory = {
                                    "pointId": id,
                                    "type":body.type,
                                    "extType":body.extType,
                                    "amountCurrency": body.amountCurrency,
                                    "amount":body.type == "deposit" ? body.amount : user_amount,
                                    "point":body.type == "deposit" ? user_amount : body.amount,
                                    "fee": dbconfig.fee.point.deposit,
                                    "status": false,
                                    "regDate": util.formatDate(new Date().toString())
                                }
                                if(body.type == "withdraw") {
                                    pointHisory["bankAccountType"] = body.bankAccountType;
                                    pointHisory["bankAccount"] = body.bankAccount;
                                }

                                bitwebPointHistory.createPointHistory(pointHisory);

                                //fee history 저장
                                // let feeHistory = {
                                //     userId: body.pointId,
                                //     currency: body.amountCurrency,
                                //     type: body.type,
                                //     amount: fee_rate,
                                //     fee: dbconfig.fee.exchange.withdraw,
                                //     regDate: util.formatDate(new Date().toString())  
                                // }
                                // bitwebFeeHistory.createFeeHistory(feeHistory);
                                
                                let message = "포인트 입금 요청이 완료 되었습니다.\n 9-18시 사이에 요청한 포인트는 당일 처리가 되며, 18시 이후에 요청한 포인트는 익일 처리가 됩니다.";
                                if(body.type == "withdraw") {
                                    message = "포인트 출금 요청이 완료 되었습니다.\n 9-18시 사이에 요청한 포인트는 당일 처리가 되며, 18시 이후에 요청한 포인트는 익일 처리가 됩니다.";
                                } 

                                let result = {
                                    "code":"Success",
                                    "msg":message
                                }

                                console.log('result=>' , result);
                                resolve(result);
                            })
                //     }).catch((err) => {
                //     reject(err)
                // })
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateWithHistory(country, pointId, historyId) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebPoints.updatePointHistoryId(pointId, historyId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateWithBankHistory(country, pointId, historyId) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebPoints.updatePointBankHistoryId(pointId, historyId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateTotalPoint(country, pointId, data) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebPoints.updatePointById(pointId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function remove(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var pointId = req.params.pointId;

        db.connectDB(country)
            .then(() => bitwebPoints.deletePointById(pointId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function updateHappymoneyPoint(country, id, body) {
    return new Promise((resolve , reject) => {
        db.connectDB(country)
            .then(() => {
                bitwebPoints.getPointById(id)
                    .then(point => {
                        console.log(body, dbconfig.fee.happymoney.deposit);
                        let fee_rate = parseInt((body.orderAmount * dbconfig.fee.happymoney.deposit).toFixed());
                        let user_amount = body.orderAmount - fee_rate;
                        let data = {
                            "total_point": parseInt(point._doc.total_point) + user_amount
                        };
                        if(body.type == "withdraw") {
                            fee_rate = parseInt((body.orderAmount * dbconfig.fee.happymoney.withdraw).toFixed());
                            user_amount = body.orderAmount - fee_rate;
                            let user_point = parseInt(point._doc.total_point) - user_amount;
                            if(user_point <= 0) {
                                let result = {
                                    "code":"E001",
                                    "msg":"포인트 출금 금액이 가지고 있는 금액보다 적습니다."
                                }

                                console.log('result=>' , result);
                                resolve(result);
                                return;
                            }
                            data = {
                                "total_point": user_point
                            };
                        }

                        bitwebPoints.updatePointById(id, data)
                            .then(() => {
                                let pointHisory = {
                                    "pointId": id,
                                    "type":body.type,
                                    "extType":body.extType,
                                    "amountCurrency": body.amountCurrency,
                                    "amount":body.type == "deposit" ? body.orderAmount : user_amount,
                                    "point":body.type == "deposit" ? user_amount : body.orderAmount,
                                    "fee": dbconfig.fee.happymoney.deposit,
                                    "status": true,
                                    "regDate": util.formatDate(new Date().toString())
                                }

                                bitwebPointHistory.createPointHistory(pointHisory);

                                //fee history 저장
                                let feeHistory = {
                                    userId: body.pointId,
                                    currency: body.amountCurrency,
                                    type: body.type,
                                    amount: fee_rate,
                                    fee: body.type == "deposit" ? dbconfig.fee.happymoney.deposit : dbconfig.fee.happymoney.withdraw,
                                    regDate: util.formatDate(new Date().toString())  
                                }
                                bitwebFeeHistory.createFeeHistory(feeHistory);
                                
                                let message = "해피머니 포인트 입금이 완료 되었습니다.";
                                if(body.type == "withdraw") {
                                    message = "해피머니 출금 요청이 완료 되었습니다.\n 9-18시 사이에 요청한 포인트는 당일 처리가 되며, 18시 이후에 요청한 포인트는 익일 처리가 됩니다.";
                                } 

                                let result = {
                                    "code":"Success",
                                    "msg":message
                                }

                                console.log('result=>' , result);
                                resolve(result);
                            })
                    }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.get = get;
exports.getByPointId = getByPointId;
exports.create = create;
exports.createByPoint = createByPoint;
exports.createWithIds = createWithIds;
exports.update = update;
exports.updateById = updateById;
exports.updateWithHistory = updateWithHistory;
exports.updateWithBankHistory = updateWithBankHistory;
exports.updateTotalPoint = updateTotalPoint;
exports.remove = remove;
exports.updateHappymoneyPoint = updateHappymoneyPoint;

