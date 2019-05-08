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

exports.get = get;