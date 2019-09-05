var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var customerCenterController = require('../controllers/customerCenter');
var BitwebResponse = require('../utils/BitwebResponse')

router.get('/list', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    customerCenterController.count(req)
        .then(count => {
            customerCenterController.list(req)
                .then(list => {
                    let result = {
                        "count": count,
                        "list": list
                    };
                    bitwebResponse.code = 200;
                    bitwebResponse.data = result;
                    res.status(200).send(bitwebResponse.create())
                }).catch((err) => {
                console.error('err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            });
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    });
});

router.get('/detail', function (req, res, next) {
    res.render('faq/detail', {title: 'Bitweb Main'});
});

router.get('/detail/:customerCenterId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    customerCenterController.get(req)
        .then(result => {
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

router.post('/', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    customerCenterController.add(req)
        .then(result => {
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

router.put('/:customerCenterId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    customerCenterController.modify(req)
        .then(result => {
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

router.delete('/:customerCenterId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    customerCenterController.remove(req)
        .then(result => {
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        }).catch((err) => {
        console.error('err=>', err)
        bitwebResponse.code = 500;
        bitwebResponse.message = err;
        res.status(500).send(bitwebResponse.create())
    })
});

module.exports = router;
