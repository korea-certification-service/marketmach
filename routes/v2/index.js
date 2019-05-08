let express = require('express');
let router = express.Router();
let datetime = require('node-datetime');
let controllerUsers = require('../../controllers/users');
var controllerCoins = require('../../controllers/coins');
var controllerAgreements = require('../../controllers/agreements');
var controllerPoints = require('../../controllers/points');
let BitwebResponse = require('../../utils/BitwebResponse');
var mqtt = require('../../utils/mqtt');
const crypto = require("crypto");

let db = require('../../utils/db');
let sessionChecker = require('../../utils/session');
let util = require('../../utils/util')
let dbconfig = require('../../config/dbconfig');

let client_id = 'N190vIFvGWb_8YJWKoLJ';
let client_secret = 'Q352gLIubZ';
let state = "RAMDOM_STATE";
let redirectURI = encodeURI("http://localhost:3000/v2/naverLoginCallback");
let api_url = "";

router.get('/login', function (req, res, next) {
    res.render('v2/login/login', {title: 'Bitweb Main'});
});

router.get('/naverLoginCallback', function (req, res, next) {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let parse_token_body = JSON.parse(body);
            options = {
                url: "https://openapi.naver.com/v1/nid/me",
                headers: {"Authorization":"Bearer " + parse_token_body.access_token}
            };
            //To-Do : 네이버 user 초회
            request.get(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let parse_user_body = JSON.parse(body);
                    //To-Do : users에 저장
                    var bitwebResponse = new BitwebResponse();
                    let country = dbconfig.country;
                    console.log(parse_token_body.access_token, parse_user_body);

                    controllerUsers.getByUserTagAndEmail(country, parse_user_body.response.email.toString().split('@')[0], parse_user_body.response.email)
                        .then(result=> {

                            if (result != null) {
                                req.session.userTag = result.userTag;
                                req.session.userId = result._id;
                                req.session.active = result.active;
                                req.session.country = dbconfig.country;
                                req.session.teenager = parseInt(parse_user_body.response.age.toString().split('-')[0]) > 10 ? true : false;
                                res.end("<script>opener.location.href = '/'; window.close();</script>");
                            } else {
                                let agreements = {
                                    "use": "true",
                                    "teenager": parseInt(parse_user_body.response.age.toString().split('-')[0]) > 10 ? "true" : "false",
                                    "privacy": "true"
                                };
                                let points = {"total_point": 0};
                                let userData = {
                                    'body': {
                                        'userTag': parse_user_body.response.email.toString().split('@')[0],
                                        'email': parse_user_body.response.email,
                                        'country': dbconfig.country,
                                        'extLoginType': 'NAVER'
                                    }
                                }

                                controllerCoins.createByCoin(country)
                                    .then(result => {
                                        if (result._id != null) {
                                            let coinId = result._id;
                                            console.log('coinId=>', coinId)
                                            controllerAgreements.createByAgreement(country, agreements)
                                                .then(agreement => {
                                                    if (agreement._id != null) {
                                                        let agreementId = agreement._id;
                                                        controllerPoints.createByPoint(country, points)
                                                            .then(result => {
                                                                if (result._id != null) {
                                                                    let pointId = result._id;
                                                                    controllerUsers.createWithIds(userData, coinId, agreementId, pointId)
                                                                        .then(result => {

                                                                            req.session.userTag = result.userTag;
                                                                            req.session.userId = result._id;
                                                                            req.session.active = false;
                                                                            req.session.country = dbconfig.country;
                                                                            req.session.teenager = agreement.teenager;

                                                                            let jsonData = {};
                                                                            let country = req.session.country;
                                                                            let userId = result._doc._id;
                                                                            let from = dbconfig.mailer.user;
                                                                            let subject = dbconfig.mailer.auth.subject;
                                                                            let link_url = dbconfig.mailer.auth.link_url;

                                                                            jsonData['to'] = result._doc.email;
                                                                            jsonData['from'] = from;
                                                                            jsonData['subject'] = subject;

                                                                            let auth_key = crypto.randomBytes(3).toString("hex");
                                                                            console.log('auth_key=>', auth_key);

                                                                            jsonData['userId'] = userId;
                                                                            jsonData['auth_key'] = auth_key;
                                                                            jsonData['html'] = dbconfig.mailer.auth.content1 + "["
                                                                                + auth_key + "]" + dbconfig.mailer.auth.content2
                                                                                + link_url + dbconfig.mailer.auth.content3
                                                                            mqtt.publishEmail(jsonData)
                                                                                .then((result) => {
                                                                                    // mqtt.subscribeEmail();
                                                                                    let data = {}
                                                                                    data['mail_auth_code'] = auth_key;

                                                                                    controllerUsers.updateEmailAuth(country, userId, data)
                                                                                    res.end("<script>opener.location.href = '/signupSuccess'; window.close();</script>");
                                                                                }).catch((err) => {
                                                                                console.error('err=>', err)
                                                                                res.end("<script>alert('It has been a system problem.');</script>");
                                                                            })
                                                                        }).catch((err) => {
                                                                        console.error('err=>', err)
                                                                        res.end("<script>alert('It has been a system problem.');</script>");
                                                                    })
                                                                }
                                                            }).catch((err) => {
                                                            console.error('err=>', err)
                                                            res.end("<script>alert('It has been a system problem.');</script>");
                                                        })
                                                    }
                                                }).catch((err) => {
                                                console.error('err=>', err)
                                                res.end("<script>alert('It has been a system problem.');</script>");
                                            })
                                        }
                                    }).catch((err) => {
                                    console.error('err=>', err)
                                    res.end("<script>alert('It has been a system problem.');</script>");
                                })
                            }

                        }).catch((err) => {
                        console.error('err=>', err)
                        bitwebResponse.code = 500;
                        bitwebResponse.message = err;
                        res.status(500).send(bitwebResponse.create())
                    });


                } else {
                    res.status(response.statusCode).end();
                    console.log('error = ' + response.statusCode);
                }
            });
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

