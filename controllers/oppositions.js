var db = require('../utils/db');
var bitwebOpposition = require('../services/oppositions');
var dbconfig = require('../config/dbconfig');
var util = require('../utils/util')

function count(req) {
    return new Promise((resolve, reject) => {
        let country = dbconfig.country;
        let data = {
            "reporter": req.params.userTag
        };
        let option = {
            "perPage": req.query.perPage == undefined ? 20 : parseInt(req.query.perPage),
            "pageIdx": req.query.pageIdx == undefined ? 0 : parseInt(req.query.pageIdx)
        };
        // if(req.query.title != undefined) {
        //     data = {
        //         $or: [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }}, {'category' : { $regex: req.query.title, $options: 'i' }}, ]
        //     }
        // };

        db.connectDB(country)
            .then(() => bitwebOpposition.count(data, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function list(req) {
    return new Promise((resolve, reject) => {
        let country = dbconfig.country;
        let data = {
            "reporter": req.params.userTag
        };
        let option = {
            "perPage": req.query.perPage == undefined ? 20 : parseInt(req.query.perPage),
            "pageIdx": req.query.pageIdx == undefined ? 0 : parseInt(req.query.pageIdx)
        };
        // if(req.query.title != undefined) {
        //     data = {
        //         $or: [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }}, {'category' : { $regex: req.query.title, $options: 'i' }}, ]
        //     }
        // }

        db.connectDB(country)
            .then(() => bitwebOpposition.search(data, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function get(req) {
    return new Promise((resolve, reject) => {

        var oppositionId = req.params.oppositionId;
        let country = dbconfig.country;

        db.connectDB(country)
            .then(() => bitwebOpposition.getById(oppositionId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function add(req) {
    return new Promise((resolve, reject) => {
        // let param = {
        //     "item":"item",
        //     "title":"test",
        //     "content":"test",
        //     "worker":"admin",
        //     "regDate":"2019/02/01 00:00:00"
        // }
        let param = req.body;
        let country = dbconfig.country;
        param['regDate'] = util.formatDate(new Date().toString());

        db.connectDB(country)
            .then(() => bitwebOpposition.add(param))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function update(country, oppositionId, body) {
    return new Promise((resolve, reject) => {
        // let param = {
        //     "item":"item",
        //     "title":"test",
        //     "content":"test",
        //     "worker":"admin",
        //     "regDate":"2019/02/01 00:00:00"
        // }
        db.connectDB(country)
            .then(() => bitwebOpposition.update(oppositionId, body))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.list = list;
exports.get = get;
exports.count = count;
exports.add = add;
exports.update = update;