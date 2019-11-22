/**
 * 커뮤니티 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
const express = require('express');
const router = express.Router();
let request = require('request');
const dbconfig = require('../config/dbconfig');
const communityController = require('../controllers/community');
var sessionChecker = require('../utils/session');
var token = require('../utils/token');
const BitwebResponse = require('../utils/BitwebResponse');
const utils = require('../utils/util');
var util = require('../utils/util');

//커뮤니티 카테고라 페이지
router.get('/board', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/community', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/community', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/community/community', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/community/community', util.initParam(req, dbconfig));
    }
});

//커뮤니티 목록 페이지
router.get('/board/:type', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/list', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/list', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/community/list', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/community/list', util.initParam(req, dbconfig));
    }
});

//커뮤니티 상세보기 페이지
router.get('/board/detail/:communityId', token.checkLoginTokenNoSignIn, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/view', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/view', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/community/view', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/community/view', util.initParam(req, dbconfig));
    }
});

//커뮤니티 등록 페이지
router.get('/register', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/register', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/register', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/community/register', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/community/register', util.initParam(req, dbconfig));
    }
});

//커뮤니티 수정 페이지
router.get('/modify/:communityId', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/modify', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/modify', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/community/modify', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/community/modify', util.initParam(req, dbconfig));
    }
});

//커뮤니티 목록 조회
router.get('/list', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let type = req.query.type == undefined ? "" : req.query.type;
    let pageIdx = req.query.pageIdx;
    let perPage = req.query.perPage == undefined ? 20 : req.query.perPage;

    let url = dbconfig.APIServer + "/v2/community/list";
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = {
        "param":{
            "country": dbconfig.country,
            'type': type
        },
        "option":{
            "perPage":perPage,
            "pageIdx":pageIdx
        }
    }

    if(req.query.title != undefined) {
        body['param']['$or']= [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }}]
    };
    //Marketmach-backend 서버 호출
    request({uri: url, 
            method:'POST',
            headers: header,
            body: body,
            json: true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//커뮤니티 상세 조회
router.get('/detail/:communityId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let communityId = req.params.communityId;
    let userTag = req.session.userTag == "" ? undefined : req.session.userTag;

    let url = dbconfig.APIServer + "/v2/community/detail/" + communityId + "/" + userTag;
    let header = { 
        'token': dbconfig.APIToken
    };
    
    request({uri: url, 
            method:'GET',
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//커뮤니티 추천여부
router.put('/detail/:communityId/:recommandYn', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let communityId = req.params.communityId;
    let recommandYn = req.params.recommandYn;

    let url = dbconfig.APIServer + "/v2/community/detail/" + communityId + "/" + recommandYn;
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = {
        "param": {"reqUser": req.session.userTag}
    }
    //Marketmach-backend 서버 호출
    request({uri: url, 
            method:'PUT',
            headers: header,
            body:body,
            json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//커뮤니티 등록
router.post('/', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.APIServer + "/v2/community";
    let country = dbconfig.country;
    if(country != "KR") req.body['country'] = country;
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = {
        "param":req.body
    }
    //Marketmach-backend 서버 호출
    request({uri: url, 
            method:'POST',
            headers: header,
            body:body,
            json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//커뮤니티 수정
router.put('/:communityId', token.checkLoginToken, function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let communityId = req.params.communityId;
    let url = dbconfig.APIServer + "/v2/community/" + communityId;
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = {
        "param":req.body
    }
    //Marketmach-backend 서버 호출
    request({uri: url, 
            method:'PUT',
            headers: header,
            body:body,
            json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//커뮤니티 삭제
router.delete('/:communityId', token.checkLoginToken, function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let communityId = req.params.communityId;

    let url = dbconfig.APIServer + "/v2/community/" + communityId;
    let header = { 
        'token': dbconfig.APIToken
    };
    //Marketmach-backend 서버 호출
    request({uri: url, 
            method:'DELETE',
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//커뮤니티 파일 업로드
router.post('/:communityId/images', token.checkLoginToken, function (req, res, next) {

    let bitwebResponse = new BitwebResponse();
    let communityId = req.params.communityId;
    let awsS3 = require('../utils/awsS3');
    let multiUpload = awsS3.multiUpload();

    if (communityId != null) {
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
                    "regDate": utils.formatDate(new Date().toLocaleString('ko-KR'))
                }

                data['images'].push(image);
            }

            for(var i=0; i<data['images'].length; i++) {
                if(data['images'][i] == null) {
                    data['images'].splice(i,1);
                    i--;
                }
            }

            let url = dbconfig.APIServer + "/v2/community/" + communityId;
            let header = { 
                'token': dbconfig.APIToken
            };
            let body = {
                "param":data
            }
            //Marketmach-backend 서버 호출
            request({uri: url, 
                    method:'PUT',
                    headers: header,
                    body:body,
                    json:true}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    bitwebResponse.code = 200;
                    let result = body.data;
                    if(typeof(body) == "string") {
                        result = JSON.parse(body).data;
                    }
                    bitwebResponse.data = result.images;
                    res.status(200).send(bitwebResponse.create())
                } else {
                    console.log('error = ' + response.statusCode);
                    bitwebResponse.code = 500;
                    bitwebResponse.message = error;
                    res.status(500).send(bitwebResponse.create());
                }
            });

            // controllerItems.updateById(country, itemId, data)
            //     .then((result) => {

            //         bitwebResponse.code = 200;
            //         bitwebResponse.data = result.images;
            //         res.status(200).send(bitwebResponse.create())
            //     }).catch((err) => {
            //     console.error('err=>', err)
            //     bitwebResponse.code = 500;
            //     bitwebResponse.message = err;
            //     res.status(500).send(bitwebResponse.create())
            // })
        });
    } else {
        let err = "Need itemId in path parameter"
        bitwebResponse.code = 400;
        bitwebResponse.message = err;
        res.status(400).send(bitwebResponse.create())
    }

});

//커뮤니티 댓글 등록
router.post('/reply', token.checkLoginToken, function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let url = dbconfig.APIServer + "/v2/community/reply";
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = req.body;
    
    request({uri: url, 
            method:'POST',
            headers: header,
            body:body,
            json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//커뮤니티 댓글 수정
router.put('/reply/:replyId', token.checkLoginToken, function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let replyId = req.params.replyId

    let url = dbconfig.APIServer + "/v2/community/reply/" + replyId;
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = {
        "param": req.body
    }
    //Marketmach-backend 서버 호출
    request({uri: url, 
            method:'PUT',
            headers: header,
            body:body,
            json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

//커뮤니티 댓글 삭제
router.delete('/reply/:replyId', token.checkLoginToken, function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let replyId = req.params.replyId;

    let url = dbconfig.APIServer + "/v2/community/reply/" + replyId;
    let header = { 
        'token': dbconfig.APIToken
    };
    //Marketmach-backend 서버 호출
    request({uri: url, 
            method:'DELETE',
            headers: header}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});
//커뮤니티 댓글 추천 처리(현재 사용 안함)
router.put('/reply/:replyId/:recommandYn', token.checkLoginToken, function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let replyId = req.params.replyId;
    let recommandYn = req.params.recommandYn;

    let url = dbconfig.APIServer + "/v2/community/reply/" + replyId + "/" + recommandYn;
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = {
        "param": {"reqUser": req.session.userTag}
    }
    
    request({uri: url, 
            method:'PUT',
            headers: header,
            body:body,
            json:true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bitwebResponse.code = 200;
            let result = body.data;
            if(typeof(body) == "string") {
                result = JSON.parse(body).data;
            }
            bitwebResponse.data = result;
            res.status(200).send(bitwebResponse.create())
        } else {
            console.log('error = ' + response.statusCode);
            bitwebResponse.code = 500;
            bitwebResponse.message = error;
            res.status(500).send(bitwebResponse.create());
        }
    });
});

module.exports = router;