router.get('/uploads', function (req, res, next) {
    res.render('v2/common/fileupload', {title: 'Bitweb Main'});
});

router.get('/main', function (req, res, next) {
    res.render('v2/main/index', {
        title: 'Bitweb Main',
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
    });
});

// 서브페이지 게시판 퍼블
router.get('/sub/list', function (req, res, next) {
    res.render('v2/sublayout/list', {
        title: 'Bitweb Sub',
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
    });
});

router.get('/sub/p_list', function (req, res, next) {
    res.render('v2/sublayout/photo_list', {
        title: 'Bitweb Sub',
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
    });
});

router.get('/sub/view', function (req, res, next) {
    res.render('v2/sublayout/view', {
        title: 'Bitweb Sub',
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
    });
});

// 회원가입/회원정보찾기 퍼블
router.get('/member/join', function (req, res, next) {
    res.render('v2/sublayout/join', {
        title: 'Bitweb Sub',
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
    });
});

router.get('/member/find', function (req, res, next) {
    res.render('v2/sublayout/find', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
        title: 'Bitweb Sub'});
});

// 나의페이지 퍼블
router.get('/mypage/list', function (req, res, next) {
    res.render('v2/sublayout/mypage_list', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone, 
        title: 'Bitweb Sub', arrDepth:[1,0]});
});

router.get('/mypage/wallet', function (req, res, next) {
    res.render('v2/sublayout/mypage_wallet', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
        title: 'Bitweb Sub', arrDepth:[4,1]});
});

router.get('/mypage/info', function (req, res, next) {
    res.render('v2/sublayout/mypage_info', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
        title: 'Bitweb Sub', arrDepth:[5,1]});
});

// 고객센터 퍼블
router.get('/support' , function(req, res, next) {
    res.render('v2/sublayout/support', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
        title: 'Bitweb Sub', arrDepth:[1,0]});
});

// 이용약관 퍼블
router.get('/legal' , function(req, res, next) {
    res.render('v2/sublayout/legal', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
        title: 'Bitweb Sub', arrDepth:[1,0]});
});

// 이용안내 퍼블
router.get('/howto' , function(req, res, next) {
    res.render('v2/sublayout/howto', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
        title: 'Bitweb Sub', arrDepth:[1,0]});
});

// 커뮤니티 퍼블
router.get('/community' , function(req, res, next) {
    res.render('v2/sublayout/community_list', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
        title: 'Bitweb Sub'});
});
router.get('/community/detail' , function(req, res, next) {
    res.render('v2/sublayout/community_view', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
        title: 'Bitweb Sub'});
});

// 테스트용 퍼블
router.get('/temp/test' , function(req, res, next) {
    res.render('v2/temp/test', {
        userId: req.session.userId,
        coinId: req.session.coinId,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        authPhone: req.session.authPhone,
        title: 'Bitweb Sub'});
});

module.exports = router;
