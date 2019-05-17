var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var timekillSchema = require('../models/timekills');

module.exports = mongoose.model('Timekill', timekillSchema);
