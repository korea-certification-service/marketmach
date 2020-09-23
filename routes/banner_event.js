/**
 * Event banner search
 * 2020. 09. 23
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var controllerBanner = require('../controllers/banner_event');
var BitwebResponse = require('../utils/BitwebResponse')
var util = require('../utils/util')
var dbconfig = require('../config/dbconfig');

router.get("/banner", function (req, res, next) {
    let country = dbconfig.country;

    var bitwebResponse = new BitwebResponse();

    controllerBanner.getBennerEventList(country)
        .then(result => {
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
});

module.exports = router;
