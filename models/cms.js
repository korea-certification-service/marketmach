var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cmsSchema = new Schema({
    title: String,
    content: String,
    left: Number,
    top: Number,
    width: Number
});

module.exports = cmsSchema;
