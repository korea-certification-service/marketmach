var db = require('../utils/db');
var bitwebAgreements = require('../services/agreements');

function get(req) {
    return new Promise((resolve, reject) => {

        var agreementId = req.params.agreementId;
        let country = req.session.country;

        db.connectDB(country)
            .then(() => bitwebAgreements.getAgreementById(agreementId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getById(country, agreementId) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebAgreements.getAgreementById(agreementId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}


function detail(country, condition) {
    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebAgreements.detail(condition))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}


function create(req) {
    return new Promise((resolve, reject) => {

        var data = req.body;
        let country = req.session.country;

        db.connectDB(country)
            .then(() => bitwebAgreements.createAgreement(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createByAgreement(country, agreement) {
    return new Promise((resolve, reject) => {

        var data = agreement;

        db.connectDB(country)
            .then(() => bitwebAgreements.createAgreement(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function updateByAgreement(country, agreementId, data) {
    return new Promise((resolve, reject) => {

        db.connectDB(country)
            .then(() => bitwebAgreements.updateByAgreement(agreementId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function updateById(country, id, body) {
    return new Promise((resolve , reject) => {

        var data = body;

        db.connectDB(country)
            .then(() => bitwebAgreements.updateAgreementById(id, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.get = get;
exports.getById = getById;
exports.create = create;
exports.createByAgreement = createByAgreement;
exports.updateById = updateById;
exports.updateByAgreement =updateByAgreement;
exports.detail = detail;