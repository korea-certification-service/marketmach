var db = require('../utils/db');
var bitwebBanks = require('../services/banks');

function get(req) {
    return new Promise((resolve, reject) => {

        var bankId = req.params.bankId;
        let country = req.session.country;

        db.connectDB(country)
            .then(() => bitwebBanks.getBankById(bankId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function create(req) {
    return new Promise((resolve, reject) => {

        var data = req.body;
        let country = req.session.country;

        db.connectDB(country)
            .then(() => bitwebBanks.createBank(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createByBank(country, bank) {
    return new Promise((resolve, reject) => {

        var data = bank;

        db.connectDB(country)
            .then(() => bitwebBanks.createBank(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

exports.get = get;
exports.create = create;
exports.createByBank = createByBank;
