var express = require('express');
var router = express.Router();
let db = require('../utils/db');
var machUsers = require('../services/users');
var machEthers = require('../services/ethers');
var datetime = require('node-datetime');
var sessionChecker=require('../utils/session');
const dbconfig = require('../config/dbconfig');
var token = require('../utils/token');

router.get('/list', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mypage', {
            title: 'Bitweb MyPage',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[0,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mypage', {
            title: 'Bitweb MyPage',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[0,0],
            country:req.session.country
        });     
    } else {
        res.render('v2_en/myPage/mypage', {
            title: 'Bitweb MyPage',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userName: req.session.userName,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[0,0],
            country:req.session.country
        });
    }
});

router.get('/buy/list', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mybuylist', {
            title: 'Bitweb MyPage',
            pageIdx: req.query.pageIdx,
            category: req.query.category,
            status: req.query.status,
            item_title: req.query.item_title,
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mybuylist', {
            title: 'Bitweb MyPage',
            pageIdx: req.query.pageIdx,
            category: req.query.category,
            status: req.query.status,
            item_title: req.query.item_title,
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });      
    } else {
        res.render('v2_en/myPage/mybuylist', {
            title: 'Bitweb MyPage',
            pageIdx: req.query.pageIdx,
            category: req.query.category,
            status: req.query.status,
            item_title: req.query.item_title,
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[2,0],
            country:req.session.country
        });
    }
});

router.get('/sell/list', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/myselllist', {
            title: 'Bitweb MyPage',
            pageIdx: req.query.pageIdx,
            category: req.query.category,
            status: req.query.status,
            item_title: req.query.item_title,
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/myselllist', {
            title: 'Bitweb MyPage',
            pageIdx: req.query.pageIdx,
            category: req.query.category,
            status: req.query.status,
            item_title: req.query.item_title,
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0],
            country:req.session.country
        });     
    } else {
        res.render('v2_en/myPage/myselllist', {
            title: 'Bitweb MyPage',
            pageIdx: req.query.pageIdx,
            category: req.query.category,
            status: req.query.status,
            item_title: req.query.item_title,
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            authPhone: req.session.authPhone,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[1,0],
            country:req.session.country
        });
    }
});

router.get('/cancel/list', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mycancellist', {
            title: 'Bitweb MyPage',
            pageIdx: req.query.pageIdx,
            category: req.query.category,
            item_title: req.query.item_title,
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[3,0],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mycancellist', {
            title: 'Bitweb MyPage',
            pageIdx: req.query.pageIdx,
            category: req.query.category,
            item_title: req.query.item_title,
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[3,0]
        });     
    } else {
        res.render('v2_en/myPage/mycancellist', {
            title: 'Bitweb MyPage',
            pageIdx: req.query.pageIdx,
            category: req.query.category,
            item_title: req.query.item_title,
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[3,0],
            country:req.session.country
        });
    }
});

router.get('/wallet/info', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/walletinfo', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            bitberry_token: req.session.bitberry_token,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/walletinfo', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            bitberry_token: req.session.bitberry_token,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,1],
            country:req.session.country
        });     
    } else {
        res.render('v2_en/myPage/walletinfo', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            bitberry_token: req.session.bitberry_token,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,1],
            country:req.session.country
        });
    }
});

router.get('/wallet/connect', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/walletconnect', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,4],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/walletconnect', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,4],
            country:req.session.country
        });       
    } else {
        res.render('v2_en/myPage/walletconnect', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[4,4],
            country:req.session.country
        });
    }
});

