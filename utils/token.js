/**
 * Token 생성 모듈
 * - Login Token 
 * 작성자 : Chef Kim
 * 작성일 : 2019-07-11
 */
let CryptoJS = require("crypto-js");
let dbconfig = require('../config/dbconfig');

//로그인 토큰 생성
function makeLoginToken(value) {
    let passphrase = dbconfig.cryptoJS.passphrase;
    let encryptValue = CryptoJS.AES.encrypt(value, passphrase);
    return encryptValue.toString();
}

exports.makeLoginToken = makeLoginToken;