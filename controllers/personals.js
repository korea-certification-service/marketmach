var db = require('../utils/db');
var bitwebPersonals = require('../services/personals');
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
        //국가별로 1:1 문의 관리
        if(dbconfig.country != "KR") {
            data['country'] = dbconfig.country;
        } else {
            data['country'] = {$exists: false};
        }

        db.connectDB(country)
            .then(() => bitwebPersonals.count(data, option))
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
        //국가별로 1:1 문의 관리
        if(dbconfig.country != "KR") {
            data['country'] = dbconfig.country;
        } else {
            data['country'] = {$exists: false};
        }

        db.connectDB(country)
            .then(() => bitwebPersonals.search(data, option))
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

        var personalId = req.params.personalId;
        let country = dbconfig.country;

        db.connectDB(country)
            .then(() => bitwebPersonals.getById(personalId))
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
        let param = req.body;
        let country = dbconfig.country;
        param['regDate'] = util.formatDate(new Date().toString());

        db.connectDB(country)
            .then(() => bitwebPersonals.add(param))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function update(country, personalId, body) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebPersonals.update(personalId, body))
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