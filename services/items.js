var Items = require('../libs/items');
let ReplyItems = require('../libs/replyItems');

function createItem(data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var items = new Items(data)
        items.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createItems done: ' + result)
                resolve(result)
            }
        })
    })
}

function getItemAll() {
    return new Promise((resolve, reject) => {
            Items.find({})
                .sort({regDate:'desc'})
                .exec(function (err, item) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    console.log('getItemAll done: ' + item)
                    resolve(item)
                })
        })
}

function getItemCount(data) {

    if (data['game_name'] == undefined) data['game_name'] = ""
    if (data['game_server'] == undefined) data['game_server'] = ""
    if (data['trade_type'] == undefined) data['trade_type'] = ""
    if (data['type'] == undefined) data['type'] = ""
    if (data['title'] == undefined) data['title'] = ""
    if (data['pageIdx'] == undefined) data['pageIdx'] = 0;
    if (data['perPage'] == undefined) data['perPage'] = 20;

    console.log('data=>', data)

    let arr_search = [
        {"game_name": { $regex: data.game_name, $options: 'i' }},
        {"game_server": { $regex: data.game_server, $options: 'i' }},
        {"trade_type": { $regex: data.trade_type, $options: 'i' }},
        {"type": { $regex: data.type, $options: 'i' }},
        {"category": { $regex: data.category, $options: 'i' }},
        {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
    ];

    if (data['primeService'] != undefined && data['primeService'] == "Y") arr_search[0]['primeService'] = data['primeService'];
    if (data['status'] != undefined) arr_search[0]['status'] = data['status'];

    if (data['userTag'] != undefined) {
        arr_search = [
            {"game_name": { $regex: data.game_name, $options: 'i' }},
            {"game_server": { $regex: data.game_server, $options: 'i' }},
            {"trade_type": { $regex: data.trade_type, $options: 'i' }},
            {"type": { $regex: data.type, $options: 'i' }},
            {"category": { $regex: data.category, $options: 'i' }},
            {"status": 0},
            {"userTag":{ $nin: [data.userTag] }},
            {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
        ];
    }

    return new Promise((resolve, reject) => {

        if (data['category'] == "game") {
            Items.count(
                {
                    $and: arr_search
                })
                .limit(100)
                .skip(data.pageIdx * data.perPage)
                .sort({regDate:'desc'})
                .exec(function (err, item) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    // console.log('getItemByRequired done: ' + item)
                    resolve(item)
                })
        } else if (data['category'] == "etc") {
            if (data['category1'] == undefined) data['category1'] = "";
            if (data['category2'] == undefined) data['category2'] = "";

            let etc_array_search = [
                {"trade_type": { $regex: data.trade_type, $options: 'i' }},
                {"category": { $regex: data.category, $options: 'i' }},
                {"category1": { $regex: data.category1, $options: 'i' }},
                //{"category2": { $regex: data.category2, $options: 'i' }},
                {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
            ]

            if (data['primeService'] != undefined && data['primeService'] == "Y") etc_array_search[0]['primeService'] = data['primeService']
            if (data['status'] != undefined) etc_array_search[0]['status'] = data['status'];
            if (data['delivery_type'] != undefined) etc_array_search[0]['delivery_type'] = data['delivery_type'];

            if (data['userTag'] != undefined) {
                etc_array_search = [
                    {"trade_type": { $regex: data.trade_type, $options: 'i' }},
                    {"category": { $regex: data.category, $options: 'i' }},
                    {"category1": { $regex: data.category1, $options: 'i' }},
                    //{"category2": { $regex: data.category2, $options: 'i' }},
                    {"item_tag": { $regex: data.title, $options: 'i' }},
                    {"status": 0},
                    {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
                ]
            }
            Items.count(
                {
                    $and: etc_array_search
                })
                .limit(100)
                .skip(data.pageIdx * data.perPage)
                .sort({regDate:'desc'})
                .exec(function (err, item) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    // console.log('getItemByRequired done: ' + item)
                    resolve(item)
                })
        } else if (data['category'] == "otc") {
            let otc_array_search = [
                {"category": { $regex: data.category, $options: 'i' }},
                {"trade_type": { $regex: data.trade_type, $options: 'i' }},
                {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
            ]

            if (data['primeService'] != undefined && data['primeService'] == "Y") otc_array_search[0]['primeService'] = data['primeService']
            if (data['status'] != undefined) otc_array_search[0]['status'] = data['status'];
            
            if (data['userTag'] != undefined) {
                otc_array_search = [
                    {"category": { $regex: data.category, $options: 'i' }},
                    {"trade_type": { $regex: data.trade_type, $options: 'i' }},
                    {"status": 0},
                    {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
                ]
            }
            Items.count(
                {
                    $and: otc_array_search
                })
                .limit(100)
                .skip(data.pageIdx * data.perPage)
                .sort({regDate:'desc'})
                .exec(function (err, item) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    // console.log('getItemByRequired done: ' + item)
                    resolve(item)
                })
        }

    })
}

function getItemByRequired(data) {

    if (data['game_name'] == undefined) data['game_name'] = ""
    if (data['game_server'] == undefined) data['game_server'] = ""
    if (data['trade_type'] == undefined) data['trade_type'] = ""
    if (data['type'] == undefined) data['type'] = ""
    if (data['title'] == undefined) data['title'] = ""
    if (data['pageIdx'] == undefined) data['pageIdx'] = 0;
    if (data['perPage'] == undefined) data['perPage'] = 20;

    console.log('data=>', data)

    let arr_search = [
        {"game_name": { $regex: data.game_name, $options: 'i' }},
        {"game_server": { $regex: data.game_server, $options: 'i' }},
        {"trade_type": { $regex: data.trade_type, $options: 'i' }},
        {"type": { $regex: data.type, $options: 'i' }},
        {"category": { $regex: data.category, $options: 'i' }},
        {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
    ];

    if (data['primeService'] != undefined && data['primeService'] == "Y") arr_search[0]['primeService'] = data['primeService'];
    if (data['status'] != undefined) arr_search[0]['status'] = data['status'];

    if (data['userTag'] != undefined) {
        arr_search = [
            {"game_name": { $regex: data.game_name, $options: 'i' }},
            {"game_server": { $regex: data.game_server, $options: 'i' }},
            {"trade_type": { $regex: data.trade_type, $options: 'i' }},
            {"type": { $regex: data.type, $options: 'i' }},
            {"category": { $regex: data.category, $options: 'i' }},
            {"status": 0},
            {"userTag":{ $nin: [data.userTag] }},
            {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}

        ];
    }

    return new Promise((resolve, reject) => {

        if (data['category'] == "game") {
            Items.find(
                {
                    $and: arr_search
                })
                .limit(data.perPage)
                .skip(data.pageIdx * data.perPage)
                .sort({regDate:'desc'})
                .exec(function (err, item) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    // console.log('getItemByRequired done: ' + item)
                    resolve(item)
                })
        } else if (data['category'] == "etc") {
            if (data['category1'] == undefined) data['category1'] = "";
            if (data['category2'] == undefined) data['category2'] = "";

            let etc_array_search = [
                {"trade_type": { $regex: data.trade_type, $options: 'i' }},
                {"category": { $regex: data.category, $options: 'i' }},
                {"category1": { $regex: data.category1, $options: 'i' }},
                //{"category2": { $regex: data.category2, $options: 'i' }},
                {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
            ]

            if (data['primeService'] != undefined && data['primeService'] == "Y") etc_array_search[0]['primeService'] = data['primeService']
            if (data['status'] != undefined) etc_array_search[0]['status'] = data['status'];
            if (data['delivery_type'] != undefined) etc_array_search[0]['delivery_type'] = data['delivery_type'];

            if (data['userTag'] != undefined) {
                etc_array_search = [
                    {"trade_type": { $regex: data.trade_type, $options: 'i' }},
                    {"category": { $regex: data.category, $options: 'i' }},
                    {"category1": { $regex: data.category1, $options: 'i' }},
                    //{"category2": { $regex: data.category2, $options: 'i' }},
                    {"status": 0},
                    {"userTag":{ $nin: [data.userTag] }},
                    {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
                ]
            }

            console.log('data=>', etc_array_search)

            Items.find(
                {
                    $and: etc_array_search
                })
                .limit(data.perPage)
                .skip(data.pageIdx * data.perPage)
                .sort({regDate:'desc'})
                .exec(function (err, item) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    // console.log('getItemByRequired done: ' + item)
                    resolve(item)
                })
        } else if (data['category'] == "otc") {
            let otc_array_search = [
                {"trade_type": { $regex: data.trade_type, $options: 'i' }},
                {"category": { $regex: data.category, $options: 'i' }},
                {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
            ]

            if (data['primeService'] != undefined && data['primeService'] == "Y") otc_array_search[0]['primeService'] = data['primeService']
            if (data['status'] != undefined) otc_array_search[0]['status'] = data['status'];
            
            if (data['userTag'] != undefined) {
                otc_array_search = [
                    {"trade_type": { $regex: data.trade_type, $options: 'i' }},
                    {"status": 0},
                    {"userTag":{ $nin: [data.userTag] }},
                    {$or : [{"title": { $regex: data.title, $options: 'i' }},{"desc": { $regex: data.title, $options: 'i' }}]}
                ]
            }

            console.log('data=>', otc_array_search)

            Items.find(
                {
                    $and: otc_array_search
                })
                .limit(data.perPage)
                .skip(data.pageIdx * data.perPage)
                .sort({regDate:'desc'})
                .exec(function (err, item) {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    // console.log('getItemByRequired done: ' + item)
                    resolve(item)
                })
        }

    })
}


function getItemByUserTag(data) {

    if (data['category'] == undefined) data['category'] = ""
    if (data['trade_type'] == undefined) data['trade_type'] = ""
    if (data['pageIdx'] == undefined) data['pageIdx'] = 0
    if (data['perPage'] == undefined) data['perPage'] = 10

    console.log('data=>', data)

    return new Promise((resolve, reject) => {
        Items.find(
            {
                $and: [
                    {"userTag": data.userTag},
                    {"trade_type": { $regex: data.trade_type, $options: 'i' }},
                    {"category": { $regex: data.category, $options: 'i' }}
                ]
            })
            .limit(data.perPage)
            .skip(data.pageIdx * data.perPage)
            .sort({regDate:'desc'})
            .exec(function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('getItemByRequired done: ' + item)
                resolve(item)
            })
    })
}

function getItemAllByTradeType(data) {
    return new Promise((resolve, reject) => {

        if (data['pageIdx'] == undefined) data['pageIdx'] = 0
        if (data['perPage'] == undefined) data['perPage'] = 20

        console.log('data=>', data)
        Items.find(
            {
                $and: [
                    {"trade_type": data.trade_type},
                    {"category": data.category}
                ]
            })
            .limit(data.perPage)
            .skip(data.pageIdx * data.perPage)
            .sort({regDate:'desc'})
            .exec(function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getItemAll done: ' + item)
                resolve(item)
            })
    })
}

function getItemById(id) {
    return new Promise((resolve, reject) => {
        Items.findOne(
            {"_id": id},
            function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getItemById done: ' + item)
                resolve(item)
            }
        )
    })
}

function getItemByIdAndPassword(data) {
    return new Promise((resolve, reject) => {
        Items.findOne(
            {
                "itemTag": data.itemTag,
                "password": data.password
            },
            function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getItemById done: ' + item)
                resolve(item)
            }
        )
    })
}

function getItemByEmail(email, body) {
    return new Promise((resolve, reject) => {
        Items.findOne(
            {"email": email},
            function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getItemById done: ' + item)
                resolve(item)
            }
        )
    })
}

