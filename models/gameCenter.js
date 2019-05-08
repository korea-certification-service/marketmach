var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameCenterSchema = new Schema({
    userId: String,
    total_mcs1_coin: Number
});

module.exports = gameCenterSchema;
