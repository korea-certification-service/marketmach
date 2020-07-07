let config = require('../config/dbconfig')
let mqtt = require('mqtt');
let mqtt_url = config.mqtt.url;
let controllerCoins = require('../controllers/coins')
let controllerCoinHistorys = require('../controllers/coinHistorys');
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var private = config;
var request = require('request');

var testnet_ether = config.testnet.address.ether;
var testnet_mach = config.testnet.address.mach;
var textnet_ether_url = config.testnet.url.ether
var testnet_mach_contract = config.testnet.contract.mach;
var testnet_btc = config.testnet.address.btc;
var testnet_btc_url = config.testnet.url.btc;

const endJobCount = 10
const endJobBtcCount = 30

function btcJob(sendJson) {
    var rule = '*/2 * * * *';
    var jobCount = 0;
    var job = schedule.scheduleJob(rule, function (time) {
        console.log('answer time =>', time);

        let historyCount = sendJson.history_count;
        let country = sendJson.country;

        // console.log('historyCount=>', historyCount)

        runBtc(sendJson)
            .then(result => {
                // console.log('historyCount=>', historyCount);
                console.log('result=>', result);
                if (historyCount == result['count']) {
                // if (result['count'] == 13) {

                    sendJson['from'] = "btcScanSchduler"
                    sendJson['status'] = true
                    sendJson['hash'] = result['hash']
                    sendJson['value'] = result['value']
                    console.log('Ready jsonData=>', sendJson)

                    subscribeCoinScanSchduler(country, sendJson)
                    console.log('end job !!')
                    job.cancel();

                }
                else if (historyCount > 1 && historyCount >= result['count']) {
                    console.log("historyCount error !")
                    job.cancel();

                }
                else if (result['count'] == -1) {

                    console.log("can't read blockchain info !")
                    job.cancel();

                } else {
                    console.log('in progress!')

                    if (jobCount == endJobBtcCount) {
                        console.log('exception jobCount==>', jobCount)
                        job.cancel();
                    }
                    jobCount ++
                }
            })

    });
}
function WithdrawBtcJob(sendJson) {
    var rule = '*/2 * * * *';
    var jobCount = 0;
    var job = schedule.scheduleJob(rule, function (time) {
        console.log('answer time =>', time);

        let country = sendJson.country

        checkBtcWithdraw(sendJson)
            .then(count => {
                console.log('count=>', count);
                if (count == 1) {
                    sendJson['from'] = "withdrawSchduler"
                    sendJson['status'] = true
                    console.log('Ready jsonData=>', sendJson)
                    subscribeCoinScanSchduler(country, sendJson)

                    console.log('end job !!')
                    job.cancel();
                } else {
                    if (jobCount == endJobBtcCount) {
                        console.log('exception jobCount==>', jobCount)
                        job.cancel();
                    }
                    jobCount ++
                }
            })
    });
}

function runBtc(data) {
    return new Promise((resolve, reject) => {


        let btc_address = data.btc_address;
        // let user_address = data.address;
        // let addressCount = data.historyCount;
        let btc_block = {}

        // console.log('mach_address=>', mach_address)
        // console.log('user_address=>', user_address)
        // console.log('address_count=>', addressCount)

        let url = testnet_btc_url + "/rawaddr/" + testnet_btc
        request.get(url, function (err, res, body) {
            if (err) {
                console.log('api err=>', err)
                btc_block['count'] = -1
                reject(btc_block)
            }

            let jsonBody = JSON.parse(body)
            let txs = jsonBody['txs'];

            // console.log('jsonBody:', txs)
            // console.log('result length:', txs.length)


            let count = 0;
            // console.log('txs[0].out[0].addr=>', txs[0].out[0].addr)
            console.log('txs block_height=>', txs[0].block_height)
            for (var index = 0; index < txs.length; index++) {
                // console.log('index=>' + index + ', txs[index].out[0].addr=>', txs[index].out[0].addr);
                if ( ((txs[index].out[0].addr == btc_address) || (txs[index].out[1].addr == btc_address))
                    && (txs[index].block_height != undefined)) {
                    count++;
                    console.log('ok! count =>', count);

                    if (count == 1) {
                        let btc_value = txs[index].out[1].value;
                        btc_block['hash'] = txs[index].hash;
                        btc_block['value'] = btc_value / 100000000

                    }
                }
            }

            btc_block['count'] = count;
            // console.log('btc_block=>', btc_block);
            resolve(btc_block)
        });
    });
}

