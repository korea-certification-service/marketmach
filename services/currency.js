var Currency = require('../libs/currency');

function createCurrency (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var currency = new Currency(data)
        currency.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                //console.log('createCurrency done: ' + result)
                resolve(result)
            }
        })
    })
}

function getCurrencyByType (data, option) {
    return new Promise((resolve, reject) => {
        Currency.find(data)
            .limit(option.limit)
            .sort({_id:'desc'})
            .exec(function (err, item) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                //console.log('getCurrencyByType done: ' + item)
                resolve(item)
            })
    })
}

exports.createCurrency = createCurrency
exports.getCurrencyByType = getCurrencyByType
