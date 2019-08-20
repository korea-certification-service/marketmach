/**
 * Token 생성 모듈
 * - Login Token 
 * 작성자 : Chef Kim
 * 작성일 : 2019-07-11
 */
let CryptoJS = require("crypto-js");
let dbconfig = require('../config/dbconfig');
let controllerUsers = require('../controllers/users');
let controllerAgreements = require('../controllers/agreements');
let BitwebResponse = require('./BitwebResponse');

//로그인 토큰 생성
function makeLoginToken(value) {
    let passphrase = dbconfig.cryptoJS.passphrase;
    let encryptValue = CryptoJS.AES.encrypt(value, passphrase);
    return encryptValue.toString();
}

//비로그인 상태서 토큰 체크
function checkLoginTokenNoSignIn(req, res, next) {
    let country = dbconfig.country;
    let passphrase = dbconfig.cryptoJS.passphrase;
    let value = req.cookies.loginToken;

    if(value) {
        // let decryptValue = CryptoJS.AES.decrypt(value, passphrase);
        // let loginToken = decryptValue.toString(CryptoJS.enc.Utf8);
        let condition = {
            'loginToken': value
        }
        controllerUsers.detail(country, condition)
        .then(user => {
            if(user == null) {
                // logger.addLog(country, req.originalUrl, value, user);
                next();
            } else {
                let search = {
                    '_id': user._doc.agreementId
                }
                controllerAgreements.detail(country, search)
                .then((agreement) => {
                    res.cookie("loginToken", value, {
                        domain: 'marketmach.com',
                        expires: new Date(Date.now() + (60 * 60 * 1000)), //1시간
                    });
            
                    res.cookie("loginToken", value, {
                        expires: new Date(Date.now() + (60 * 60 * 1000)), //1시간
                    });

                    req.session.userTag = user.userTag;
                    req.session.userId = user._id;
                    req.session.userName = user.userName;
                    req.session.coinId = user.coinId;
                    req.session.pointId = user.pointId;
                    req.session.active = user.active;
                    req.session.country = dbconfig.country;
                    req.session.teenager = agreement.teenager;
                    req.session.authPhone = agreement.authPhone;
                    req.session.bitberry_token = user.bitberry_token;
                    req.session.kyc = agreement._doc.kyc == undefined ? false : agreement._doc.kyc;

                    let resData = {
                        "userTag": user.userTag, 
                        "userId": user._id, 
                        "active": user.active,
                        "userInfo": user,
                        "agreement": agreement
                    }

                    next();
                    //log 생성
                    // logger.addLog(country, req.originalUrl, JSON.stringify(condition), JSON.stringify(resData));

                    // bitwebResponse.code = 200;
                    // bitwebResponse.data = resData;                
                    // res.status(200).send(bitwebResponse.create())
                });
            }
        }).catch((err) => {        
            console.error('login token error =>', err);
            // logger.addLog(country, req.originalUrl, value, JSON.stringify(err));
            next();
        })
    } else {
        console.error('login token error => No exist.');
        // logger.addLog(country, req.originalUrl, value, "No exist.");
        next();
    }
}

//로그인 토큰 체크
function checkLoginToken(req, res, next) {
    let country = dbconfig.country;
    let passphrase = dbconfig.cryptoJS.passphrase;
    let value = req.cookies.loginToken;

    req.session.userTag = "";
    req.session.userId = "";
    req.session.userName = "";
    req.session.coinId = "";
    req.session.pointId = "";
    req.session.active = "";
    req.session.country = "";
    req.session.teenager = "";
    req.session.authPhone = "";
    req.session.bitberry_token = "";
    req.session.kyc = "";

    if(value) {
        // let decryptValue = CryptoJS.AES.decrypt(value, passphrase);
        // let loginToken = decryptValue.toString(CryptoJS.enc.Utf8);
        let condition = {
            'loginToken': value
        }
        controllerUsers.detail(country, condition)
        .then(user => {
            if(user == null) {
                // logger.addLog(country, req.originalUrl, value, user);
                res.redirect('/login');
            } else {
                let search = {
                    '_id': user._doc.agreementId
                }
                controllerAgreements.detail(country, search)
                .then((agreement) => {
                    res.cookie("loginToken", value, {
                        domain: 'marketmach.com',
                        expires: new Date(Date.now() + (60 * 60 * 1000)), //1시간
                    });
            
                    res.cookie("loginToken", value, {
                        expires: new Date(Date.now() + (60 * 60 * 1000)), //1시간
                    });

                    req.session.userTag = user.userTag;
                    req.session.userId = user._id;
                    req.session.userName = user.userName;
                    req.session.coinId = user.coinId;
                    req.session.pointId = user.pointId;
                    req.session.active = user.active;
                    req.session.country = dbconfig.country;
                    req.session.teenager = agreement.teenager;
                    req.session.authPhone = agreement.authPhone;
                    req.session.bitberry_token = user.bitberry_token;
                    req.session.kyc = agreement._doc.kyc == undefined ? false : agreement._doc.kyc;

                    let resData = {
                        "userTag": user.userTag, 
                        "userId": user._id, 
                        "active": user.active,
                        "userInfo": user,
                        "agreement": agreement
                    }

                    next();
                    //log 생성
                    // logger.addLog(country, req.originalUrl, JSON.stringify(condition), JSON.stringify(resData));

                    // bitwebResponse.code = 200;
                    // bitwebResponse.data = resData;                
                    // res.status(200).send(bitwebResponse.create())
                });
            }
        }).catch((err) => {        
            console.error('login token error =>', err);
            // logger.addLog(country, req.originalUrl, value, JSON.stringify(err));
            res.redirect('/login');
        })
    } else {
        console.error('login token error => No exist.');
        // logger.addLog(country, req.originalUrl, value, "No exist.");
        res.redirect('/login');
    }
}

