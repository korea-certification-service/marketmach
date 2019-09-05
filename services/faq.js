var Faq = require('../libs/faq');

function count (data, option) {
    return new Promise((resolve, reject) => {
        Faq.count(
            data
        )
            .limit(100)
            // .skip(option.pageIdx * option.perPage)
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
        Faq.find(
            data
        )
        .limit(option.perPage)
        // .skip(option.pageIdx * option.perPage)
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
        Faq.findOne(
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
        var faq = new Faq(data)
        faq.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('add done: ' + result)
                resolve(result)
            }
        })
    })
}

exports.search = search
exports.getById = getById
exports.add = add;
exports.count = count;
