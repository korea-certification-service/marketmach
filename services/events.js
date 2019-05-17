var Event = require('../libs/events');
var Timekill = require('../libs/timekills');

function count (data, option) {
    return new Promise((resolve, reject) => {
        Event.count(
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
        Event.find(
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
        Event.findOne(
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

function buy(data) {
    return new Promise((resolve, reject) => {
        var timekill = new Timekill(data)
        timekill.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('buy done: ' + result)
                resolve(result)
            }
        })
    })
}

exports.search = search
exports.getById = getById
exports.count = count;
exports.buy = buy;