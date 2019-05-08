var BusinessContracts = require('../libs/businessContacts');

function add (body) {
    return new Promise((resolve, reject) => {
        //console.log(body)
        var businessContracts = new BusinessContracts(body)
        businessContracts.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('add done: ' + result)
                resolve(result)
            }
        })
    })
}

exports.add = add;
