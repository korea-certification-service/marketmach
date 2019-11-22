/**
 * 공지사항 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var dbconfig = require('../config/dbconfig');
var noticeController = require('../controllers/notices');
var BitwebResponse = require('../utils/BitwebResponse')

//공지사항 목록 조회
router.get('/list', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    noticeController.count(req)
        .then(count => {
            noticeController.list(req)
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

//공지사항 상세보기 페이지 호출
router.get('/detail', function (req, res, next) {
    res.render('notices/detail', {title: 'Bitweb Main'});
});

//공지사항 상세보기
router.get('/detail/:noticeId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    noticeController.get(req)
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