router.get('/wallet/deposit', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        // if(req.session.bitberry_token == "") {
        //     res.render('v2/myPage/walletconnect', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         arrDepth:[4,4],
        //         country:req.session.country
        //     });
        // } else {
        //     res.render('v2/myPage/walletdeposit', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         btc_fee: dbconfig.fee.coin.btc.deposit,
        //         ether_fee: dbconfig.fee.coin.ether.deposit,
        //         mach_fee: dbconfig.fee.coin.mach.deposit,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         arrDepth:[4,2],
        //         country:req.session.country
        //     });
        // }
        res.render('v2/myPage/walletdeposit', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            btc_fee: dbconfig.fee.coin.btc.deposit,
            ether_fee: dbconfig.fee.coin.ether.deposit,
            mach_fee: dbconfig.fee.coin.mach.deposit,
            ont_fee: dbconfig.fee.coin.ont.deposit,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            token:dbconfig.APIToken,
            toAddress:dbconfig.ontology.address,
            arrDepth:[4,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        // if(req.session.bitberry_token == "") {
        //     res.render('v2_point/myPage/walletconnect', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         arrDepth:[4,4],
        //         country:req.session.country
        //     });
        // } else {
        //     res.render('v2_point/myPage/walletdeposit', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         btc_fee: dbconfig.fee.coin.btc.deposit,
        //         ether_fee: dbconfig.fee.coin.ether.deposit,
        //         mach_fee: dbconfig.fee.coin.mach.deposit,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         arrDepth:[4,2],
        //         country:req.session.country
        //     });
        // }  
        res.render('v2_point/myPage/walletdeposit', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            btc_fee: dbconfig.fee.coin.btc.deposit,
            ether_fee: dbconfig.fee.coin.ether.deposit,
            mach_fee: dbconfig.fee.coin.mach.deposit,
            ont_fee: dbconfig.fee.coin.ont.deposit,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            token:dbconfig.APIToken,
            toAddress:dbconfig.ontology.address,
            arrDepth:[4,2],
            country:req.session.country
        });      
    } else {
        // if(req.session.bitberry_token == "") {
        //     res.render('v2_en/myPage/walletconnect', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         arrDepth:[4,4],
        //         country:req.session.country
        //     });
        // } else {
        //     res.render('v2_en/myPage/walletdeposit', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         btc_fee: dbconfig.fee.coin.btc.deposit,
        //         ether_fee: dbconfig.fee.coin.ether.deposit,
        //         mach_fee: dbconfig.fee.coin.mach.deposit,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         arrDepth:[4,2],
        //         country:req.session.country
        //     });
        // }
        res.render('v2_en/myPage/walletdeposit', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            btc_fee: dbconfig.fee.coin.btc.deposit,
            ether_fee: dbconfig.fee.coin.ether.deposit,
            mach_fee: dbconfig.fee.coin.mach.deposit,
            ont_fee: dbconfig.fee.coin.ont.deposit,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            token:dbconfig.APIToken,
            toAddress:dbconfig.ontology.address,
            arrDepth:[4,2],
            country:req.session.country
        });
    }
    
});

router.get('/wallet/withdraw', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        // if(req.session.bitberry_token == "") {
        //     res.render('v2/myPage/walletconnect', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         kyc: req.session.kyc,
        //         arrDepth:[4,4],
        //         country:req.session.country
        //     });
        // } else {
        //     res.render('v2/myPage/walletwithdraw', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         btc_fee: dbconfig.fee.coin.btc.withdraw,
        //         ether_fee: dbconfig.fee.coin.ether.withdraw,
        //         mach_fee: dbconfig.fee.coin.mach.withdraw,
        //         ont_fee: dbconfig.fee.coin.ont.withdraw,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         kyc: req.session.kyc,
        //         token:dbconfig.APIToken,
        //         arrDepth:[4,3],
        //         country:req.session.country
        //     });
        // }
        res.render('v2/myPage/walletwithdraw', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            btc_fee: dbconfig.fee.coin.btc.withdraw,
            ether_fee: dbconfig.fee.coin.ether.withdraw,
            mach_fee: dbconfig.fee.coin.mach.withdraw,
            ont_fee: dbconfig.fee.coin.ont.withdraw,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            kyc: req.session.kyc,
            token:dbconfig.APIToken,
            arrDepth:[4,3],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        // if(req.session.bitberry_token == "") {
        //     res.render('v2_point/myPage/walletconnect', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         kyc: req.session.kyc,
        //         token:dbconfig.APIToken,
        //         arrDepth:[4,4],
        //         country:req.session.country
        //     });
        // } else {
        //     res.render('v2_point/myPage/walletwithdraw', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         btc_fee: dbconfig.fee.coin.btc.withdraw,
        //         ether_fee: dbconfig.fee.coin.ether.withdraw,
        //         mach_fee: dbconfig.fee.coin.mach.withdraw,
        //         ont_fee: dbconfig.fee.coin.ont.withdraw,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         kyc: req.session.kyc,
        //         token:dbconfig.APIToken,
        //         arrDepth:[4,3],
        //         country:req.session.country
        //     });
        // }       
        res.render('v2_point/myPage/walletwithdraw', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            btc_fee: dbconfig.fee.coin.btc.withdraw,
            ether_fee: dbconfig.fee.coin.ether.withdraw,
            mach_fee: dbconfig.fee.coin.mach.withdraw,
            ont_fee: dbconfig.fee.coin.ont.withdraw,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            kyc: req.session.kyc,
            token:dbconfig.APIToken,
            arrDepth:[4,3],
            country:req.session.country
        });
    } else {
        // if(req.session.bitberry_token == "") {
        //     res.render('v2_en/myPage/walletconnect', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         kyc: req.session.kyc,
        //         arrDepth:[4,4],
        //         country:req.session.country
        //     });
        // } else {
        //     res.render('v2_en/myPage/walletwithdraw', {
        //         title: 'Bitweb Wallet Info',
        //         userId: req.session.userId,userTag:req.session.userTag,
        //         coinId: req.session.coinId,
        //         pointId: req.session.pointId,
        //         authPhone: req.session.authPhone,
        //         bitberry_token: req.session.bitberry_token,
        //         btc_fee: dbconfig.fee.coin.btc.withdraw,
        //         ether_fee: dbconfig.fee.coin.ether.withdraw,
        //         mach_fee: dbconfig.fee.coin.mach.withdraw,
        //         ont_fee: dbconfig.fee.coin.ont.withdraw,
        //         usePoint:dbconfig.usePoint,
        //         useBlockchain:dbconfig.useBlockchain,
        //         kyc: req.session.kyc,
        //         arrDepth:[4,3],
        //         country:req.session.country
        //     });
        // }
        res.render('v2_en/myPage/walletwithdraw', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            bitberry_token: req.session.bitberry_token,
            btc_fee: dbconfig.fee.coin.btc.withdraw,
            ether_fee: dbconfig.fee.coin.ether.withdraw,
            mach_fee: dbconfig.fee.coin.mach.withdraw,
            ont_fee: dbconfig.fee.coin.ont.withdraw,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            kyc: req.session.kyc,
            arrDepth:[4,3],
            country:req.session.country
        });
    }
});

