var db = require('../utils/db');
var bitwebCurrency = require('../services/currency');

function getByType(country, type, limit) {
    return new Promise((resolve, reject) => {

        let data = {};
        let option = {};
        if(type != "") {
            data['type'] = type;
        }
        option['limit'] = limit;

        db.connectDB(country)
            .then(() => bitwebCurrency.getCurrencyByType(data, option))
            .then((result) => {
                //console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function create(country, data) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebCurrency.createCurrency(data))
            .then((result1) => {
                //console.log('result1=>' , result1);
                resolve(result1)
            }).catch((err) => {
            reject(err)
        })
    })

}

exports.getByType = getByType;
exports.create = create;
