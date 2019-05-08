var Categories = require('../libs/categories');

function getAll () {
    return new Promise((resolve, reject) => {
        Categories.find(
            {},
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('getGameAll done: ' + game)
                resolve(game)
            }
        )
    })
}

function getByCategory1 (category1) {
    return new Promise((resolve, reject) => {
        Categories.findOne(
            {"category1": category1},
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('gameName done: ' + game)
                resolve(game)
            }
        )
    })
}

function getByRegexCategory1 (category1) {
    return new Promise((resolve, reject) => {
        Categories.find(
            {"category1": { $regex: category1, $options: 'i' }},
            function(err, game) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('gameName done: ' + game)
                resolve(game)
            }
        )
    })
}

exports.getAll = getAll;
exports.getByCategory1 = getByCategory1;
exports.getByRegexCategory1 = getByRegexCategory1;
