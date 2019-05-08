var Test = require('../libs/test');

function createTest (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        Test.findOneAndUpdate(
            {"login": data.login
            },
            {$set:{
                    'login': data.login,
                    'email': data.email ? data.email : null,
                },
            },
            {upsert: true, new: true},
            function(err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('createUser done: ' + user._id)
                resolve(user)
            }
        )
    })
}

function getUserById (id) {
    return new Promise((resolve, reject) => {
        User.findOne(
            {"_id": id},
            function(err, user) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getUserById done: ' + user)
                resolve(user)
            }
        )
    })
}

exports.createTest = createTest
exports.getUserById = getUserById
