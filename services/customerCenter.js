var CustomerCenter = require('../libs/customerCenter');

function count (data, option) {
    return new Promise((resolve, reject) => {
        CustomerCenter.count(
            data
        )
            .limit(100)
            .skip(option.pageIdx * option.perPage)
            .sort({regDate:'desc'})
            .exec(function (err, faqs) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('search done: ' + faqs)
                resolve(faqs)
            })
    })
}

function search (data, option) {
    return new Promise((resolve, reject) => {
        CustomerCenter.find(
            data
        )
        .limit(option.perPage)
        .skip(option.pageIdx * option.perPage)
        .sort({regDate:'desc'})
        .exec(function (err, faqs) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            console.log('search done: ' + faqs)
            resolve(faqs)
        })
    })
}

function getById (id) {
    return new Promise((resolve, reject) => {
        CustomerCenter.findOne(
            {"_id": id},
            function(err, faq) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getById done: ' + faq)
                resolve(faq)
            }
        )
    })
}

function add(data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var customerCenter = new CustomerCenter(data)
        customerCenter.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('add done: ' + result)
                resolve(result)
            }
        })
    })
}

function modify(id, body) {
    return new Promise((resolve, reject) => {
        CustomerCenter.findOneAndUpdate(
            {"_id": id
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

function remove(id) {
    return new Promise((resolve, reject) => {
        CustomerCenter.findByIdAndRemove(
            id,
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

exports.search = search;
exports.getById = getById;
exports.add = add;
exports.count = count;
exports.modify = modify;
exports.remove = remove;