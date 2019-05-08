var db = require('../utils/db');
var bitwebCountryCodes = require('../services/countryCodes');

function get(country) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebCountryCodes.get())
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}


exports.get = get;
