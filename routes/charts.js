var express = require('express');
var router = express.Router();
var request = require('request');
var controllerCurrency = require('../controllers/currency');
var BitwebResponse = require('../utils/BitwebResponse')
var util = require('../utils/util')
var dbconfig = require('../config/dbconfig');

router.get("/currency/:type/:limit", function (req, res, next) {
    let type = req.params.type;
    let limit = (req.params.limit == undefined ? 30 : parseInt(req.params.limit));
    let country = dbconfig.country;

    var bitwebResponse = new BitwebResponse();

    controllerCurrency.getByType(country, type, limit)
        .then(result2 => {
            bitwebResponse.code = 200;
            result2.sort(function(a, b) {
                let beforeDate = new Date(a.regDate) / 1000;
                let afterDate = new Date(b.regDate) / 1000;
                return beforeDate < afterDate ? -1 : beforeDate > afterDate ? 1 : 0;
            })
            bitwebResponse.data = result2;

            let jsonResult = bitwebResponse.create();
            res.status(200).send(jsonResult)
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

router.get("/currency/:limit", function (req, res, next) {
    let limit = (req.params.limit == undefined ? 6 : parseInt(req.params.limit));
    let country = dbconfig.country;

    var bitwebResponse = new BitwebResponse();

    controllerCurrency.getByType(country, '', limit)
        .then(result2 => {
            bitwebResponse.code = 200;
            result2.sort(function(a, b) {
                let beforeDate = new Date(a.regDate) / 1000;
                let afterDate = new Date(b.regDate) / 1000;
                return beforeDate < afterDate ? -1 : beforeDate > afterDate ? 1 : 0;
            })
            bitwebResponse.data = result2;

            let jsonResult = bitwebResponse.create();
            res.status(200).send(jsonResult)
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

router.post("/currency/:type/:country", function (req, res, next) {
    let type = req.params.type;
    let country = (req.params.country == undefined ? "KR" : req.params.country);
    let dollerRateUrl = "https://api.manana.kr/exchange/rate/KRW/USD.json";
    let currentUrl = "http://widget.bitweb.co.kr/widget_data.php?currency=" + type;
    var bitwebResponse = new BitwebResponse();

    request.get(dollerRateUrl, function(err1,res1,result1) {
        if(res1.statusCode == 200) {
            let jsonDollerRate = JSON.parse(result1);
            let dollerRate = jsonDollerRate[0].rate;
            request.get(currentUrl, function(err,res2,result){
                if(res2.statusCode == 200) {
                    //데이터 저장
                    let currencyList = JSON.parse(result);
                    //console.log('result:' , currencyList);
                    let data = {};
                    data['type'] = type;
                    data['data'] = currencyList;
                    data['regDate'] = util.formatDate(new Date().toLocaleString('ko-KR'))
                    controllerCurrency.create(country, data)
                        .then(result => {
                            result['dollerRate'] = dollerRate;
                            bitwebResponse.code = 200;
                            bitwebResponse.data = result;

                            let jsonResult = bitwebResponse.create();
                            res.status(200).send(jsonResult)
                        }).catch((err) => {
                        console.error('err=>', err)
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create())
                    })

                } else {
                    console.log('error currency:' , JSON.parse(result));
                    bitwebResponse.code = 500;
                    bitwebResponse.message = err;
                    res.status(500).send(bitwebResponse.create())
                }
            })
        } else {
            console.log('error doller rate:' , JSON.parse(result1));
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        }
    })
});
module.exports = router;
