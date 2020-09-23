var BannerEvent = require('../libs/banner_event');


function getBennerEventList () {
    return new Promise((resolve, reject) => {
        BannerEvent.find(
            {"view_yn": "y"},
            function(err, agreement) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getEtherById done: ' + agreement)
                resolve(agreement)
            }
        )
    })
}

exports.getBennerEventList = getBennerEventList
