var db = require('../utils/db');
var bitwebBannerEvent = require('../services/banner_event');

function getBennerEventList(country) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebBannerEvent.getBennerEventList())
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

exports.getBennerEventList = getBennerEventList;