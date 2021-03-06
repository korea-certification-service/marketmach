/**
 * 1:1 문의 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var BitwebResponse = require('../utils/BitwebResponse');
var controllerPersonal = require('../controllers/personals');
const dbconfig = require('../config/dbconfig');
var util = require('../utils/util');

//1:1 문의 등록
router.post('/', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let itemId = req.body.itemId;
    if(country != "KR") {
        req.body['country'] = country;
    }

    controllerPersonal.add(req)
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

//사용자 별 1:1 문의 목록 조회
router.get('/list/:userTag', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    controllerPersonal.count(req)
        .then(count => {
            controllerPersonal.list(req)
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

//1:1문의 상세조회
router.get('/:personalId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    controllerPersonal.get(req)
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

//1:1문의 상세조회
router.put('/:personalId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let personalId = req.params.personalId;
    let params = req.body;

    controllerPersonal.update(country, personalId, params)
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

//1:1문의 시 파일 업로드
let multer = require('multer');
let upload = multer({ dest: '/data/resources/img/other' });
router.post('/:personalId/images', upload.array('image'), function (req, res, next) {

    let bitwebResponse = new BitwebResponse();
    let personalId = req.params.personalId;
    let country = dbconfig.country;
    // let awsS3 = require('../utils/awsS3');
    // let multiUpload = awsS3.multiUpload();

    if (personalId != null) {
        // multiUpload(req, res, function (err, result) {
        //     if (err) {
        //         res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        //         return;
        //     }

        console.log('req.file=>', JSON.stringify(req.files))
        let data = {
            "images": []
        }
        for(var i =0; i< req.files.length; i++) {
            let image = {
                "path": dbconfig.resources_path + "other/" + req.files[i].location,
                "bucket": req.files[i].bucket,
                "key": req.files[i].key,
                "origin_name": req.files[i].originalname,
                "size": req.files[i].size,
                "mimetype": req.files[i].mimetype,
                "regDate": util.formatDate(new Date().toLocaleString('ko-KR'))
            }

            data['images'].push(image);
        }

        for(var i=0; i<data['images'].length; i++) {
            if(data['images'][i] == null) {
                data['images'].splice(i,1);
                i--;
            }
        }

        controllerPersonal.update(country, personalId, data)
            .then((result) => {

                bitwebResponse.code = 200;
                bitwebResponse.data = result.images;
                res.status(200).send(bitwebResponse.create())
            }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    } else {
        let err = "Need personalId in path parameter"
        bitwebResponse.code = 400;
        bitwebResponse.message = err;
        res.status(400).send(bitwebResponse.create())
    }

});

module.exports = router;