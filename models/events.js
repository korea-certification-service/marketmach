var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    title: String,
    content: String,
    worker: String,
    eventEnd : Boolean,
    regDate: String
});

module.exports = EventSchema;
