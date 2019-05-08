var Cms = require('../libs/cms');

function getCmsList () {
    return new Promise((resolve, reject) => {
        Cms.find({},
            function(err, cms) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getCmsList done: ' + cms)
                resolve(cms)
            }
        )
    })
}

exports.getCmsList = getCmsList;