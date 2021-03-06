/**
 * 회원 가입 및 메인 페이지 관련
 * 작성자 : Chef Kim
 * 작성일 : 2019-11-20
 */
var express = require('express');
var router = express.Router();
var sessionChecker = require('../utils/session');
var util = require('../utils/util')
const dbconfig = require('../config/dbconfig')
var BitwebResponse = require('../utils/BitwebResponse');
var request = require('request');

let controllerUsers = require('../controllers/users');
var controllerAgreements = require('../controllers/agreements');
let controllerAuthPhone = require('../controllers/authPhones');
let client_id = 'N190vIFvGWb_8YJWKoLJ';
let client_secret = 'Q352gLIubZ';
let state = "RAMDOM_STATE";
let redirectURI = encodeURI(dbconfig.naver_login_url);
let api_url = "";
var token = require('../utils/token');

//사용 안함
router.get('/ontology', function (req, res, next) {
    if(dbconfig.country =="KR") {
        res.render('v2/common/ontology_mobile', {title: 'Bitweb Main'});
    } else if(dbconfig.country == "POINT") {
        res.render('v2/common/ontology', {title: 'Bitweb Main'});
        // res.render('v2_point/login/login',  {title: 'Bitweb Main'});         
    } if(dbconfig.country =="ONTOLOGY") {
        res.render('v2/common/ontology_mobile', {title: 'Bitweb Main'});
    } else {
        res.render('v2/common/ontology', {title: 'Bitweb Main'});
        // res.render('v2_en/login/login', {title: 'Bitweb Main'});
    }
});

//사용 안함
router.get('/ontology/sdk', function (req, res, next) {
    if(dbconfig.country =="KR") {
        res.render('v2/common/ontology_sdk', {title: 'Bitweb Main'});
    } else if(dbconfig.country == "POINT") {
        res.render('v2/common/ontology_sdk', {title: 'Bitweb Main'});
    } else {
        res.render('v2/common/ontology_sdk', {title: 'Bitweb Main'});
    }
});

//사용 안함
router.get('/ontology_reg_user', function (req, res, next) {
    res.render('v2_ont/login/ontology_reg_user', {title: 'Bitweb Main'});
});

//시작 페이지
router.get('/', token.checkLoginTokenNoSignIn, function (req, res, next) {

    var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

    console.log('connection IP : ', ip);

    if(dbconfig.country == "KR") {
        res.render('v2/main/index', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/main/index', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/main/index', util.initParam(req, dbconfig));         
    } else {
        res.render('v2_en/main/index', util.initParam(req, dbconfig));
    }
});

//사용 안함
router.get('/nodev_index', function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/main/nodev_index', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/main/nodev_index', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/main/index', util.initParam(req, dbconfig));         
    }else {
        res.render('v2_en/main/nodev_index', util.initParam(req, dbconfig));
    }
});

//시작 페이지
router.get('/main', token.checkLoginTokenNoSignIn, function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

     console.log('connection IP : ', ip);

     if(dbconfig.country == "KR") {
        res.render('v2/main/index', util.initParam(req, dbconfig));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/main/index', util.initParam(req, dbconfig));         
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/main/index', util.initParam(req, dbconfig));         
    }else {
        res.render('v2_en/main/index', util.initParam(req, dbconfig));
    }
});

//로그인 페이지
router.get('/login', function (req, res, next) {
    if(dbconfig.country =="KR") {
        if(req.session.userTag == undefined || req.session.userTag == "") {
            res.render('v2/login/login', {title: 'Bitweb Main'});
        } else {
            res.redirect("/main");
        }
    } else if(dbconfig.country == "POINT") {
        if(req.session.userTag == undefined || req.session.userTag == "") {
            res.render('v2_point/login/login',  {title: 'Bitweb Main'});         
        } else {
            res.redirect("/main");
        }
    } else if(dbconfig.country == "ONTOLOGY") {
        if(req.session.userTag == undefined || req.session.userTag == "") {
            //ontology dapp(임시 경로 - 추후 변경)
            res.render('v2_ont/login/login', {
                title: 'Bitweb Main',
                callbackUrl: dbconfig.ontology.callbackUrl
            });    
        } else {
            res.redirect("/main");
        }     
    }else {
        if(req.session.userTag == undefined || req.session.userTag == "") {
            res.render('v2_en/login/login', {title: 'Bitweb Main'});
        } else {
            res.redirect("/main");
        }
    }
});