//로그인 및 성인 인증 여부 체크
function checkLoginAndAdultToken(req, res, next) {
    let country = dbconfig.country;
    let passphrase = dbconfig.cryptoJS.passphrase;
    let value = req.cookies.loginToken;

    req.session.userTag = "";
    req.session.userId = "";
    req.session.userName = "";
    req.session.coinId = "";
    req.session.pointId = "";
    req.session.active = "";
    req.session.country = "";
    req.session.teenager = "";
    req.session.authPhone = "";
    req.session.bitberry_token = "";
    req.session.kyc = "";

    if(value) {
        let condition = {
            'loginToken': value
        }
        controllerUsers.detail(country, condition)
        .then(user => {
            if(user == null) {
                // logger.addLog(country, req.originalUrl, value, user);
                res.redirect('/login');
            } else {
                let search = {
                    '_id': user._doc.agreementId
                }
                controllerAgreements.detail(country, search)
                .then((agreement) => {
                    res.cookie("loginToken", value, {
                        domain: 'marketmach.com',
                        expires: new Date(Date.now() + (60 * 60 * 1000)), //1시간
                    });
            
                    res.cookie("loginToken", value, {
                        expires: new Date(Date.now() + (60 * 60 * 1000)), //1시간
                    });

                    req.session.userTag = user.userTag;
                    req.session.userId = user._id;
                    req.session.userName = user.userName;
                    req.session.coinId = user.coinId;
                    req.session.pointId = user.pointId;
                    req.session.active = user.active;
                    req.session.country = dbconfig.country;
                    req.session.teenager = agreement.teenager;
                    req.session.authPhone = agreement.authPhone;
                    req.session.bitberry_token = user.bitberry_token;
                    req.session.kyc = agreement._doc.kyc == undefined ? false : agreement._doc.kyc;

                    let resData = {
                        "userTag": user.userTag, 
                        "userId": user._id, 
                        "active": user.active,
                        "userInfo": user,
                        "agreement": agreement
                    }

                    if(!agreement.teenager && req.session.country=="KR") {
                        res.redirect('/main');
                    } else {
                        next();
                    }
                    //log 생성
                    // logger.addLog(country, req.originalUrl, JSON.stringify(condition), JSON.stringify(resData));

                    // bitwebResponse.code = 200;
                    // bitwebResponse.data = resData;                
                    // res.status(200).send(bitwebResponse.create())
                });
            }
        }).catch((err) => {        
            console.error('login token error =>', err);
            // logger.addLog(country, req.originalUrl, value, JSON.stringify(err));
            res.redirect('/login');
        })
    } else {
        console.error('login token error => No exist.');
        // logger.addLog(country, req.originalUrl, value, "No exist.");
        res.redirect('/login');
    }
}

//ajax 호출 시 로그인 여부 체크
function checkLoginTokenAjax(req, res, next) {
    let country = dbconfig.country;
    let passphrase = dbconfig.cryptoJS.passphrase;
    let value = req.cookies.loginToken;
    var bitwebResponse = new BitwebResponse();

    if(value) {
        let condition = {
            'loginToken': value
        }
        controllerUsers.detail(country, condition)
        .then(user => {
            if(user == null) {
                req.session.userTag = "";
                req.session.userId = "";
                req.session.userName = "";
                req.session.coinId = "";
                req.session.pointId = "";
                req.session.active = "";
                req.session.country = "";
                req.session.teenager = "";
                req.session.authPhone = "";
                req.session.bitberry_token = "";
                req.session.kyc = "";

                bitwebResponse.code = 200;
                bitwebResponse.data = {
                    "loginYn":"N"
                };                
                res.status(200).send(bitwebResponse.create())
            } else {
                let search = {
                    '_id': user._doc.agreementId
                }
                controllerAgreements.detail(country, search)
                .then((agreement) => {
                    resData = {
                        "loginYn":"Y",
                        "userTag": user.userTag, 
                        "userId": user._id, 
                        "active": user.active,
                        "userInfo": user,
                        "agreement": agreement
                    }

                    bitwebResponse.code = 200;
                    bitwebResponse.data = resData;                
                    res.status(200).send(bitwebResponse.create())
                });
            }
        }).catch((err) => {        
            console.error('login token error =>', err);
            req.session.userTag = "";
            req.session.userId = "";
            req.session.userName = "";
            req.session.coinId = "";
            req.session.pointId = "";
            req.session.active = "";
            req.session.country = "";
            req.session.teenager = "";
            req.session.authPhone = "";
            req.session.bitberry_token = "";
            req.session.kyc = "";
        
            bitwebResponse.code = 200;
            bitwebResponse.data = {
                "loginYn":"N"
            };                           
            res.status(200).send(bitwebResponse.create())
        })
    } else {
        console.error('login token error => No exist.');
        // logger.addLog(country, req.originalUrl, value, "No exist.");
        req.session.userTag = "";
        req.session.userId = "";
        req.session.userName = "";
        req.session.coinId = "";
        req.session.pointId = "";
        req.session.active = "";
        req.session.country = "";
        req.session.teenager = "";
        req.session.authPhone = "";
        req.session.bitberry_token = "";
        req.session.kyc = "";

        bitwebResponse.code = 200;
        bitwebResponse.data = {
            "loginYn":"N"
        };                                
        res.status(200).send(bitwebResponse.create())
    }
}

exports.checkLoginTokenNoSignIn = checkLoginTokenNoSignIn;
exports.makeLoginToken = makeLoginToken;
exports.checkLoginToken = checkLoginToken;
exports.checkLoginAndAdultToken = checkLoginAndAdultToken;
exports.checkLoginTokenAjax = checkLoginTokenAjax;