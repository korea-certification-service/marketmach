var BannerEvent = require('../libs/banner_event');


function getBennerEventList () {
    return new Promise((resolve, reject) => {
        BannerEvent.find(
            {"view_yn": "y"},
            function(err, banner) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getBennerEventList done: ' + banner)
                resolve(banner)
            }
        )
    })
}

exports.getBennerEventList = getBennerEventList
