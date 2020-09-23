var db = require('../utils/db');
var bitwebBannerEvent = require('../services/banner_event');

function getBennerEventList(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;

        db.connectDB(country)
            .then(() => bitwebAgreements.getBennerEventList())
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

exports.getBennerEventList = getBennerEventList;