router.get('/point/info', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/point/info', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/point/info', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,1],
            country:req.session.country
        });      
    } else {
        res.render('v2_en/myPage/point/info', {
            title: 'Bitweb Wallet Info',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,1],
            country:req.session.country
        });
    }
});

router.get('/point/deposit', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/point/deposit', {
            title: 'Bitweb Wallet Deposit',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            fee: dbconfig.fee.point.deposit,
            happyMoneyFee: dbconfig.fee.happymoney.deposit,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        }); 
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/point/deposit', {
            title: 'Bitweb Wallet Deposit',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            fee: dbconfig.fee.point.deposit,
            happyMoneyFee: dbconfig.fee.happymoney.deposit,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        });    
    } else {
        res.render('v2_en/myPage/point/deposit', {
            title: 'Bitweb Wallet Deposit',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            fee: dbconfig.fee.point.deposit,
            happyMoneyFee: dbconfig.fee.happymoney.deposit,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,2],
            country:req.session.country
        }); 
    }
});

router.get('/point/withdraw', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/point/withdraw', {
            title: 'Bitweb Point Withdraw',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            fee: dbconfig.fee.point.withdraw,
            happyMoneyFee: dbconfig.fee.happymoney.deposit,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,3],
            country:req.session.country
        }); 
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/point/withdraw', {
            title: 'Bitweb Point Withdraw',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            fee: dbconfig.fee.point.withdraw,
            happyMoneyFee: dbconfig.fee.happymoney.deposit,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,3],
            country:req.session.country
        });         
    } else {
        res.render('v2_en/myPage/point/withdraw', {
            title: 'Bitweb Point Withdraw',
            userId: req.session.userId,userTag:req.session.userTag,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            fee: dbconfig.fee.point.withdraw,
            happyMoneyFee: dbconfig.fee.happymoney.deposit,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[5,3],
            country:req.session.country
        }); 
    }
});


// router.get('/point/exchange/deposit', sessionChecker.sessionChecker2, function (req, res, next) {
//     if(dbconfig.country == "KR") {
//         res.render('v2/myPage/point/exchange_deposit', {
//             title: 'Bitweb Point Exchange',
//             userId: req.session.userId,userTag:req.session.userTag,
//             coinId: req.session.coinId,
//             pointId: req.session.pointId,
//             fee: dbconfig.fee.exchange.point.deposit,
//             authPhone: req.session.authPhone,
//             usePoint:dbconfig.usePoint,
//             useBlockchain:dbconfig.useBlockchain,
//             arrDepth:[5,4]
//         }); 
//     } else if(dbconfig.country == "POINT") {
//         res.render('v2_point/myPage/point/exchange_deposit', {
//             title: 'Bitweb Point Exchange',
//             userId: req.session.userId,userTag:req.session.userTag,
//             coinId: req.session.coinId,
//             pointId: req.session.pointId,
//             fee: dbconfig.fee.exchange.point.deposit,
//             authPhone: req.session.authPhone,
//             usePoint:dbconfig.usePoint,
//             useBlockchain:dbconfig.useBlockchain,
//             arrDepth:[5,4]
//         });         
//     } else {
//         res.render('v2_en/myPage/point/exchange_deposit', {
//             title: 'Bitweb Point Exchange',
//             userId: req.session.userId,userTag:req.session.userTag,
//             coinId: req.session.coinId,
//             pointId: req.session.pointId,
//             fee: dbconfig.fee.exchange.point.deposit,
//             authPhone: req.session.authPhone,
//             usePoint:dbconfig.usePoint,
//             useBlockchain:dbconfig.useBlockchain,
//             arrDepth:[5,4]
//         }); 
//     }
// });

