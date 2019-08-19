const express = require('express');
const router = express.Router();
let request = require('request');
const dbconfig = require('../config/dbconfig');
const communityController = require('../controllers/community');
var sessionChecker = require('../utils/session');
var token = require('../utils/token');
const BitwebResponse = require('../utils/BitwebResponse');
const utils = require('../utils/util');

router.get('/board', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/community', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.params.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx,
    });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/community', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.params.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx,
        });         
    } else {
        res.render('v2_en/community/community', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.params.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx,
    });
    }
});

router.get('/board/:type', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/list', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.params.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx,
    });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/list', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.params.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx,
        });         
    } else {
        res.render('v2_en/community/list', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.params.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx,
    });
    }
});

router.get('/board/detail/:communityId', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/view', {
            title: 'Bitweb Main',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            communityId: req.params.communityId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/view', {
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            communityId: req.params.communityId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone
        });         
    } else {
        res.render('v2_en/community/view', {
            title: 'Bitweb Main',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            communityId: req.params.communityId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone
        });
    }
});

router.get('/register', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/register', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.query.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx
    });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/register', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.query.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx
        });         
    } else {
        res.render('v2_en/community/register', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.query.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx
    });
    }
});

router.get('/modify/:communityId', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/modify', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.query.type,
            title: req.query.title,
            pageIdx: req.query.pageIdx,
            communityId: req.params.communityId
    });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/community/modify', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.query.type,
            title: req.query.title,
            communityId: req.params.communityId,
            pageIdx: req.query.pageIdx
        });         
    } else {
        res.render('v2_en/community/modify', {
            title: 'Bitweb Main', 
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            type: req.query.type,
            title: req.query.title,
            communityId: req.params.communityId,
            pageIdx: req.query.pageIdx
    });
    }
});

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

router.get('/detail/:communityId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let communityId = req.params.communityId;
    let userTag = req.session == undefined ? "" : req.session.userTag;

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

router.delete('/reply/:replyId', token.checkLoginToken, function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let replyId = req.params.replyId;

    let url = dbconfig.APIServer + "/v2/community/reply/" + replyId;
    let header = { 
        'token': dbconfig.APIToken
    };
    
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