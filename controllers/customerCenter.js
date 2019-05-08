var db = require('../utils/db');
var bitwebCustomerCenter = require('../services/customerCenter');
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
            .then(() => bitwebCustomerCenter.count(data, option))
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
            .then(() => bitwebCustomerCenter.search(data, option))
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

        var customerCenterId = req.params.customerCenterId;
        let country = dbconfig.country;

        db.connectDB(country)
            .then(() => bitwebCustomerCenter.getById(customerCenterId))
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
        let body = req.body;

        db.connectDB(country)
            .then(() => bitwebCustomerCenter.add(body))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function modify(req){
    return new Promise((resolve, reject) => {
        let param = {
            "title":"test",
            "content":"test",
            "worker":"admin",
            "regDate":"2019/02/01 00:00:00"
        }
        let country = dbconfig.country;
        let customerCenterId = req.params.customerCenterId;
        let body = req.body;

        db.connectDB(country)
            .then(() => bitwebCustomerCenter.modify(customerCenterId, body))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function remove(req){
    return new Promise((resolve, reject) => {
        let param = {
            "title":"test",
            "content":"test",
            "worker":"admin",
            "regDate":"2019/02/01 00:00:00"
        }
        let country = dbconfig.country;
        let customerCenterId = req.params.customerCenterId;

        db.connectDB(country)
            .then(() => bitwebCustomerCenter.remove(customerCenterId))
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
exports.remove = remove;
exports.modify = modify;
