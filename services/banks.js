var banks = require('../libs/banks');

function createBank (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        banks.findOneAndUpdate(
            {
                "bank_account": data.bank_account
            },
            {
                $set:data
            },
            {upsert: true, new: true},
            function(err, bank) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('bank done: ' + bank._id)
                resolve(bank)
            }
        )
    })
}

function getBankById (id) {
    return new Promise((resolve, reject) => {
        banks.findOne(
            {"_id": id},
            function(err, bank) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('getBankById done: ' + bank)
                resolve(bank)
            }
        )
    })
}

exports.createBank = createBank
exports.getBankById = getBankById
