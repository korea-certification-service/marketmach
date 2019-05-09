var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var eventsController = require('../controllers/events');
var BitwebResponse = require('../utils/BitwebResponse');

router.get('/list/:eventEnd', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    eventsController.count(req)
        .then(count => {
            eventsController.list(req)
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

router.get('/detail/:eventId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    eventsController.get(dbconfig.country, req.params.eventId)
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