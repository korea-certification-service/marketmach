var CountryCodes = require('../libs/countryCodes');

function get () {
    return new Promise((resolve, reject) => {
        CountryCodes.find({})
            .exec(function (err, coin) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('get done: ' + coin)
                resolve(coin)
            })
    })
}

function add (data) {
    return new Promise((resolve, reject) => {
        var countryCodes = new CountryCodes(data)
        countryCodes.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}

exports.get = get;
exports.add = add;