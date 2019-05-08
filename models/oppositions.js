var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = require('./items');
var Image = require('./image');

var OppositionsSchema = new Schema({
    item: Item,
    title: String,
    content: String,
    regDate: String,
    images: [Image],
    reply: String,
    replyDate: String,
    reporter: String
});

module.exports = OppositionsSchema;
