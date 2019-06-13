var Users = require('../libs/users');
var WithdrawUsers = require('../libs/withdrawUsers');
var BlackLists = require('../libs/blackLists');

function createUser (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        Users.findOneAndUpdate(
            {
                "email": data.email
            },
            {
                $set:data
            },
            {upsert: true, new: true},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('createUser done: ' + user._id)
                resolve(user)
            }
        )
    })
}

function getUserById (id) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {"_id": id},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }

                console.log('getUserById done: ' + user)
                resolve(user)
            }
        )
    })
}

function getRecommanderCount(userTag) {
    return new Promise((resolve, reject) => {
        Users.count(
            {"recommander": userTag},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }

                console.log('getRecommanderCount done: ' + user)
                resolve(user)
            }
        )
    })
}

function getUserByIds (userIds) {
    return new Promise((resolve, reject) => {
        Users.find(
            {"_id": {$in:userIds}},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }

                console.log('getUserById done: ' + user)
                resolve(user)
            }
        )
    })
}

function getUserByTag (userTag) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {"userTag": userTag},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                // console.log('getUserByTag done: ' + user)
                resolve(user)
            }
        )
    })
}

function getByUserTagAndLoginToken (userTag, loginToken) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {"userTag": userTag, "loginToken": loginToken},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                // console.log('getUserByTag done: ' + user)
                resolve(user)
            }
        )
    })
}

function getUserByTags (userTags) {
    return new Promise((resolve, reject) => {
        Users.find(
            {"userTag": {$in:userTags}},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                // console.log('getUserByTag done: ' + user)
                resolve(user)
            }
        )
    })
}


function getUserByIdAndPassword (data) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {
                "userTag"        : data.userTag,
                "password"  : data.password
            },
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getUserByIdAndPassword done: ' + user)
                resolve(user)
            }
        )
    })
}

function getUserByTagAndEmail (userTag, email) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {$or: [
            {"userTag":userTag},
            {"email": email},
            ]},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getUserByTagAndEmail done: ' + user)
                resolve(user)
            }
        )
    })
}

function getUserByTagAndEmail1 (userTag, email) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {$and: [
                    {"userTag":userTag},
                    {"email": email},
                ]},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getUserByTagAndEmail done: ' + user)
                resolve(user)
            }
        )
    })
}

function getUserByEmail (email) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {"email": email},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                // console.log('getUserByEmail done: ' + user)
                resolve(user)
            }
        )
    })
}

function getByPhone(phone) {
    return new Promise((resolve, reject) => {
        Users.findOne(
            {"phone": phone},
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                // console.log('getByPhone done: ' + user)
                resolve(user)
            }
        )
    })
}

function updateUserById(userId, body) {
    return new Promise((resolve, reject) => {
        Users.findOneAndUpdate(
            {"_id": userId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateByUserTag(userTag, body) {
    return new Promise((resolve, reject) => {
        Users.findOneAndUpdate(
            {"userTag": userTag
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function deleteUserById (id) {
    return new Promise((resolve, reject) => {
        Users.findByIdAndRemove(
            id,
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getUserById done: ' + user)
                resolve(user)
            }
        )
    })
}

function createWithdrawUser(data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var withdrawUsers = new WithdrawUsers(data)
        withdrawUsers.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createWithdrawUser done: ' + result)
                resolve(result)
            }
        })
    })
}

function getWithdrawByPhone (phone) {
    return new Promise((resolve, reject) => {
        WithdrawUsers.find(
            {
                "phone"        : phone
            },
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getWithdrawByPhone done: ' + user)
                resolve(user)
            }
        )
    })
}

function getWithdrawUser (condition) {
    return new Promise((resolve, reject) => {
        WithdrawUsers.find(condition)
        .exec(
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getWithdrawUser done: ' + user)
                resolve(user)
            }
        )
    })
}

function getBlackList (condition) {
    return new Promise((resolve, reject) => {
        BlackLists.find(condition)
        .exec(
            function(err, user) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getBlackList done: ' + user)
                resolve(user)
            }
        )
    })
}


exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getUserByIds = getUserByIds;
exports.getUserByTag = getUserByTag;
exports.getUserByTags = getUserByTags;
exports.getUserByTagAndEmail = getUserByTagAndEmail;
exports.getUserByIdAndPassword = getUserByIdAndPassword;
exports.getUserByEmail = getUserByEmail;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
exports.getByUserTagAndLoginToken = getByUserTagAndLoginToken;
exports.getUserByTagAndEmail1 = getUserByTagAndEmail1;
exports.createWithdrawUser = createWithdrawUser;
exports.updateByUserTag = updateByUserTag;
exports.getByPhone = getByPhone;
exports.getWithdrawByPhone = getWithdrawByPhone;
exports.getRecommanderCount = getRecommanderCount;
exports.getWithdrawUser = getWithdrawUser;
exports.getBlackList = getBlackList;