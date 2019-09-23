let dbconfig = require('../config/dbconfig');
let schedule = require('node-schedule');
let request = require('request');
let controllerCoinHistorys = require('../controllers/coinHistorys');
let controllerCoins = require('../controllers/coins');
var util = require('../utils/util');
let country = dbconfig.country;

const endJobCount = dbconfig.ontology.endJobCount;

function ontJob(data) {
    var rule = '*/10 * * * * *';
    var jobCount = 1;
    let explorerUrl = dbconfig.ontology.explorerUrl;
    let address = dbconfig.ontology.address;
    let coinType = data.coinType;
    let regDate = data.regDate;
    let historyId = data.historyId;
    let coinId = data.coinId;
    let fromAddress = data.fromAddress;
    
    var job = schedule.scheduleJob(rule, function (time) {
        console.log('polling jobCount==>', jobCount)
        console.log('answer time =>', time);        
        let currentDate = Math.floor(new Date().getTime() / 1000);

        let url = explorerUrl + '/api/v1/explorer/address/time/'+address+'/'+coinType+'/'+regDate+'/'+currentDate;
        console.log(url);
        request.get(url, function (err, res, body) {
            let resBody = JSON.parse(res.body);
            if (err) {
                console.log("can't find block information in ontology!")
                job.cancel();
                return;
            }

            if(resBody.Error == 0) {
                let txnList = resBody.Result.TxnList;
                if(txnList == 0) {
                    if (jobCount == endJobCount) {
                        console.log('End jobCount==>', jobCount);
                        //등록된 coinHistory 삭제(일단 주석 처리)
                        //controllerCoinHistorys.removeCoinHistory(country,{"_id": historyId});
                        job.cancel();
                        return;
                    }
                    //regDate = currentDate;
                    jobCount++;
                } else {
                    for(var i=0;i<txnList.length; i++) {
                        if(txnList[i].TransferList[0].FromAddress == fromAddress) {
                            let amount = parseInt(txnList[0].TransferList[0].Amount);
                            let data = {
                                "status": "success",
                                "amount": amount,
                                "price": amount,
                                "regDate": util.formatDate(new Date().toString())  
                            }
                            //coinhistory 상태 값 update 및 입금 금액 확인해서 해당 coinId로 금액update 
                            controllerCoinHistorys.updateCoinHistory(country, historyId, data)
                            .then(updatedCoinHistory => {
                                console.log('update ' + coinType + ' history status!');

                                controllerCoins.getByCoinId(country, coinId)
                                .then(coin => {
                                    let update_data = {
                                        "total_ont": parseFloat((coin._doc.total_ont + amount).toFixed(8)),
                                        "ont_address": fromAddress
                                    }
                                    if(coinType == "btc") {
                                        let total_btc = coin._doc.total_btc == undefined ? 0 :  coin._doc.total_btc;
                                        update_data = {
                                            "total_btc": parseFloat((total_btc + amount).toFixed(8))
                                        }
                                    } else if(coinType== "eth") {
                                        let total_ether = coin._doc.total_ether == undefined ? 0 :  coin._doc.total_ether;
                                        update_data = {
                                            "total_ether":  parseFloat((total_ether + amount).toFixed(8))
                                        }
                                    }
                                    
                                    controllerCoins.updateTotalCoin(country, coinId, update_data)
                                    .then(u_coin => {
                                        console.log('update ' + coinType + ' completed!');
                                        console.error(u_coin);
                                        job.cancel();
                                    }).catch(err => {
                                        console.error('err => updateTotalCoin failed');
                                        console.error(err);
                                        job.cancel();
                                    });
                                }).catch(err => {
                                    console.error('err => getByCoinId failed');
                                    console.error(err);
                                    job.cancel();
                                });
                            }).catch(err => {
                                console.error('err => updateCoinHistory failed');
                                console.error(err);
                                job.cancel();
                            });
                        }
                    }
                }
            } else {
                console.log("can't find block information in ontology!")
                job.cancel();
                return;
            }
        });
    });
}

exports.ontJob = ontJob;