function DepositJob(sendJson) {
    var count = 1;
    var rule = '*/2 * * * *';
    var jobCount = 0;
    var job = schedule.scheduleJob(rule, function (time) {
        console.log('answer time =>', time);
        // console.log('Job jsonData=>', jsonData)

        let history_count = sendJson.history_count;
        // let history_count = 14;
        let country = sendJson.country
        console.log('history_count=>', history_count)

        checkDeposit(sendJson)
            .then(result => {
                console.log('result=>', result);

                if (history_count == result['count']) {

                    sendJson['status'] = true
                    sendJson['hash'] = result['hash']
                    sendJson['value'] = result['value']
                    console.log('Ready jsonData=>', sendJson)

                    subscribeCoinScanSchduler(country, sendJson)

                    console.log('end job !!')
                    job.cancel();

                }
                // else if (historyCount > 1 && historyCount >= result['count']) {
                //     //TODO: 장애처리
                //     console.log("historyCount error !")
                //     job.cancel();
                //
                // }
                else if (result['count'] == -1) {

                    console.log("can't read blockchain info !")
                    job.cancel();

                } else {
                    console.log('in progress!')

                    if (jobCount == endJobCount) {
                        console.log('exception jobCount==>', jobCount)
                        job.cancel();
                    }
                    jobCount ++
                }

            })


        // etherScanAPI.checkDeposit(jsonData)
        //     .then(result => {
        //         console.log('count=>', result['count']);
        //     })
        // if (count == 2) {
        //     let sendJson = JSON.parse(jsonData)
        //     sendJson['from'] = "etherScanSchduler"
        //     sendJson['status'] = true
        //     console.log('Ready jsonData=>', sendJson)
        //     mqttPublish.send(sendJson);
        //
        //     console.log('end job !!')
        //     job.cancel();
        //
        // }
        // count++;

    });
}

function WithdrawJob(sendJson) {
    var rule = '*/2 * * * *';
    var jobCount = 0;
    var job = schedule.scheduleJob(rule, function (time) {
        console.log('answer time =>', time);

        let country = sendJson.country

        checkWithdraw(sendJson)
            .then(count => {
                console.log('count=>', count);
                if (count == 1) {
                    sendJson['from'] = "withdrawSchduler"
                    sendJson['status'] = true
                    console.log('Ready jsonData=>', sendJson)
                    subscribeCoinScanSchduler(country, sendJson)

                    console.log('end job !!')
                    job.cancel();
                } else {
                    console.log('in progress!')

                    if (jobCount == endJobCount) {
                        console.log('exception jobCount==>', jobCount)
                        job.cancel();
                    }
                    jobCount ++
                }
            })
    });
}

function checkDeposit(data) {
    return new Promise((resolve, reject) => {

        let token_address_contract = "";
        let userAddress = data.address;
        let addressCount = data.history_count;
        let result_block = {}

        if (data.type == "ether") {
            token_address_contract = testnet_ether
        } else if (data.type == "mach") {
            token_address_contract = testnet_mach_contract
        }

        userAddress = userAddress.toString().toLowerCase();
        token_address_contract = token_address_contract.toLowerCase()
        // console.log('token_address_contract=>', token_address_contract)
        // console.log('userAddress=>', userAddress)
        // console.log('address_count=>', addressCount)

        let url = textnet_ether_url + "/api?module=account" +
            "&action=txlist" +
            "&address=" + token_address_contract +
            "&startblock=0" +
            "&sort=asc" +
            "&apikey=QGIFBDNP6SMZSW6WSUNB6BSRXB1UJ7M5EK";
        request.get(url, function (err, res, body) {
            // return new Promise((resolve, reject) => {
            if (err) {
                console.log('api err=>', err)
                // reject(err)

                result_block['count'] = -1
                reject(result_block)
            }

            let jsonBody = JSON.parse(body)
            let result = jsonBody['result'];

            // console.log('result length:', jsonBody['result'].length)

            //TODO: test code
            // userAddress = "0xd2c750deef3a0f577dd00df2f83a56555ce47f3e"
            // addressCount = 13
            let count = 0;
            for (var index = 0; index < result.length; index++) {
                // console.log('index=>' + index + ', result[index].from=>', result[index].from);
                if ((result[index].from == userAddress) && (result[index].to == token_address_contract)) {
                    count++;
                    console.log('ok! count =>', count);

                    if (count == addressCount) {
                        console.log('in end!')
                        let value = result[addressCount].value;
                        result_block['hash'] = result[addressCount].hash;
                        result_block['value'] = value / 1000000000000000000
                    }
                }
            }

            result_block['count'] = count;
            // console.log('btc_block=>', btc_block);
            resolve(result_block)

            // })
        });
    });
}

