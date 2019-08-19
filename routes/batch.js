var express = require('express');
var router = express.Router();
var controllerVtrs = require('../controllers/vtrs');
var controllerUsers = require('../controllers/users');
var controllerCoins = require('../controllers/coins');
var controllerCoinHistorys = require('../controllers/coinHistorys');
var util = require('../utils/util');
var dbconfig = require('../config/dbconfig');
var BitwebResponse = require('../utils/BitwebResponse')

// router.post('/vtrs/completedSell/list', function (req, res, next) {
//     let country = dbconfig.country;
//     let sellCompleted = (req.body.sellCompleted == undefined ? util.formatDate(new Date()) : req.body.sellCompleted);
//     let startSellCompleted =  new Date(sellCompleted);
//     let toDate = sellCompleted;
//     let fromDate = util.formatDate(startSellCompleted.setDate(startSellCompleted.getDate() - 7));
//     let body = {
//         "sell_status": true,
//         "completed": {$exists: false},
//         "completed_sell_date": {"$gte": fromDate,"$lte": toDate}
//     };

//     var bitwebResponse = new BitwebResponse();

//     controllerVtrs.getVtrs(country, body)
//         .then(result => {
//             bitwebResponse.code = 200;
//             bitwebResponse.data = result;
//             let jsonResult = bitwebResponse.create();
//             res.status(200).send(jsonResult)
//         }).catch((err) => {
//         console.error('err=>', err)
//         bitwebResponse.code = 500;
//         bitwebResponse.message = err;
//         res.status(500).send(bitwebResponse.create())
//     })

// });


// router.post('/marketmach/airdrop', function (req, res, next) {
//     let country = dbconfig.country;
//     let data = req.body;
    
//     var bitwebResponse = new BitwebResponse();
//     controllerUsers.getByUserTag(country, data.userTag)
//     .then(user => {
//         if(user != null) {
//             let coinId = user._doc.coinId;        
//             controllerCoins.getByCoinId(country, coinId)
//             .then(coin => {
//                 let reqData = {"total_mach": coin._doc.total_mach + data.airdropAmount}
//                 controllerCoins.updateTotalCoin(country, coinId, reqData)
//                 .then(updateCoin => {
//                     let historyData = {
//                         "extType" : "mach",
//                         "coinId" : coinId,
//                         "category" : data.category,
//                         "memo": data.memo,
//                         "status" : "success",
//                         "currencyCode" : "MACH",
//                         "amount" : data.airdropAmount,
//                         "mach" : data.airdropAmount,
//                         "regDate" : util.formatDate(new Date().toString())
//                     };
//                     controllerCoinHistorys.createData(country, historyData);
//                     bitwebResponse.code = 200;
//                     updateCoin._doc['successYn'] = true;
//                     bitwebResponse.data = updateCoin;
//                     let jsonResult = bitwebResponse.create();
//                     res.status(200).send(jsonResult)
//                 }).catch((err) => {
//                     console.error('err=>', err)
//                     bitwebResponse.code = 500;
//                     bitwebResponse.message = err;
//                     res.status(500).send(bitwebResponse.create())
//                 })
//             }).catch((err) => {
//                 console.error('err=>', err)
//                 bitwebResponse.code = 500;
//                 bitwebResponse.message = err;
//                 res.status(500).send(bitwebResponse.create())
//             })
//         } else {
//             bitwebResponse.code = 200;
//             bitwebResponse.data = {
//                 "successYn": false,
//                 "msg":"no exist user."
//             };
//             let jsonResult = bitwebResponse.create();
//             res.status(200).send(jsonResult)
//         }
//     }).catch((err) => {
//         console.error('err=>', err)
//         bitwebResponse.code = 500;
//         bitwebResponse.message = err;
//         res.status(500).send(bitwebResponse.create())
//     })
    

// });

module.exports = router;