// router.get('/point/exchange/withdraw', sessionChecker.sessionChecker2, function (req, res, next) {
//     if(dbconfig.country == "KR") {
//         res.render('v2/myPage/point/exchange_withdraw', {
//             title: 'Bitweb Point Exchange',
//             userId: req.session.userId,userTag:req.session.userTag,
//             coinId: req.session.coinId,
//             pointId: req.session.pointId,
//             fee: dbconfig.fee.exchange.point.deposit,
//             authPhone: req.session.authPhone,
//             usePoint:dbconfig.usePoint,
//             useBlockchain:dbconfig.useBlockchain,
//             arrDepth:[5,5]
//         }); 
//     } else if(dbconfig.country == "POINT") {
//         res.render('v2_point/myPage/point/exchange_withdraw', {
//             title: 'Bitweb Point Exchange',
//             userId: req.session.userId,userTag:req.session.userTag,
//             coinId: req.session.coinId,
//             pointId: req.session.pointId,
//             fee: dbconfig.fee.exchange.point.deposit,
//             authPhone: req.session.authPhone,
//             usePoint:dbconfig.usePoint,
//             useBlockchain:dbconfig.useBlockchain,
//             arrDepth:[5,5]
//         });      
//     } else {
//         res.render('v2_en/myPage/point/exchange_withdraw', {
//             title: 'Bitweb Point Exchange',
//             userId: req.session.userId,userTag:req.session.userTag,
//             coinId: req.session.coinId,
//             pointId: req.session.pointId,
//             fee: dbconfig.fee.exchange.point.deposit,
//             authPhone: req.session.authPhone,
//             usePoint:dbconfig.usePoint,
//             useBlockchain:dbconfig.useBlockchain,
//             arrDepth:[5,5]
//         }); 
//     }
// });

router.get('/user/checkPassword', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mycheckPassword', {
            title: 'Bitweb user info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mycheckPassword', {
            title: 'Bitweb user info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,1],
            country:req.session.country
        });      
    } else {
        res.render('v2_en/myPage/mycheckPassword', {
            title: 'Bitweb user info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,1],
            country:req.session.country
        });
    }
});

router.get('/user/info', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/myinfo', {
            title: 'Bitweb user info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            token:dbconfig.APIToken,
            arrDepth:[6,1],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/myinfo', {
            title: 'Bitweb user info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            token:dbconfig.APIToken,
            arrDepth:[6,1],
            country:req.session.country
        });        
    } else {
        res.render('v2_en/myPage/myinfo', {
            title: 'Bitweb user info',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            authPhone: req.session.authPhone,
            userTag: req.session.userTag,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            token:dbconfig.APIToken,
            arrDepth:[6,1],
            country:req.session.country
        });
    }
});

router.get('/user/voucher', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/myvoucher', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,2],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/myvoucher', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,2],
            country:req.session.country
        });     
    } else {
        res.render('v2_en/myPage/myvoucher', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,2],
            country:req.session.country
        });
    }
});

router.get('/user/authPhone',token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/auth_phone', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,3],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/auth_phone', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,3],
            country:req.session.country
        });     
    } else {
        res.render('v2_en/myPage/checkKyc', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,3],
            country:req.session.country
        });
    }
});

router.get('/user/kyc',token.checkLoginToken, function (req, res, next) {
    res.render('v2_en/myPage/auth_phone', {
        title: 'Bitweb user grade',
        userId: req.session.userId,
        coinId: req.session.coinId,
        pointId: req.session.pointId,
        userTag: req.session.userTag,
        authPhone: req.session.authPhone,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        arrDepth:[6,3],
        country:req.session.country
    });
});

router.get('/user/grade', token.checkLoginToken, function (req, res, next) {
    if(dbconfig.country == "KR") {
        res.render('v2/myPage/mygrade', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,4],
            country:req.session.country
        });
    } else if(dbconfig.country == "POINT") {
        res.render('v2_point/myPage/mygrade', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,4],
            country:req.session.country
        });       
    } else {
        res.render('v2_en/myPage/mygrade', {
            title: 'Bitweb user grade',
            userId: req.session.userId,
            coinId: req.session.coinId,
            pointId: req.session.pointId,
            userTag: req.session.userTag,
            authPhone: req.session.authPhone,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            arrDepth:[6,4],
            country:req.session.country
        });
    }
});

module.exports = router;