function checkWithdraw(data) {
    return new Promise((resolve, reject) => {

        let transaction = data.transaction;

        let url = textnet_ether_url + "/api" +
            "?module=proxy" +
            "&action=eth_getTransactionReceipt" +
            "&txhash=" + transaction +
            "&apikey=QGIFBDNP6SMZSW6WSUNB6BSRXB1UJ7M5EK";
        request.get(url, function (err, res, body) {
            // return new Promise((resolve, reject) => {
            if (err) {
                console.log('api err=>', err)
                // reject(err)
            }

            let jsonBody = JSON.parse(body)
            let result = jsonBody['result'];

            console.log('result=>', result)
            if (result != null) {
                console.log('result status => ', 'ok')
                resolve(1)
            }

            // })
        });
    });
}

function checkBtcWithdraw(data) {
    return new Promise((resolve, reject) => {

        let transaction = data.transaction;

        let url = testnet_btc_url + "/rawtx/" +
            transaction;
        request.get(url, function (err, res, body) {
            // return new Promise((resolve, reject) => {
            if (err) {
                console.log('api err=>', err)
                // reject(err)
            }

            let jsonBody = JSON.parse(body)

            console.log('jsonBody=>', jsonBody)
            if (jsonBody != undefined) {
                console.log('result status => ', 'ok')
                resolve(1)
            }

            // })
        });
    });
}

function publishEmail(data) {
    return new Promise((resolve, reject) => {
        let from = data.from;
        let to = data.to;
        let title = data.subject;
        let subject = title;
// let html = '<p>This is paragraph.</p>';
        let html = data.html;

        let mailOptions = {
            from,
            to,
            subject,
            html,
            //text,
        };

        const transporter = nodemailer.createTransport(smtpPool({
            service: private.mailer.service,
            host: private.mailer.host,
            port: private.mailer.port,
            secure: private.mailer.secure,
            auth: {
                user: private.mailer.user,
                pass: private.mailer.password,
            },
            tls: {
                rejectUnauthorize: false,
            },
            maxConnections: 5,
            maxMessages: 10,
        }));

        transporter.sendMail(mailOptions, (err, res) => {
            if (err) {
                console.log('failed... => ', err);
                reject(err)
            } else {
                console.log('succeed... => ', res);
                resolve(res)
            }

            transporter.close();
        });
    })
}

function subscribeCoinScanSchduler(country, sendJson) {

    console.log('checked coinScan API !');
    let type = sendJson.type;

    if ((sendJson['type'] == "btc")
        || (sendJson['type'] == "ether")
        || (sendJson['type'] == "mach")) {

        // let sumPrice = Number(sendJson.value) + Number(sendJson.total_price);
        let sumMach = Number(sendJson.mach) + Number(sendJson.total_mach);
        let completedPrice = sendJson.value

        let totalCoinJson = {};
        // totalCoinJson['total_' + type] = sumPrice;
        totalCoinJson['total_mach'] = sumMach;
        console.log('totalCoinJson=>', totalCoinJson)

        controllerCoins.updateTotalCoin(country, sendJson.coinId, totalCoinJson)
            .then(result => {
                console.log('finished add coin ==>', result);

                let history = {
                    "completedPrice": completedPrice,
                    "type": type
                }
                controllerCoinHistorys.updateCoinHistoryStatusById(country, sendJson.historyId, history)
                    .then(result => {
                        console.log('update ' + type + ' history status!');
                    })

            }).catch((err) => {
            console.error('err=>', err)
        })


    } else if ((sendJson['type'] == "btc_withdraw")
        || (sendJson['type'] == "ether_withdraw")
        || (sendJson['type'] == "mach_withdraw")) {

        console.log('withdraw ok!')

        let subtractMach = Number(sendJson.total_mach) - Number(sendJson.mach);
        let completedPrice = subtractMach;

        let totalCoinJson = {};
        totalCoinJson['total_mach'] = subtractMach;

        controllerCoins.updateTotalCoin(country, sendJson.coinId, totalCoinJson)
            .then(result => {
                console.log('finished add coin ==>', result);

                let history = {
                    "completedPrice": completedPrice,
                    "type": type
                }
                controllerCoinHistorys.updateCoinHistoryStatusById(country, sendJson.historyId, history)
                    .then(result => {
                        console.log('update ' + type + ' history status!');
                    })
            }).catch((err) => {
            console.error('err=>', err)
        })
    }
}

exports.btcJob = btcJob;
exports.WithdrawBtcJob = WithdrawBtcJob;
exports.DepositJob = DepositJob;
exports.WithdrawJob = WithdrawJob;
exports.publishEmail = publishEmail;

