var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authPhonesSchema = new Schema({
    country: String,
    regDate: String
});

module.exports = authPhonesSchema;
