var db = require('../utils/db');
var bitwebEthers = require('../services/ethers');

function get(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var etherId = req.params.etherId;

        db.connectDB(country)
            .then(() => bitwebEthers.getEtherById(etherId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function getEther(country, etherId) {

    return new Promise((resolve, reject) => {
        db.connectDB(country)
            .then(() => bitwebEthers.getEtherById(etherId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function getPrice(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var etherId = req.params.etherId;
        //TODO: call daios block chain API
        var dac = 10
        var response = {'dac':dac}
        resolve(response);
    })
}

function create(req) {
    return new Promise((resolve, reject) => {

        let country = req.session.country;
        var data = req.body;

        db.connectDB(country)
            .then(() => bitwebEthers.createEther(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function createByEther(country, ether) {
    return new Promise((resolve, reject) => {

        var data = ether;

        db.connectDB(country)
            .then(() => bitwebEthers.createEther(data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })

}

function update(req) {
    return new Promise((resolve , reject) => {

        let country = req.session.country;
        var etherId = req.params.etherId;
        var data = req.body;

        db.connectDB(country)
            .then(() => bitwebEthers.updateEtherById(etherId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateByEtherId(country, etherId, body) {
    return new Promise((resolve , reject) => {

        var data = body;

        db.connectDB(country)
            .then(() => bitwebEthers.updateEtherById(etherId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateWithHistory(country, etherId, historyId) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebEthers.updateEtherHistoryId(etherId, historyId))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

function updateTotalCoin(country, etherId, data) {
    return new Promise((resolve , reject) => {

        db.connectDB(country)
            .then(() => bitwebEthers.updateEtherById(etherId, data))
            .then((result) => {
                console.log('result=>' , result);
                resolve(result)
            }).catch((err) => {
            reject(err)
        })
    })
}

exports.get = get;
exports.getEther = getEther;
exports.getPrice = getPrice;
exports.create = create;
exports.createByEther = createByEther;
exports.update = update;
exports.updateByEtherId = updateByEtherId;
exports.updateWithHistory = updateWithHistory;
exports.updateTotalCoin = updateTotalCoin;
