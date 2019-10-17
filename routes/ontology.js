var express = require('express');
var router = express.Router();
var BitwebResponse = require('../utils/BitwebResponse')
var util = require('../utils/util');
var request = require('request');
let dbconfig = require('../config/dbconfig');

router.post('/login/callback', function(req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let data = req.body;
    console.log(data);

    if(data != undefined) {
        bitwebResponse.code = 200;
        bitwebResponse.data = u_coin;
        res.status(200).send(bitwebResponse.create())
    } else {
        console.log('error => no data.');
        bitwebResponse.code = 500;
        bitwebResponse.message = "inital error";
        res.status(500).send(bitwebResponse.create());
    }
});

module.exports = router;