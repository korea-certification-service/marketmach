const express = require('express');
const router = express.Router();
let request = require('request');
const dbconfig = require('../config/dbconfig');
const communityController = require('../controllers/community');
const BitwebResponse = require('../utils/BitwebResponse');

router.get('/board', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/community/list', {
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
        res.render('v2_point/community/list', {
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
        res.render('v2_en/community/list', {
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

// router.get('/movie', function (req, res, next) {
//     res.render('community/movie/list', {title: 'Bitweb Main', pageIdx: req.query.pageIdx});
// });

// router.get('/movie/detail', function (req, res, next) {
//     res.render('community/movie/detail', {title: 'Bitweb Main'});
// });

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
            'type': { $regex: type, $options: 'i' }
        },
        "option":{
            "perPage":perPage,
            "pageIdx":pageIdx
        }
    }

    if(req.query.title != undefined) {
        if(type == "movie") {
            body['title'] ={ $regex: req.query.title, $options: 'i' }
        } else {
            body['$or']= [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }}]
        }
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
    let communityId = req.params.communityId

    let url = dbconfig.APIServer + "/v2/community/detail/" + communityId;
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

    // var bitwebResponse = new BitwebResponse();

    // communityController.get(req)
    //     .then(result => {
    //         bitwebResponse.code = 200;
    //         bitwebResponse.data = result;
    //         res.status(200).send(bitwebResponse.create())
    //     }).catch((err) => {
    //     console.error('err=>', err)
    //     bitwebResponse.code = 500;
    //     bitwebResponse.message = err;
    //     res.status(500).send(bitwebResponse.create())
    // })
});

router.put('/detail/:communityId/:recommandYn', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    communityController.modifyRecommandCount(req)
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

router.post('/reply', function (req, res, next) {
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
    // var bitwebResponse = new BitwebResponse();

    // communityController.addReply(req)
    //     .then(result => {
    //         bitwebResponse.code = 200;
    //         bitwebResponse.data = result;
    //         res.status(200).send(bitwebResponse.create())
    //     }).catch((err) => {
    //     console.error('err=>', err)
    //     bitwebResponse.code = 500;
    //     bitwebResponse.message = err;
    //     res.status(500).send(bitwebResponse.create())
    // })
});

router.put('/reply/:replyId', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    let replyId = req.params.replyId

    let url = dbconfig.APIServer + "/v2/community/reply/" + replyId;
    let header = { 
        'token': dbconfig.APIToken
    };
    let body = req.body;
    
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
    // var bitwebResponse = new BitwebResponse();

    // communityController.modifyReply(req)
    //     .then(result => {
    //         bitwebResponse.code = 200;
    //         bitwebResponse.data = result;
    //         res.status(200).send(bitwebResponse.create())
    //     }).catch((err) => {
    //     console.error('err=>', err)
    //     bitwebResponse.code = 500;
    //     bitwebResponse.message = err;
    //     res.status(500).send(bitwebResponse.create())
    // })
});

router.delete('/reply/:replyId', function (req, res, next) {
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
    // var bitwebResponse = new BitwebResponse();

    // communityController.deleteReply(req)
    //     .then(result => {
    //         bitwebResponse.code = 200;
    //         bitwebResponse.data = result;
    //         res.status(200).send(bitwebResponse.create())
    //     }).catch((err) => {
    //     console.error('err=>', err)
    //     bitwebResponse.code = 500;
    //     bitwebResponse.message = err;
    //     res.status(500).send(bitwebResponse.create())
    // })
});

router.put('/reply/:replyId/:recommandYn', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    communityController.modifyReplyCommandCount(req)
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