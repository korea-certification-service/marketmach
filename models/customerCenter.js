var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('./image');

var FaqSchema = new Schema({
    type: String,
    title: String,
    content: String,
    answerEmail: Boolean,
    answerSMS: Boolean,
    images: [Image],
    regDate: String,
    reporter: String
});

module.exports = FaqSchema;
