var db = require('../utils/db');
var bitwebBusinessContact = require('../services/businessContacts');
var dbconfig = require('../config/dbconfig');
var util = require('../utils/util');

function add(req) {
    return new Promise((resolve, reject) => {

        let country = dbconfig.country;
        let body = req.body;
        body['regDate'] = util.formatDate(new Date().toString())

        db.connectDB(country)
            .then(() => bitwebBusinessContact.add(body))
            .then((businessContact) => {
                console.log('result=>', businessContact);
                resolve(businessContact)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.add = add;