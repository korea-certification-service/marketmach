var Community = require('../libs/communities');
var Reply = require('../libs/replies');

function count (data, option) {
    return new Promise((resolve, reject) => {
        Community.count(
            data
        )
            .limit(100)
            .skip(option.pageIdx * option.perPage)
            .sort({regDate:'desc'})
            .exec(function (err, list) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('count done: ' + list)
                resolve(list)
            })
    })
}

function search (data, option) {
    return new Promise((resolve, reject) => {
        Community.find(
            data
        )
        .limit(option.perPage)
        .skip(option.pageIdx * option.perPage)
        .sort({regDate:'desc'})
        .exec(function (err, list) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            console.log('search done: ' + list)
            resolve(list)
        })
    })
}


function searchMain (data, option) {
    return new Promise((resolve, reject) => {
        Community.find(
            data
        )
        .limit(option.perPage)
        .skip(option.pageIdx * option.perPage)
        .sort({recommandCount:'desc', regDate:'desc'})
        .exec(function (err, list) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            console.log('search done: ' + list)
            resolve(list)
        })
    })
}

function getById (id) {
    return new Promise((resolve, reject) => {
        Community.findOne(
            {"_id": id},
            function(err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getById done: ' + data)
                resolve(data)
            }
        )
    })
}

function update(communityId, body) {
    return new Promise((resolve, reject) => {
        Community.findOneAndUpdate(
            {"_id": communityId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('update done:' + data);
                resolve(data)
            })
    })
}

function getReplies (communityId) {
    return new Promise((resolve, reject) => {
        Reply.find(
            {"communityId": communityId}
        )
            .sort({regDate:'desc'})
            .exec(function (err, list) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getReplies done: ' + list)
                resolve(list)
            })
    })
}

function getReplyById(replyId) {
    return new Promise((resolve, reject) => {
        Reply.findOne(
            {"_id": replyId}
        )
            .sort({regDate:'desc'})
            .exec(function (err, reply) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getReplyById done: ' + reply)
                resolve(reply)
            })
    })
}

function addReply (body) {
    return new Promise((resolve, reject) => {
        console.log(body)
        var reply = new Reply(body)
        reply.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('addReply done: ' + result)
                resolve(result)
            }
        })
    })
}

function updateReply(replyId, body) {
    return new Promise((resolve, reject) => {
        Reply.findOneAndUpdate(
            {"_id": replyId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('updateReply done:' + data);
                resolve(data)
            })
    })
}

function deleteReply(replyId) {
    return new Promise((resolve, reject) => {
        Reply.findByIdAndRemove(
            replyId,
            function(err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('deleteReply done: ' + user)
                resolve(user)
            }
        )
    })
}

function searchReply(data) {
    return new Promise((resolve, reject) => {
        Reply.find(
            data
        )
        .sort({regDate:'desc'})
        .exec(function (err, list) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            resolve(list)
        })
    })
}

exports.search = search;
exports.searchMain = searchMain;
exports.getById = getById;
exports.update = update;
exports.count = count;
exports.getReplies = getReplies;
exports.getReplyById = getReplyById;
exports.addReply = addReply;
exports.updateReply = updateReply;
exports.deleteReply = deleteReply;
exports.searchReply = searchReply;
