var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    login: String,
    email: String,
});

module.exports = testSchema;
