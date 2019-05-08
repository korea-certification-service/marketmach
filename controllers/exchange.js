let db = require('../utils/db');
let dbconfig = require('../config/dbconfig');
let bitwebUser = require('../services/users');
let bitwebPoint = require('../services/points');
let bitwebPointHistory = require('../services/pointHistorys');
let bitwebCoin = require('../services/coins');
let bitwebCoinHistory = require('../services/coinHistorys');
let bitwebFeeHistory = require('../services/feeHistorys');
let util = require('../utils/util');

function deposit(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => {
                bitwebUser.getUserById(data.userId)
                    .then(user => {
                        bitwebPoint.getPointById(user._doc.pointId)
                            .then(point => {
                                //point 차감
                                let user_point = point._doc.total_point - data.amount;
                                if(user_point <= 0) {
                                    let result = {
                                        "code":"E001",
                                        "msg":"사용자의 포인트가 부족하여 MACH 코인으로 교환할 수 없습니다."
                                    }

                                    resolve(result);
                                    return;
                                }                                
                                bitwebPoint.updatePointById(user._doc.pointId, {"total_point": user_point});
                                
                                bitwebCoin.getCoinById(user._doc.coinId)
                                    .then(coin => {
                                        //mach coin 증감 저장
                                        let cal_rate = data.amount * dbconfig.fee.exchange.deposit;
                                        let user_amount = ((data.amount - cal_rate) / data.rate).toFixed(8);
                                        let user_coin = coin._doc.total_mach + parseFloat(user_amount);
                                        bitwebCoin.updateCoinById(user._doc.coinId, {"total_mach":user_coin});

                                        //point history 저장
                                        let pointHisory = {
                                            "pointId": user._doc.pointId,
                                            "type":'withdraw',
                                            "extType":data.extType,
                                            "amountCurrency": "MACH",
                                            "amount":user_amount,
                                            "point":data.amount,
                                            "rate":data.rate,
                                            "fee": dbconfig.fee.exchange.deposit,
                                            "status": true,
                                            "regDate": util.formatDate(new Date().toString())
                                        }
                                        bitwebPointHistory.createPointHistory(pointHisory);
                                        
                                        //mach coin history 저장
                                        let coinHistory = {
                                            "extType": "mach",
                                            "coinId": user._doc.coinId,
                                            "category": "exchange-deposit",          
                                            "status": true,
                                            "currencyCode": "MACH",
                                            "amountCurrency": "POINT",
                                            "amount": data.amount,
                                            "mach": user_amount,
                                            "regDate": util.formatDate(new Date().toString()) 
                                        }

                                        bitwebCoinHistory.createCoinHistory(coinHistory);

                                        //fee history 저장
                                        let feeHistory = {
                                            userId: user._doc._id,
                                            currency: "POINT",
                                            type: "exchange",
                                            amount: cal_rate,
                                            fee: dbconfig.fee.exchange.deposit,
                                            regDate: util.formatDate(new Date().toString())  
                                        }
                                        bitwebFeeHistory.createFeeHistory(feeHistory);
                                        
                                        let result = {
                                            "code":"Success",
                                            "msg":"MACH 코인으로 정상적으로 교환 되었습니다."
                                        }
                                        resolve(result);
                                    }).catch((err) => {
                                    reject(err)
                                });
                            }).catch((err) => {
                            reject(err)
                        }).catch((err) => {
                        reject(err)
                    });                      
                }).catch((err) => {
                reject(err)
            });
        });
    });
}

function withdraw(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => {
                bitwebUser.getUserById(data.userId)
                    .then(user => {
                        bitwebCoin.getCoinById(user._doc.coinId)
                            .then(point => {
                                //mach 차감
                                let output_total_mach = point._doc.output_total_mach;
                                if(point._doc.output_total_mach == undefined) {
                                    output_total_mach = 0;
                                }
                                
                                let user_coin = point._doc.total_mach - data.amount;
                                let outpue_user_coin = output_total_mach - data.amount;
                                if(outpue_user_coin < 0) {
                                    let result = {
                                        "code":"E002",
                                        "msg":"사용자의 출금 가능한 MACH 코인이 부족하여 포인트로 교환할 수 없습니다."
                                    }

                                    resolve(result);
                                    return;
                                }                  
                                bitwebCoin.updateCoinById(user._doc.coinId, {"total_mach":user_coin, "output_total_mach":outpue_user_coin})                                              
                                
                                bitwebPoint.getPointById(user._doc.pointId)
                                    .then(point => {
                                        //mach point 증감 저장
                                        let cal_rate = parseFloat((data.amount * dbconfig.fee.exchange.withdraw).toFixed(8));
                                        let user_amount = ((data.amount - cal_rate) * data.rate).toFixed();
                                        let user_point = point._doc.total_point + parseInt(user_amount);
                                        bitwebPoint.updatePointById(user._doc.pointId, {"total_point": user_point});
                                        
                                        //mach coin history 저장
                                        let coinHistory = {
                                            "extType": "mach",
                                            "coinId": user._doc.coinId,
                                            "category": "exchange-withdraw",          
                                            "status": true,
                                            "currencyCode": "MACH",
                                            "rate":data.rate,
                                            "amountCurrency": "POINT",
                                            "amount": user_amount,
                                            "mach": data.amount,
                                            "fee": dbconfig.fee.exchange.withdraw,
                                            "regDate": util.formatDate(new Date().toString()) 
                                        }
                                        bitwebCoinHistory.createCoinHistory(coinHistory);
                                        
                                        //point history 저장
                                        let pointHisory = {
                                            "pointId": user._doc.pointId,
                                            "type":'deposit',
                                            "extType":data.extType,
                                            "amountCurrency": "MACH",
                                            "amount":data.amount,
                                            "point":user_amount,
                                            "rate":data.rate,
                                            "status": true,
                                            "fee": dbconfig.fee.exchange.withdraw,
                                            "regDate": util.formatDate(new Date().toString())
                                        }
                                        bitwebPointHistory.createPointHistory(pointHisory);

                                        //fee history 저장
                                        let feeHistory = {
                                            userId: user._doc._id,
                                            currency: "MACH",
                                            type: "exchange",
                                            amount: cal_rate,
                                            fee: dbconfig.fee.exchange.withdraw,
                                            regDate: util.formatDate(new Date().toString())  
                                        }
                                        bitwebFeeHistory.createFeeHistory(feeHistory);
                                        
                                        let result = {
                                            "code":"Success",
                                            "msg":"포인트로 정상적으로 교환 되었습니다."
                                        }
                                        resolve(result);
                                    }).catch((err) => {
                                    reject(err)
                                });
                            }).catch((err) => {
                            reject(err)
                        }).catch((err) => {
                        reject(err)
                    });                      
                }).catch((err) => {
                reject(err)
            });
        });
    });
}

exports.deposit = deposit;
exports.withdraw = withdraw;