function getItemsCountByIds(params) {
    return new Promise((resolve, reject) => {
        Items.count(params)
            .limit(100)
            .exec(function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getItemsByIds done: ' + item)
                resolve(item)
            }
        )
    })
}

function getItemsByIds(params, option) {
    return new Promise((resolve, reject) => {
        Items.find(params)
            .limit(option.perPage)
            .skip(option.pageIdx * option.perPage)
            .sort({regDate:'desc'})
            .exec(function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getItemsByIds done: ' + item)
                resolve(item)
            }
        )
    })
}

function updateItemById(itemId, body) {
    return new Promise((resolve, reject) => {
        Items.findOneAndUpdate(
            {
                "_id": itemId
            },
            {
                $set: body
            },
            {upsert: false, new: true},
            function (err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateItem(condition, reqData) {
    return new Promise((resolve, reject) => {
        Items.updateMany(
            condition,
            {
                $set: reqData
            },
            {upsert: false},
            function (err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateItemHistoryId(itemId, historyId) {
    return new Promise((resolve, reject) => {

        Items.findOneAndUpdate(
            {
                "_id": itemId
            },
            {
                $push: {historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function deleteItemById(id) {
    return new Promise((resolve, reject) => {
        Items.findByIdAndRemove(
            id,
            function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getItemById done: ' + item)
                resolve(item)
            }
        )
    })
}

function getItemCountByUserTag(userTag) {
    return new Promise((resolve, reject) => {
        Items.count(
        {
            "userTag": userTag
        })
        .exec(function (err, item) {
            if (err) {
                console.error(err)
                reject(err)
            }
            console.log('getItemCountByUserTag done: ' + item)
            resolve(item)
        })
    });
}

function getReplys (itemIds) {
    return new Promise((resolve, reject) => {
        ReplyItems.find(
            {"itemId": itemIds}
        )
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

function getReplies (itemId) {
    return new Promise((resolve, reject) => {
        ReplyItems.find(
            {"itemId": itemId}
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
        ReplyItems.findOne(
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
        var replyItems = new ReplyItems(body)
        replyItems.save(function (err, result) {
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
        ReplyItems.findOneAndUpdate(
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
        ReplyItems.findByIdAndRemove(
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


exports.createItem = createItem;
exports.getItemAll = getItemAll;
exports.getItemByRequired = getItemByRequired;
exports.getItemByUserTag = getItemByUserTag;
exports.getItemAllByTradeType = getItemAllByTradeType;
exports.getItemById = getItemById;
exports.getItemByIdAndPassword = getItemByIdAndPassword;
exports.getItemByEmail = getItemByEmail;
exports.updateItemById = updateItemById;
exports.updateItemHistoryId = updateItemHistoryId;
exports.deleteItemById = deleteItemById;
exports.getItemsByIds = getItemsByIds;
exports.getItemCount = getItemCount;
exports.getItemsCountByIds = getItemsCountByIds;
exports.getItemCountByUserTag = getItemCountByUserTag;
exports.getReplies = getReplies;
exports.getReplyById = getReplyById;
exports.addReply = addReply;
exports.updateReply = updateReply;
exports.deleteReply = deleteReply;
exports.updateItem = updateItem;
exports.getReplys = getReplys;