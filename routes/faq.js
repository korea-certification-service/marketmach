/**
 * FAQ 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var faqController = require('../controllers/faq');
var BitwebResponse = require('../utils/BitwebResponse')

//FAQ 목록 조회
router.get('/list', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    faqController.count(req)
        .then(count => {
            faqController.list(req)
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

//현재 사용 안함
router.get('/detail', function (req, res, next) {
    res.render('faq/detail', {title: 'Bitweb Main'});
});

//FAQ 상세보기
router.get('/detail/:faqId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    if (req.params.faqId != null) {
        faqController.get(req)
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
    }
});

//현재 사용 안함
router.post('/', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    faqController.add(req)
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
