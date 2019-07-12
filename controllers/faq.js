var db = require('../utils/db');
var bitwebFaq = require('../services/faq');
var dbconfig = require('../config/dbconfig');

function count(req) {
    return new Promise((resolve, reject) => {
        let country = dbconfig.country;
        let data = {};
        let option = {
            "perPage": req.query.perPage == undefined ? 20 : parseInt(req.query.perPage),
            "pageIdx": req.query.pageIdx == undefined ? 0 : parseInt(req.query.pageIdx)
        };
        if(req.query.title != undefined) {
            data = {
                $or: [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }}, {'category' : { $regex: req.query.title, $options: 'i' }}, ]
            }
        };
        if(dbconfig.country != "KR") {
            data['country'] = dbconfig.country;
        } else {
            data['country'] = {$exists: false};
        }

        db.connectDB(country)
            .then(() => bitwebFaq.count(data, option))
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
        let data = {};
        let option = {
            "perPage": req.query.perPage == undefined ? 20 : parseInt(req.query.perPage),
            "pageIdx": req.query.pageIdx == undefined ? 0 : parseInt(req.query.pageIdx)
        };
        if(req.query.title != undefined) {
            data = {
                $or: [{'title' : { $regex: req.query.title, $options: 'i' }}, {'content' : { $regex: req.query.title, $options: 'i' }}, {'category' : { $regex: req.query.title, $options: 'i' }}, ]
            }
        }
        if(dbconfig.country != "KR") {
            data['country'] = dbconfig.country;
        } else {
            data['country'] = {$exists: false};
        }

        db.connectDB(country)
            .then(() => bitwebFaq.search(data, option))
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

        var faqId = req.params.faqId;
        let country = dbconfig.country;

        db.connectDB(country)
            .then(() => bitwebFaq.getById(faqId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function add(req){
    return new Promise((resolve, reject) => {
        let param = {
            "title":"test",
            "content":"test",
            "worker":"admin",
            "regDate":"2019/02/01 00:00:00"
        }
        let country = dbconfig.country;

        db.connectDB(country)
            .then(() => bitwebFaq.add(param))
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
exports.add = add;
exports.count = count;
