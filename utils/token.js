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

//로그인 토큰 생성
function makeLoginToken(value) {
    let passphrase = dbconfig.cryptoJS.passphrase;
    let encryptValue = CryptoJS.AES.encrypt(value, passphrase);
    return encryptValue.toString();
}

//로그인 토큰 체크
function checkLoginToken(req, res, next) {
    let country = dbconfig.country;
    let passphrase = dbconfig.cryptoJS.passphrase;
    let value = req.headers.logintoken;
    let bitwebResponse = new BitwebResponse();

    if(value) {
        let decryptValue = CryptoJS.AES.decrypt(value, passphrase);
        let loginToken = decryptValue.toString(CryptoJS.enc.Utf8);
        let condition = {
            'country': country,
            'loginToken': loginToken
        }
        controllerUsers.detail(country, condition)
        .then(user => {
            if(user == null) {
                logger.addLog(country, req.originalUrl, value, user);
                let resErr = "Token 처리 중 문제 발생.";
                bitwebResponse.code = 500;
                bitwebResponse.message = resErr;
                res.status(500).send(bitwebResponse.create())
            } else {
                let search = {
                    '_id': user._doc.agreementId
                }
                controllerAgreements.detail(country, search)
                .then((agreement) => {
                    // res.cookie("login_token", value, {
                    //     expires: new Date(Date.now() + (60 * 60 * 1000)), //1시간
                    // });

                    let resData = {
                        "userTag": user.userTag, 
                        "userId": user._id, 
                        "active": user.active,
                        "userInfo": user,
                        "agreement": agreement
                    }
                    //log 생성
                    // logger.addLog(country, req.originalUrl, JSON.stringify(condition), JSON.stringify(resData));

                    // bitwebResponse.code = 200;
                    // bitwebResponse.data = resData;                
                    // res.status(200).send(bitwebResponse.create())
                    next();
                });
            }
        }).catch((err) => {        
            console.error('login token error =>', err);
            // logger.addLog(country, req.originalUrl, value, JSON.stringify(err));
            let resErr = "Token 처리 중 문제 발생.";
            bitwebResponse.code = 500;
            bitwebResponse.message = resErr;
            res.status(500).send(bitwebResponse.create())
        })
    } else {
        console.error('login token error => No exist.');
        // logger.addLog(country, req.originalUrl, value, "No exist.");
        let resErr = "Token 처리 중 문제 발생.";
        bitwebResponse.code = 500;
        bitwebResponse.message = resErr;
        res.status(500).send(bitwebResponse.create())
    }
}

exports.makeLoginToken = makeLoginToken;
exports.checkLoginToken = checkLoginToken;