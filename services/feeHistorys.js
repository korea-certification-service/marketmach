var FeeHistorys = require('../libs/feeHistorys');

function createFeeHistory (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var feeHistorys = new FeeHistorys(data)
        feeHistorys.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}

exports.createFeeHistory = createFeeHistory;