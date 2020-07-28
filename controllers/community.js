var db = require('../utils/db');
var bitwebCommunity = require('../services/community');
var dbconfig = require('../config/dbconfig');
var util = require('../utils/util')

function count(req) {
    return new Promise((resolve, reject) => {
        let country = dbconfig.country;
        let type = req.query.type == undefined ? "" : req.query.type;
        let data = {'type': { $regex: type, $options: 'i' }};
        let option = {
            "perPage": req.query.perPage == undefined ? 50 : parseInt(req.query.perPage),
            "pageIdx": req.query.pageIdx == undefined ? 0 : parseInt(req.query.pageIdx)
        };
        if(req.query.title != undefined) {
            if(type == "movie") {
                data = {
                    'type': { $regex: type, $options: 'i' },
                    'title' : { $regex: req.query.title, $options: 'i' }
                }
            } else {
                data = {
                    'type': { $regex: type, $options: 'i' },
                    $or: [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }} ]
                }
            }
        };

        if(country == "KR") {
            data['country'] = {$exists: false};
        } else {
            data['country'] = country;
        }

        db.connectDB(country)
            .then(() => bitwebCommunity.count(data, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function list(req) {
    return new Promise((resolve, reject) => {
        let country = dbconfig.country;
        let type = req.query.type == undefined ? "" : req.query.type;
        let data = {'type': { $regex: type, $options: 'i' }};
        let option = {
            "perPage": req.query.perPage == undefined ? 50 : parseInt(req.query.perPage),
            "pageIdx": req.query.pageIdx == undefined ? 0 : parseInt(req.query.pageIdx)
        };
        if(req.query.title != undefined) {
            if(type == "movie") {
                data = {
                    'type': { $regex: type, $options: 'i' },
                    'title' : { $regex: req.query.title, $options: 'i' }
                }
            } else {
                data = {
                    'type': { $regex: type, $options: 'i' },
                    $or: [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }} ]
                }
            }
        };

        if(country == "KR") {
            data['country'] = {$exists: false};
        } else {
            data['country'] = country;
        }

        db.connectDB(country)
            .then(() => bitwebCommunity.search(data, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function listMain(country) {
    return new Promise((resolve, reject) => {
        let country = dbconfig.country;
        let data = {};
        let option = {
            "perPage": 4,
            "pageIdx": 0
        };

        if(country == "KR") {
            data['country'] = {$exists: false};
        } else {
            data['country'] = country;
        }

        db.connectDB(country)
            .then(() => bitwebCommunity.searchMain(data, option))
            .then((communitys) => {
                let communityIds = [];
                for(var i in communitys) {
                    communityIds.push(communitys[i]._id);
                }
                bitwebCommunity.searchReply({"communityId":communityIds})
                .then((replys) => {
                    for(var i in communitys) {
                        communitys[i]['replyCount'] = 0;
                        for(var j in replys) {
                            if(communitys[i]._id.toString() == replys[j].communityId) {
                                communitys[i]['replyCount']++;
                            }
                        }
                    }
                    resolve(communitys)
                }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
            reject(err)
        })
    })
}

function get(req) {
    return new Promise((resolve, reject) => {

        var communityId = req.params.communityId;
        let country = dbconfig.country;

        db.connectDB(country)
            .then(() => bitwebCommunity.getById(communityId))
            .then((community) => {
                bitwebCommunity.getReplies(communityId)
                .then((replies) => {
                    community._doc['replyCount'] = replies.length;
                    community._doc['reply'] = replies;
                    console.log('result=>', community);
                    resolve(community)
                }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
            reject(err)
        })
    })
}

function addReply(req) {
    return new Promise((resolve, reject) => {

        let country = dbconfig.country;
        let body = req.body;
        body['regDate'] = util.formatDate(new Date().toString())

        db.connectDB(country)
            .then(() => bitwebCommunity.addReply(body))
            .then((community) => {
                console.log('result=>', community);
                resolve(community)
            }).catch((err) => {
            reject(err)
        })
    })
}

function modifyReply(req) {
    return new Promise((resolve, reject) => {

        let replyId = req.params.replyId;
        let country = dbconfig.country;
        let body = req.body;

        db.connectDB(country)
            .then(() => bitwebCommunity.updateReply(replyId, body))
            .then((community) => {
                console.log('result=>', community);
                resolve(community)
            }).catch((err) => {
            reject(err)
        })
    })
}

function deleteReply(req) {
    return new Promise((resolve, reject) => {

        let replyId = req.params.replyId;
        let country = dbconfig.country;

        db.connectDB(country)
            .then(() => bitwebCommunity.deleteReply(replyId))
            .then((community) => {
                console.log('result=>', community);
                resolve(community)
            }).catch((err) => {
            reject(err)
        })
    })
}

function modifyRecommandCount(req) {
    return new Promise((resolve, reject) => {

        let communityId = req.params.communityId;
        let country = dbconfig.country;
        let body = {};

        db.connectDB(country)
            .then(() => {
                bitwebCommunity.getById(communityId)
                    .then((beforeCommunity) => {
                        if(req.params.recommandYn == "Y") {
                            body = {"recommandCount": (beforeCommunity._doc.recommandCount + 1)};
                        } else {
                            body = {"nottobeCount": (beforeCommunity._doc.nottobeCount + 1)};
                        }

                        bitwebCommunity.update(communityId, body)
                            .then((afterCommunity) => {
                                console.log('result=>', afterCommunity);
                                resolve(afterCommunity)
                            }).catch((err) => {
                            reject(err)
                        })
                    }).catch((err) => {
                    reject(err)
                })
            })
    })
}

function modifyReplyCommandCount(req) {
    return new Promise((resolve, reject) => {

        let replyId = req.params.replyId;
        let country = dbconfig.country;
        let body = {};

        db.connectDB(country)
            .then(() => {
                bitwebCommunity.getReplyById(replyId)
                    .then((beforeReply) => {
                        if(req.params.recommandYn == "Y") {
                            body = {"recommandCount": (beforeReply._doc.recommandCount + 1)};
                        } else {
                            body = {"nottobeCount": (beforeReply._doc.nottobeCount + 1)};
                        }

                        bitwebCommunity.updateReply(replyId, body)
                            .then((afterReply) => {
                                console.log('result=>', afterReply);
                                resolve(afterReply)
                            }).catch((err) => {
                                reject(err)
                            })
                    }).catch((err) => {
                    reject(err)
                })
            })
    })
}

exports.list = list;
exports.listMain = listMain;
exports.get = get;
exports.count = count;
exports.addReply = addReply;
exports.modifyReply = modifyReply;
exports.deleteReply = deleteReply;
exports.modifyRecommandCount = modifyRecommandCount;
exports.modifyReplyCommandCount = modifyReplyCommandCount;