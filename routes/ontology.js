var express = require('express');
var router = express.Router();
var BitwebResponse = require('../utils/BitwebResponse')
var util = require('../utils/util');
var request = require('request');
let dbconfig = require('../config/dbconfig');

router.post('/callback/login', function(req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let data = req.body;
    console.log(data);

    if(data != undefined) {
        //ONT ID 조회
        let url = dbconfig.APIServer + "/v2/users/ontId/login";
        let header = {
            'loginToken': req.cookies.loginToken,
            'token': dbconfig.APIToken
        };
        let reqs = {uri: url, 
            method:'POST',
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
                //ontId session 정보에 저장
                req.session.ontId = result.getUser.ontId;
                if(result.getUser.userTag != null) {
                    req.session.userTag = result.getUser.userTag;
                    req.session.userId = result.getUser._id;
                    req.session.userName = result.getUser.userName;
                    req.session.coinId = result.getUser.coinId;
                    req.session.pointId = result.getUser.pointId;
                    req.session.active = result.getUser.active;
                    req.session.country = dbconfig.country;
                    req.session.bitberry_token = result.getUser.bitberry_token;
                    if(result.agreement != null) {
                        req.session.teenager = result.agreement.teenager;
                        req.session.authPhone = result.agreement.authPhone;                
                        req.session.kyc = result.agreement.kyc == undefined ? false : result.agreement.kyc;
                        let tokenValue = result.updatedUser.loginToken;

                        res.cookie("loginToken", tokenValue, {
                            domain: 'marketmach.com',
                            expires: new Date(Date.now() + (60 * 60 * 1000)), //1시간
                        });
        
                        res.cookie("loginToken", tokenValue, {
                            expires: new Date(Date.now() + (60 * 60 * 1000)), //1시간
                        });
                    }
                }
                
                bitwebResponse.code = 200;
                bitwebResponse.data = result.getUser;
                res.status(200).send(bitwebResponse.create())
            } else {
                console.error('err=>', error)
                bitwebResponse.code = 500;
                bitwebResponse.message = error;
                res.status(500).send(bitwebResponse.create())
            }
        });
    } else {
        console.log('error => no data.');
        bitwebResponse.code = 500;
        bitwebResponse.message = "inital error";
        res.status(500).send(bitwebResponse.create());
    }
});

module.exports = router;