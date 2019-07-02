let AWS = require('aws-sdk');
var controllerItems = require('../controllers/items');
var controllerUsers = require('../controllers/users');
const credentials = require('../config/aws-credentials');
const smsContent = require('../config/sms');

function sendSms(req, res, useYn) {
    return new Promise((resolve, reject) => {

        if (req.params.itemId != null) {

            let itemId = req.params.itemId;
            let country = req.params.country;
            let userTag = req.params.userId;

            controllerItems.getByItemId(country, itemId, "", userTag)
                .then((item) => {
                    let userTags = [item._doc.userTag];
                    // if(item._doc.trade_type == "buy") {
                    //     userTags = [userTag, item._doc.userTag];
                    // }

                    controllerUsers.getByUserTags(country, userTags)
                        .then((users) => {

                            // Set region
                            AWS.config.update({
                                accessKeyId: credentials.s3.accessKeyId,
                                secretAccessKey: credentials.s3.secretAccessKey,
                                region: credentials.sns.region
                            });

                            // Create publish parameters(언어에 따라서 표시, 일단은 한국어와 중국어만)
                            let message = smsContent.sms.ko;
                            if(req.session.country == "CN") {
                                message = smsContent.sms.cn;
                            }

                            for (var i in users) {
                                if (users[i]._doc.phone == undefined || users[i]._doc.phone == "") {
                                    let err = "There is no phone."
                                    console.error('err=>', err);
                                    reject(err);
                                }
                            }

                            for (var i in users) {
                                let url_output = userTags.indexOf(users[i].userTag) == 0 ? req.body.from_url : req.body.to_url;
                                if(useYn == "no") url_output = item._doc._id;
                                let sms_msg = userTag + message + url_output;
                                let params = {
                                    Message: sms_msg,
                                    PhoneNumber: users[i]._doc.countryCode + users[i]._doc.phone,  //전화번호
                                };

                                // Create promise and SNS service object
                                var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

                                // Handle promise's fulfilled/rejected states
                                publishTextPromise.then((data) => {
                                    console.log("MessageID is " + data.MessageId);
                                }).catch((err) => {
                                    console.error(err, err.stack);
                                });
                            }

                            resolve('success');
                        })
                }).catch((err) => {
                console.error('err=>', err)
                reject(err);
            })
        }
    });
}

function sendNotification(country, fromUserTag, targetUserTag, url_output, useYn) {
    return new Promise((resolve, reject) => {
        controllerUsers.getByUserTag(country, targetUserTag)
            .then((user) => {

                // Set region
                AWS.config.update({
                    accessKeyId: credentials.s3.accessKeyId,
                    secretAccessKey: credentials.s3.secretAccessKey,
                    region: credentials.sns.region
                });

                // Create publish parameters(언어에 따라서 표시, 일단은 한국어와 중국어만)
                let message = smsContent.notification.ko;
                if(useYn == "no") url_output = "";
                let sms_msg = fromUserTag + message + url_output;
                let params = {
                    Message: sms_msg,
                    PhoneNumber: user._doc.countryCode + user._doc.phone,  //전화번호
                };

                // Create promise and SNS service object
                var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

                // Handle promise's fulfilled/rejected states
                publishTextPromise.then((data) => {
                    console.log("MessageID is " + data.MessageId);
                }).catch((err) => {
                    console.error(err, err.stack);
                });
                resolve('success');
            }).catch((err) => {
                console.error('err=>', err)
                reject(err);
            })
    });
}

function sendBuynow(country, fromUserTag, targetUserTag) {
    return new Promise((resolve, reject) => {
        controllerUsers.getByUserTag(country, targetUserTag)
            .then((user) => {

                // Set region
                AWS.config.update({
                    accessKeyId: credentials.s3.accessKeyId,
                    secretAccessKey: credentials.s3.secretAccessKey,
                    region: credentials.sns.region
                });

                // Create publish parameters(언어에 따라서 표시, 일단은 한국어와 중국어만)
                let message = smsContent.notification.ko;
                let sms_msg = fromUserTag + message;
                let params = {
                    Message: sms_msg,
                    PhoneNumber: user._doc.countryCode + user._doc.phone,  //전화번호
                };

                // Create promise and SNS service object
                var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

                // Handle promise's fulfilled/rejected states
                publishTextPromise.then((data) => {
                    console.log("MessageID is " + data.MessageId);
                }).catch((err) => {
                    console.error(err, err.stack);
                });
                resolve('success');
            }).catch((err) => {
            console.error('err=>', err)
            reject(err);
        })
    });
}

function sendSmsCommon(data) {
    return new Promise((resolve, reject) => {
        // Set region
        AWS.config.update({
            accessKeyId: credentials.s3.accessKeyId,
            secretAccessKey: credentials.s3.secretAccessKey,
            region: credentials.sns.region
        });

        // Create publish parameters(언어에 따라서 표시, 일단은 한국어와 중국어만)
        let params = {
            Message: data.message,
            PhoneNumber: data.countryCode + data.phone,  //전화번호
        };

        // Create promise and SNS service object
        var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

        // Handle promise's fulfilled/rejected states
        publishTextPromise.then((data) => {
            console.log("MessageID is " + data.MessageId);
            resolve(data);
        }).catch((err) => {
            console.error(err, err.stack);
            reject(err);
        });
        
    });
}

exports.sendSms = sendSms;
exports.sendNotification = sendNotification;
exports.sendBuynow = sendBuynow;
exports.sendSmsCommon = sendSmsCommon;  