//로그아웃
router.get('/logout', function (req, res, next) {    
    req.params['userId'] = req.session.userId;
    req.body['loginToken'] = "";
    controllerUsers.update(req)
    .then((result) => {
        req.session.destroy();
        res.clearCookie("orange__F");
        res.clearCookie("loginToken");
        res.clearCookie("loginToken",{domain:'marketmach.com'});
        
        res.redirect('/');
    }).catch(error => {
        res.redirect('/');
    });
});

//아이디 찾기 페이지
router.get('/findId', function (req, res, next) {
    if(dbconfig.country =="KR") {
        res.render('v2/find/findId', {title: 'Bitweb Find ID', token:dbconfig.APIToken});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/find/findId', {title: 'Bitweb Find ID', token:dbconfig.APIToken});
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/find/findId', {title: 'Bitweb Find ID', token:dbconfig.APIToken});
    } else {
        res.render('v2_en/find/findId', {title: 'Bitweb Find ID', token:dbconfig.APIToken});
    }
});

//패스워드 찾기 페이지
router.get('/findPassword', function (req, res, next) {
    if(dbconfig.country =="KR") {
        res.render('v2/find/findPassword', {title: 'Bitweb Find Password', token:dbconfig.APIToken});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/find/findPassword', {title: 'Bitweb Find Password', token:dbconfig.APIToken});
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/find/findPassword', {title: 'Bitweb Find Password', token:dbconfig.APIToken});
    } else {
        res.render('v2_en/find/findPassword', {title: 'Bitweb Find Password', token:dbconfig.APIToken});
    }
});

//회원가입 동의 페이지
router.get('/agreement', function (req, res, next) {
    if(req.query.tid != undefined) {
        req.session.tid = req.query.tid;
    }

    if(req.query.recommander != undefined) {
        req.session.recommander = req.query.recommander;
    }

    let data = {
        title: 'Bitweb agreement', 
        country: dbconfig.country, 
        authPhone: "N", 
        username: "", 
        phone: "", 
        birth: ""
    };    
    
    if(dbconfig.country =="KR") {
        res.render('v2/login/agreement', data);
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/login/agreement', data);
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/login/agreement', data);
    } else {
        res.render('v2_en/login/agreement', data);
    }
});

//휴대폰 점유 인증 페이지
router.get('/certification', function (req, res, next) {
    if(dbconfig.country =="KR") {
        res.render('v2/login/certification', {"token":dbconfig.APIToken});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/login/certification', {"token":dbconfig.APIToken});
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/login/certification', {"token":dbconfig.APIToken});
    } else {
        res.render('v2_en/login/certification', {"token":dbconfig.APIToken});
    }
});

