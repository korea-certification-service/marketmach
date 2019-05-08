
var db = require('../utils/db');
var daiosTest = require('../services/test');

function test(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var login = req.params.userId;
        var data = {'login': login}
        db.connectDB(country)
            .then(() => daiosTest.createTest(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            })
    })

}

exports.test = test;
