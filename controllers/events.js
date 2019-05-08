let db = require('../utils/db');
let bitwebEvents = require('../services/events');
var dbconfig = require('../config/dbconfig');

function count(req) {
    return new Promise((resolve, reject) => {
        let country = dbconfig.country;
        let eventEnd = true;
        if(req.params.eventEnd == "now") {
            eventEnd = false;
        }
        let data = {"eventEnd": eventEnd};
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
            .then(() => bitwebEvents.count(data, option))
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
        let eventEnd = true;
        if(req.params.eventEnd == "now") {
            eventEnd = false;
        }
        let data = {"eventEnd": eventEnd};
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
            .then(() => bitwebEvents.search(data, option))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function get(country, eventId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebEvents.getById(eventId))
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