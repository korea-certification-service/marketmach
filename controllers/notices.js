var db = require('../utils/db');
var bitwebNotice = require('../services/notices');
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

        db.connectDB(country)
            .then(() => bitwebNotice.count(data, option))
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

        db.connectDB(country)
            .then(() => bitwebNotice.search(data, option))
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

        var noticeId = req.params.noticeId;
        let country = dbconfig.country;

        db.connectDB(country)
            .then(() => bitwebNotice.getById(noticeId))
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
