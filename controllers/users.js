
var db = require('../utils/db');
var bitwebUsers = require('../services/users');
var crypto = require('crypto');
var util = require('../utils/util');
const dbconfig = require('../config/dbconfig');

function count(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUsers.count(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function list(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUsers.list(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function detail(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUsers.detail(condition))
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var userId = req.params.userId;

        db.connectDB(country)
            .then(() => bitwebUsers.getUserById(userId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
                reject(err)
        })
    })
}

function getById(country, userId) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getUserById(userId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByIds(country, userIds) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getUserByIds(userIds))
            .then((result) => {
                //console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getRecommanderCount(country, userTag) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getRecommanderCount(userTag))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByUserTag(country, userTag) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getUserByTag(userTag))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}


function getByUserInfo(country, condition) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getByUserInfo(condition))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByUserTagAndLoginToken(country, userTag, loginToken) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getByUserTagAndLoginToken(userTag,loginToken))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}


function getByUserTags(country, userTags) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getUserByTags(userTags))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByUserEmail(country, email) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getUserByEmail(email))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByUserTagAndEmail(country, userTag, email, phone) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getUserByTagAndEmail(userTag, email, phone))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getByUserTagAndEmail1(country, userTag, email) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getUserByTagAndEmail1(userTag, email))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}


function getUser(country, data) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getUserByIdAndPassword(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getByPhone(country, phone) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getByPhone(phone))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function create(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var data = req.body;

        db.connectDB(country)
            .then(() => bitwebUsers.createUser(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createWithIds(req, coinId, agreementId, pointId) {
    return new Promise((resolve , reject) => {

        let country = req.body.country;
        var data = req.body;
        delete data['coins'];
        delete data['agreements'];
        delete data['points'];

        if(req.body.password != undefined) var password = crypto.createHash('sha256').update(req.body.password).digest('base64');
        data['password'] = password;
        data['coinId'] = coinId;
        data['agreementId'] = agreementId;
        data['pointId'] = pointId;
        data['active'] = true;
        data['birth'] = req.body.birth;
        data['sex'] = req.body.sex;
        data['commId'] = req.body.commId;
        data['foreigner'] = req.body.foreigner;
        data['ontId'] = req.body.ontId;
        if(req.body.countryCode != undefined) data['countryCode'] = req.body.countryCode;
        if(req.body.phone != undefined) data['phone'] = req.body.phone;
        data['regDate'] = util.formatDate(new Date().toString())

        console.log('createWithIds data=>', data);

        db.connectDB(country)
            .then(() => bitwebUsers.createUser(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function createWithIds2(user, country, coinId, agreementId, pointId) {
    return new Promise((resolve , reject) => {

        let data = user._doc;

        data['country'] = country;
        data['coinId'] = coinId;
        data['agreementId'] = agreementId;
        data['pointId'] = pointId;

        console.log('createWithIds2 data=>', data);

        db.connectDB(country)
            .then(() => bitwebUsers.createUser(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function update(req) {
    return new Promise((resolve , reject) => {

        let country = dbconfig.country;
        var userId = req.params.userId;

        var data = {};
        data = req.body;

        delete data['coins'];
        delete data['agreements'];
        delete data['points'];

        if (data.password != undefined) {
            var password = crypto.createHash('sha256').update(data.password).digest('base64');
            data['password'] = password;
        }

        db.connectDB(country)
            .then(() => bitwebUsers.updateUserById(userId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updatePassword(country, userId, password) {
    return new Promise((resolve , reject) => {
        var data = {};

        if (password != undefined) {
            var enc_password = crypto.createHash('sha256').update(password).digest('base64');
            data['password'] = enc_password;
        }

        db.connectDB(country)
            .then(() => bitwebUsers.updateUserById(userId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateEmailAuth(country, userId, data) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.updateUserById(userId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateLoginToken(country, userId, data) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.updateUserById(userId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateByUserTag(country, userTag, data) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.updateByUserTag(userTag, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function remove(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var userId = req.params.userId;

        db.connectDB(country)
            .then(() => bitwebUsers.deleteUserById(userId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createWithdrawUser(country, data) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUsers.createWithdrawUser(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getWithdrawUser(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUsers.getWithdrawUser(condition))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getBlackList(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebUsers.getBlackList(condition))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getWithdrawByPhone(country, phone) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebUsers.getWithdrawByPhone(phone))
            .then((result) => {
                // console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.count = count;
exports.list = list;
exports.get = get;
exports.getById = getById;
exports.getByIds = getByIds;
exports.getByUserTag = getByUserTag;
exports.getByUserTags = getByUserTags;
exports.getByUserEmail = getByUserEmail;
exports.getByUserTagAndEmail = getByUserTagAndEmail;
exports.getUser = getUser;
exports.create = create;
exports.createWithIds = createWithIds;
exports.createWithIds2 = createWithIds2;
exports.update = update;
exports.updateEmailAuth = updateEmailAuth;
exports.remove = remove;
exports.updateLoginToken = updateLoginToken;
exports.getByUserTagAndLoginToken = getByUserTagAndLoginToken;
exports.updatePassword = updatePassword;
exports.getByUserTagAndEmail1 = getByUserTagAndEmail1;
exports.createWithdrawUser = createWithdrawUser;
exports.updateByUserTag = updateByUserTag;
exports.getByPhone = getByPhone;
exports.getWithdrawByPhone = getWithdrawByPhone;
exports.getRecommanderCount = getRecommanderCount;
exports.getWithdrawUser = getWithdrawUser;
exports.getBlackList = getBlackList;
exports.getByUserInfo = getByUserInfo;
exports.detail = detail;