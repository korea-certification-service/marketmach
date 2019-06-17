var express = require('express');
var router = express.Router();
let dbconfig = require('../config/dbconfig');
let controllerEscrow = require('../controllers/escrows');
var BitwebResponse = require('../utils/BitwebResponse');

router.get('/:userId/list/:coinType', function (req, res, next) {
    let country = dbconfig.country;
    let condition = {
        "reqUser": req.params.userId
    }
    let coinType = req.params.coinType;
    
    if(coinType == "mach") condition['mach'] = {$exists: true};
    if(coinType == "point") condition['point'] = {$exists: true};

    let option = {
        "perPage": 0,
        "pageIdx": 10
    };

    var bitwebResponse = new BitwebResponse();

    controllerEscrow.count(country, condition, option)
    .then(count => {
        controllerEscrow.list(country, condition, option)
        .then(escrows => {
            let result = {
                "count": count,
                "list": escrows
            }
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
})

module.exports = router;