//회원가입 페이지
router.get('/signup', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    let data = {
        title: 'Bitweb sign up', 
        country: dbconfig.country, 
        authPhone: "Y", 
        username: req.session.name, 
        phone: req.session.phone, 
        birth: req.session.birth,
        sex: req.session.sex,
        commId: req.session.commid,
        foreigner: req.session.foreigner,
        total_mach: dbconfig.bonus.signup,
        countryCode: req.session.countryCode,
        recommander: req.session.recommander,
        ontId: req.session.ontId,
        pushMarketing: false
    };

    if(req.query.pushMarketing != undefined) {
        data.pushMarketing = true;
    }

    if(data.phone == undefined) {
        res.redirect('/agreement');
        next();
    } else {
        controllerUsers.getByPhone(data.country, {$regex: data.phone, $options: 'i' }) 
        .then((user) => {
            if(user == null) {
                // 블랙리스트 명단에 있는지 체크
                let condition = {
                    "birth": data.birth,
                    "userName": data.username,
                    "phone": {$regex: data.phone, $options: 'i' }
                }
                controllerUsers.getBlackList(data.country, condition)
                .then((blacklist) => {
                    if(blacklist.length == 0) {
                        //탈퇴 회원인데 30일이내에 재가입하는지 여부 체크
                        let withdrawCondition = {
                            "phone": {$regex: data.phone, $options: 'i' }
                        }
                        controllerUsers.getWithdrawUser(data.country, withdrawCondition)
                        .then(withdraws => {
                            if(withdraws.length == 0) {
                                if(dbconfig.country =="KR") {
                                    res.render('v2/login/signup', data);
                                } else if(dbconfig.country == "POINT") {
                                    res.render('v2_point/login/signup',data);
                                } else if(dbconfig.country == "ONTOLOGY") {
                                    res.render('v2_ont/login/signup',data);
                                } else {
                                    res.render('v2_en/login/signup', data);
                                }
                            } else {
                                let regDate = withdraws[0]._doc.regDate;
                                let dateDiff = util.dateDiff(regDate, util.formatDate(new Date().toString()));
                                if(dateDiff < 31) {                                
                                    if(dbconfig.country =="KR") {
                                        res.render('v2/login/withdraw', data);
                                    } else if(dbconfig.country == "POINT") {
                                        res.render('v2_point/login/withdraw',data);
                                    } else if(dbconfig.country == "ONTOLOGY") {
                                        res.render('v2_ont/login/withdraw',data);
                                    } else {
                                        res.render('v2_en/login/withdraw', data);
                                    }
                                } else {
                                    if(dbconfig.country =="KR") {
                                        res.render('v2/login/signup', data);
                                    } else if(dbconfig.country == "POINT") {
                                        res.render('v2_point/login/signup',data);
                                    } else if(dbconfig.country == "ONTOLOGY") {
                                        res.render('v2_ont/login/signup',data);
                                    } else {
                                        res.render('v2_en/login/signup', data);
                                    }
                                }
                            }
                        }).catch((err) => {
                            console.error('err=>', err)
                            bitwebResponse.code = 500;
                            bitwebResponse.message = err;
                            res.status(500).send(bitwebResponse.create())
                        });
                    } else {
                        if(dbconfig.country =="KR") {
                            data['id'] = blacklist[0]._doc._id;
                            data['phone'] = blacklist[0]._doc.phone;
                            data['regDate'] = blacklist[0]._doc.regDate;
                            res.render('v2/login/blacklist', data);
                        } else if(dbconfig.country == "POINT") {
                            data['id'] = blacklist[0]._doc._id;
                            data['phone'] = blacklist[0]._doc.phone;
                            data['regDate'] = blacklist[0]._doc.regDate;
                            res.render('v2_point/login/blacklist', data);
                        } else if(dbconfig.country == "ONTOLOGY") {
                            data['id'] = blacklist[0]._doc._id;
                            data['phone'] = blacklist[0]._doc.phone;
                            data['regDate'] = blacklist[0]._doc.regDate;
                            res.render('v2_ont/login/blacklist', data);
                        } else {
                            data['id'] = blacklist[0]._doc._id;
                            data['email'] = blacklist[0]._doc.email;
                            data['regDate'] = blacklist[0]._doc.regDate;
                            res.render('v2_en/login/blacklist', data);
                        }
                    }
                }).catch((err) => {
                    console.error('err=>', err)
                    bitwebResponse.code = 500;
                    bitwebResponse.message = err;
                    res.status(500).send(bitwebResponse.create())
                });
            } else {
                data['id'] = user._doc._id;
                data['userTag'] = user._doc.userTag;
                data['regDate'] = user._doc.regDate;
                if(dbconfig.country =="KR") {
                    res.render('v2/login/existUser', data);
                } else if(dbconfig.country == "POINT") {
                    res.render('v2_point/login/existUser', data);  
                } else if(dbconfig.country == "ONTOLOGY") {
                    res.render('v2_ont/login/existUser', data);  
                } else {
                    res.render('v2_en/login/existUser', data);
                }
            }
        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        });
    }
});

//아이디/패스워드 찾기 결과
router.get('/findResult', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    let data = {
        title: 'Bitweb sign up', 
        country: dbconfig.country, 
        authPhone: "Y", 
        username: req.session.name, 
        phone: req.session.phone, 
        birth: req.session.birth
    };

    if(data.phone == undefined) {
        res.redirect('/' + req.query.type);
        //next();
    } else {
        controllerUsers.getByPhone(data.country, data.phone) 
        .then((user) => {
            if(user == null) {
                res.redirect('/noResult');
            } else {
                data['id'] = user._doc._id;
                data['userTag'] = user._doc.userTag;
                data['regDate'] = user._doc.regDate;
                
                if(req.query.type == "findId") {
                    if(dbconfig.country =="KR") {
                        res.render('v2/login/existUser', data);
                    } else if(dbconfig.country == "POINT") {
                        res.render('v2_point/login/existUser',data);
                    } else if(dbconfig.country == "ONTOLOGY") {
                        res.render('v2_ont/login/existUser',data);
                    } else {
                        res.render('v2_en/login/existUser', data);
                    }
                } else {
                    if(dbconfig.country =="KR") {
                        res.render('v2/find/changePassword', data);
                    } else if(dbconfig.country == "POINT") {
                        res.render('v2_point/find/changePassword', data);     
                    } else if(dbconfig.country == "ONTOLOGY") {
                        res.render('v2_ont/find/changePassword', data);     
                    } else {
                        res.render('v2_en/find/changePassword', data);
                    }
                }
            }
        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        });
    }
});

