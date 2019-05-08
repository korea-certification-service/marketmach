var Notice = require('../libs/notices');

function count (data, option) {
    return new Promise((resolve, reject) => {
        Notice.count(
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
        Notice.find(
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
        Notice.findOne(
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

exports.search = search
exports.getById = getById
exports.count = count;
