var Personal = require('../libs/personals');

function count (data, option) {
    return new Promise((resolve, reject) => {
        Personal.count(
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
        Personal.find(
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
        Personal.findOne(
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
        var faq = new Personal(data)
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

function update(id, body) {
    return new Promise((resolve, reject) => {
        Personal.findOneAndUpdate(
            {"_id": id},
            {
                $set: body
            },
            {upsert: false, new: true},
            function(err, personal) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('update done: ' + personal)
                resolve(personal)
            }
        )
    })
}

exports.search = search
exports.getById = getById
exports.count = count;
exports.add = add;
exports.update = update;