//존재하는 사용자인지 확인
router.get('/existUser', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();

    let data = {
        title: 'Bitweb exist user'
    };

    controllerUsers.getById(dbconfig.country, req.query.id)
        .then(user => {
            data['userTag'] = user._doc.userTag;
            data['regDate'] = user._doc.regDate;
            if(dbconfig.country =="KR") {
                res.render('v2/login/existUser', data);
            } else if(dbconfig.country == "POINT") {
                res.render('v2_point/login/existUser', data);     
            } else if(dbconfig.country == "ONTOLOGY") {
                res.render('v2_ont/login/existUser', data);     
            } else {
                res.render('v2_en/login/existUser', data);
            }
        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        });
});

//패스워드 변경 페이지
router.get('/changePassword', function (req, res, next) {
    var bitwebResponse = new BitwebResponse();
    
    let data = {
        title: 'Bitweb exist user'
    };

    controllerUsers.getById(dbconfig.country, req.query.id)
        .then(user => {
            data['userTag'] = user._doc.userTag;
            data['regDate'] = user._doc.regDate;
            if(dbconfig.country =="KR") {
                res.render('v2/login/existUser', data);
            } else if(dbconfig.country == "POINT") {
                res.render('v2_point/login/existUser', data);   
            } else if(dbconfig.country == "ONTOLOGY") {
                res.render('v2_ont/login/existUser', data);   
            } else {
                res.render('v2_en/login/existUser', data);
            }
        }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        });
});

//존재하지 않는 사용자인 경우 호출하는 페이지
router.get('/noResult', function (req, res, next) {
    if(dbconfig.country =="KR") {
        res.render('v2/find/noResult', {title: 'Bitweb find no result'});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/find/noResult', {title: 'Bitweb find no result'});    
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/find/noResult', {title: 'Bitweb find no result'});    
    } else{
        res.render('v2_en/find/noResult', {title: 'Bitweb find no result'});
    }
});

//회원가입 성공 체이지
router.get("/signupSuccess", function (req, res, next) {
    if(dbconfig.country =="KR") {
        res.render('v2/login/signupSuccess', {title: 'Bitweb sign up success'});
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/login/signupSuccess', {title: 'Bitweb sign up success'});     
    } else if(dbconfig.country == "ONTOLOGY") {
        res.render('v2_ont/login/signupSuccess', {title: 'Bitweb sign up success'});     
    } else {
        res.render('v2_en/login/signupSuccess', {title: 'Bitweb sign up success'});
    }
});

//사용 안함
router.get("/emailAuth", sessionChecker.emailAuthChecker, function (req, res, next) {
    res.render('login/emailAuth', {title: 'Bitweb sign up success', userId: req.session.userId});
});

//사용 안함
router.get("/naveraf72822281097f80bf131c58b3c9abdb.html", function (req, res, next) {
    res.render('naveraf72822281097f80bf131c58b3c9abdb', {title: 'private'});
});

//사용 안함
router.get("/google2def744eaae3698d.html", function (req, res, next) {
    res.render('google2def744eaae3698d', {title: 'private'});
});

//VTR 페이지
router.get('/room', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country =="KR") {
        res.render('v2/common/vtr', util.initVtrRoomParam(dbconfig.country, req.query.itemId, req.session.userTag, 
            req.query.buyerTag, req.query.sellerTag, dbconfig.chatbot_vtr_url,req.query.buyerTag + "|" + req.query.sellerTag + "|" + req.query.itemId));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/common/vtr', util.initVtrRoomParam(dbconfig.country, req.query.itemId, req.session.userTag, 
            req.query.buyerTag, req.query.sellerTag, dbconfig.chatbot_vtr_url,req.query.buyerTag + "|" + req.query.sellerTag + "|" + req.query.itemId));    
    } else {
        res.render('v2_en/common/vtr', util.initVtrRoomParam(dbconfig.country, req.query.itemId, req.session.userTag, 
            req.query.buyerTag, req.query.sellerTag, dbconfig.chatbot_vtr_url,req.query.buyerTag + "|" + req.query.sellerTag + "|" + req.query.itemId));
    }
});

