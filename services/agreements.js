var Agreements = require('../libs/agreements');

function createAgreement (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var agreements = new Agreements(data)
        agreements.save(function(err, agreement) {
            if (err) {
                // console.error(err)
                reject(err)
            }
            console.log('createAgreement done: ' + agreement._id)
            resolve(agreement)
        })
    })
}

function updateByAgreement (agreementId, data) {
    return new Promise((resolve, reject) => {
        Agreements.findOneAndUpdate(
            {
                "_id": agreementId
            },
            {
                $set:data
            },
            {upsert: false, new: true},
            function(err, agreement) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                console.log('createAgreement done: ' + agreement._id)
                resolve(agreement)
            }
        )
    })
}

function updateAgreementById(id, body) {
    return new Promise((resolve, reject) => {
        Agreements.findOneAndUpdate(
            {"_id": id
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    // console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function getAgreementById (id) {
    return new Promise((resolve, reject) => {
        Agreements.findOne(
            {"_id": id},
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

exports.createAgreement = createAgreement
exports.updateAgreementById = updateAgreementById
exports.getAgreementById = getAgreementById
exports.updateByAgreement = updateByAgreement
