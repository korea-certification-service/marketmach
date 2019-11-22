/**
 * kyc 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var BitwebResponse = require('../utils/BitwebResponse');
var util = require('../utils/util');
var dbconfig = require('../config/dbconfig');

//KYC 등록
router.post('/', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let body = req.body;
    body['regDate'] = util.formatDate(new Date().toString())

    let url = dbconfig.APIServer + "/v2/kycs";
    let header = {
        'loginToken': req.cookies.loginToken,
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'POST',
        headers: header,
        body:body,
        json: true
    }

    //API 서버로 내부 call요청한다.
    request(reqs, function (error, response, body) {  
        console.log(error, response, body);
        if (!error && response.statusCode == 200) {
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.error('err=>', error)
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create())
        }
    });
});

//사용자 KYC 조회 
router.get('/:userId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let userId = req.params.userId;

    let url = dbconfig.APIServer + "/v2/kycs/" + userId;
    let header = {
        'loginToken': req.cookies.loginToken,
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'GET',
        headers: header
    }

    //API 서버로 내부 call요청한다.
    request(reqs, function (error, response, body) {  
        console.log(error, response, body);
        if (!error && response.statusCode == 200) {
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.error('err=>', error)
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create())
        }
    });
});

//KYC 수정
router.put('/:userId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let userId = req.params.userId;
    let body = req.body;

    let url = dbconfig.APIServer + "/v2/kycs/" + userId;
    let header = {
        'loginToken': req.cookies.loginToken,
        'token': dbconfig.APIToken
    };
    let reqs = {uri: url, 
        method:'PUT',
        headers: header,
        body:body,
        json: true
    }

    //API 서버로 내부 call요청한다.
    request(reqs, function (error, response, body) {  
        console.log(error, response, body);
        if (!error && response.statusCode == 200) {
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            
            bitwebResponse.code = 200;
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.error('err=>', error)
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create())
        }
    });
});

//KYC 등록/수정 시 이미지 업로드
router.post('/:kycId/images', function (req, res, next) {

    let bitwebResponse = new BitwebResponse();
    let kycId = req.params.kycId;
    let country = dbconfig.country;
    let awsS3 = require('../utils/awsS3');
    let multiUpload = awsS3.multiUpload();

    if (kycId != null) {
        multiUpload(req, res, function (err, result) {
            if (err) {
                res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
                return;
            }

            console.log('req.file=>', JSON.stringify(req.files))
            let data = {
                "images": []
            }
            for(var i =0; i< req.files.length; i++) {
                let image = {
                    "path": req.files[i].location,
                    "bucket": req.files[i].bucket,
                    "key": req.files[i].key,
                    "origin_name": req.files[i].originalname,
                    "size": req.files[i].size,
                    "mimetype": req.files[i].mimetype,
                    "regDate": util.formatDate(new Date().toString())
                }

                data['images'].push(image);
            }

            for(var i=0; i<data['images'].length; i++) {
                if(data['images'][i] == null) {
                    data['images'].splice(i,1);
                    i--;
                }
            }

            let url = dbconfig.APIServer + "/v2/kycs/" + req.session.userId;
            let header = {
                'loginToken': req.cookies.loginToken,
                'token': dbconfig.APIToken
            };
            let reqs = {uri: url, 
                method:'PUT',
                headers: header,
                body:data,
                json: true
            }

            //API 서버로 내부 call요청한다.
            request(reqs, function (error, response, body) {  
                console.log(error, response, body);
                if (!error && response.statusCode == 200) {
                    let result = body.data;
                    if(typeof(body) == "string") {
                        result = JSON.parse(body).data;
                    }
                    
                    bitwebResponse.code = 200;
                    bitwebResponse.data = result;
                    res.status(200).send(bitwebResponse.create())
                } else {
                    console.error('err=>', error)
                    bitwebResponse.code = 500;
                    bitwebResponse.message = error;
                    res.status(500).send(bitwebResponse.create())
                }
            });
        });
    } else {
        let err = "Need kycId in path parameter"
        bitwebResponse.code = 400;
        bitwebResponse.message = err;
        res.status(400).send(bitwebResponse.create())
    }
});

module.exports = router;