//SMS에서 링크 클릭시 VTR 페이지
router.get('/sms/room', function (req, res, next) {
    if(dbconfig.country =="KR") {
        res.render('v2/common/vtr_for_sms', util.initVtrRoomParam(dbconfig.country, req.query.itemId, req.session.user_id, 
            req.query.roomToken.split('|')[0], req.query.roomToken.split('|')[1], dbconfig.chatbot_vtr_url, req.query.roomToken));
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/common/vtr_for_sms', util.initVtrRoomParam(dbconfig.country, req.query.itemId, req.session.user_id, 
            req.query.roomToken.split('|')[0], req.query.roomToken.split('|')[1], dbconfig.chatbot_vtr_url, req.query.roomToken));     
    } else {
        res.render('v2_en/common/vtr_for_sms', util.initVtrRoomParam(dbconfig.country, req.query.itemId, req.session.user_id, 
            req.query.roomToken.split('|')[0], req.query.roomToken.split('|')[1], dbconfig.chatbot_vtr_url, req.query.roomToken));
    }
});

//사용 안함
router.get("/checkUrl", token.checkLoginToken, function (req, res, next) {
    let cookie_data = req.cookies.key;
    let start = cookie_data.indexOf("orange__F");
    let cValue = '';
    if(start != -1) {
        start += "orange__F".length;
        var end = cookie_data.indexOf(';', start);
        if (end == -1) end = cookie_data.length;
        cValue = cookie_data.substring(start, end);
        res.redirect(dbconfig.chatbot_url + '?cmod=cs&orange__F' + cValue);
    } else {
        res.redirect("/chatbot/login");
    }
});

