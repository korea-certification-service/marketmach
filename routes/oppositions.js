/**
 * 이의제기 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var BitwebResponse = require('../utils/BitwebResponse');
var controllerOpposition = require('../controllers/oppositions');
var controllerVtrs = require('../controllers/vtrs');
var controllerpointTrades = require('../controllers/pointTrades');
var controllerItem = require('../controllers/items');
const dbconfig = require('../config/dbconfig');
var util = require('../utils/util');

//이의 제기 등록
router.post('/', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let itemId = req.body.itemId;
    if(country != "KR") {
        req.body['country'] = country;
    }

    controllerItem.getByItemId(country, itemId, "", "")
        .then(item => {
            if(item._doc['status'] == 3 || item._doc['status'] == 4) {
                item._doc['status'] = 5;
            } else {
                item._doc['status'] = 105;
            }
            req.body['item'] = item;
            controllerOpposition.add(req)
                .then(_result => {
                    controllerVtrs.opposition(country, itemId)
                        .then((vtr) => {
                            let result = vtr;
                            controllerpointTrades.opposition(country, itemId)
                            .then((pointTrade) => {
                                if(pointTrade != null) result = pointTrade;
                                bitwebResponse.code = 200;
                                bitwebResponse.data = _result;
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
                    // bitwebResponse.code = 200;
                    // bitwebResponse.data = result;
                    // res.status(200).send(bitwebResponse.create())
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
});

//사용자별 이의 제기 목록 조회
router.get('/list/:userTag', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    controllerOpposition.count(req)
        .then(count => {
            controllerOpposition.list(req)
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

//이의 제기 상세조회
router.get('/:oppositionId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    controllerOpposition.get(req)
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

//이의 제기 수정
router.put('/:oppositionId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let oppositionId = req.params.oppositionId;
    let params = req.body;

    controllerOpposition.update(country, oppositionId, params)
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

//이의 제기 등록/수정 시 이미지 업로드
let multer = require('multer');
let upload = multer({ dest: '/data/resources/img/other' });
router.post('/:oppositionId/images', upload.array('image'), function (req, res, next) {

    let bitwebResponse = new BitwebResponse();
    let oppositionId = req.params.oppositionId;
    let country = dbconfig.country;
    // let awsS3 = require('../utils/awsS3');
    // let multiUpload = awsS3.multiUpload();

    if (oppositionId != null) {
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

        controllerOpposition.update(country, oppositionId, data)
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
        let err = "Need oppositionId in path parameter"
        bitwebResponse.code = 400;
        bitwebResponse.message = err;
        res.status(400).send(bitwebResponse.create())
    }

});

module.exports = router;