//사용 안함
router.get('/naverLoginCallback', function (req, res, next) {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    
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
                    let email = parse_user_body.response.email;

                    controllerUsers.getByUserEmail(country, email)
                        .then(result=> {

                            if (result != null) {
                                req.session.userTag = result.userTag;
                                req.session.userId = result._id;
                                req.session.active = result.active;
                                req.session.country = dbconfig.country;
                                res.end("<script>opener.location.href = '/'; window.close();</script>");
                            } else {
                                res.end("<script>opener.location.href = '/signup?userId=' + userId + '&email=' + email; window.close();</script>");
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

//휴대폰 본인 인증 시작 페이지
router.get('/reg/auth/start', function (req, res, next) {
    if(dbconfig.country =="KR") {
        //이니시스 휴대폰 인증 요청 카운트 저장
        let country = dbconfig.country;
        let reqData = {
            "country": country,
            "regDate": util.formatDate(new Date().toString())
        }
        controllerAuthPhone.add(country, reqData);
    }
    res.render('v2/auth/start', {title: 'Bitweb Main', "okurl":dbconfig.inicis.url + dbconfig.inicis.auth.reg_auth_ok_url, "closeUrl":dbconfig.inicis.url + dbconfig.inicis.auth.closeUrl});
});

//사용 안함
router.get('/reg/auth/find_password_start', function (req, res, next) {
    if(dbconfig.country =="KR") {
        //이니시스 휴대폰 인증 요청 카운트 저장
        let country = dbconfig.country;
        let reqData = {
            "country": country,
            "regDate": util.formatDate(new Date().toString())
        }
        controllerAuthPhone.add(country, reqData);
    }
    res.render('v2/auth/findPasswordStart', {title: 'Bitweb Main', "okurl":dbconfig.inicis.url + dbconfig.inicis.auth.findPasswordUrl, "closeUrl":dbconfig.inicis.url + dbconfig.inicis.auth.closeUrl});
});

//사용 안함
router.get('/modify/auth/start', function (req, res, next) {
    if(dbconfig.country =="KR") {
        //이니시스 휴대폰 인증 요청 카운트 저장
        let country = dbconfig.country;
        let reqData = {
            "country": country,
            "regDate": util.formatDate(new Date().toString())
        }
        controllerAuthPhone.add(country, reqData);
    }
    res.render('v2/auth/start_modify', {title: 'Bitweb Main', "okurl":dbconfig.inicis.url + dbconfig.inicis.auth.modify_auth_ok_url});
});

//휴대폰 본인 인증 완료 페이지
router.post('/reg/auth/okurl', function (req, res, next) {
    request({uri: "https://www.marketmach.com:8080/inicis/decode.php", 
            method:'POST',
            form: req.body, 
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            console.log('success : ', body);
            req.session.birth = result.Socialno;
            req.session.name = result.Name;
            req.session.phone = result.No;
            req.session.sex = result.Sex;
            req.session.commid = result.Commid;
            req.session.foreigner = result.Foreigner;
            req.session.authPhone = true;

            //res.render('v2/auth/okurl', result);
            let reqData = {
                "birth": result.Socialno,
                "userName": result.Name,
                "phone": result.No,
                "countryCode":"+82",
                "sex": result.Sex,
                "commId": result.Commid,
                "foreigner": result.Foreigner
            }

            let year = result.Socialno.substr(0,4);
            let month = result.Socialno.substr(4,2);
            let day = result.Socialno.substr(6,2);
            let diffAge = util.checkAdult(new Date(year,month,day).toString(), new Date().toString());
            let agreements = {
                teenager: true,
                kyc: true
            }
            if(diffAge < 19) {
                agreements.teenager = false;
            }

            var bitwebResponse = new BitwebResponse();
            controllerUsers.updateByUserTag(dbconfig.country, req.session.userTag, reqData)
            .then(user => {
                controllerAgreements.updateById(dbconfig.country, user._doc.agreementId, agreements)
                .then(agreement => {
                    req.session.teenager = agreements.teenager;
                    req.session.kyc = agreements.kyc;
                    res.render('v2/auth/okurl');
                }).catch((err) => {
                    // console.error('err=>', err)
                    bitwebResponse.code = 500;
                    bitwebResponse.message = err;
                    res.status(500).send(bitwebResponse.create())
                })
            }).catch((err) => {
                // console.error('err=>', err)
                bitwebResponse.code = 500;
                bitwebResponse.message = err;
                res.status(500).send(bitwebResponse.create())
            })
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

//사용 안함
router.post('/reg/auth/findPasswordOkurl', function (req, res, next) {
    request({uri: "https://www.marketmach.com:8080/inicis/decode.php", 
            method:'POST',
            form: req.body, 
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            console.log('success : ', body);
            req.session.birth = result.Socialno;
            req.session.name = result.Name;
            req.session.phone = result.No;
            req.session.sex = result.Sex;
            req.session.commid = result.Commid;
            req.session.foreigner = result.Foreigner;
            req.session.authPhone = true;

            res.render('v2/auth/findPassword_okurl', result);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

//사용 안함
router.post('/modify/auth/okurl', function (req, res, next) {
    request({uri: "https://www.marketmach.com:8080/inicis/decode.php", 
            method:'POST',
            form: req.body, 
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            console.log('success : ', body);
            req.session.birth = result.Socialno;
            req.session.name = result.Name;
            req.session.phone = result.No;
            req.session.sex = result.Sex;
            req.session.commid = result.Commid;
            req.session.foreigner = result.Foreigner;
            req.session.authPhone = true;

            res.render('v2/auth/okurl_modify', result);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

//휴대폰 본인 인증 결과 조회
router.get('/getPhone', function (req, res, next) {
    let bitwebResponse = new BitwebResponse();
    bitwebResponse.code = 200;
    bitwebResponse.data = {
        "authPhone":req.session.authPhone,
        "phone":req.session.phone,
        "userName": req.session.name,
        "birth": req.session.birth,
        "sex": req.session.sex,
        "commId": req.session.commid,
        "foreigner": req.session.foreigner
    };
    res.status(200).send(bitwebResponse.create())
})

//사용 안함
router.post('/fileuploads',  function (req, res, next) {
    let bitwebResponse = new BitwebResponse();
    let country = dbconfig.country;
    let awsS3 = require('../utils/awsS3');
    let multiUpload = awsS3.multiUpload();

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
                "regDate": util.formatDate(new Date().toLocaleString('ko-KR'))
            }

            data['images'].push(image);
        }

        bitwebResponse.code = 200;
        bitwebResponse.data = data;
        res.status(200).send(bitwebResponse.create())
    });
});

//login token 존재 여부 체크
router.get('/v1/ajaxLoginYnCheck', function (req, res, next) {
    token.checkLoginTokenAjax(req, res, next);
});

module.exports = router;
