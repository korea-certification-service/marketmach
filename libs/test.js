var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var testSchema = require('../models/test');

module.exports = mongoose.model('Test', testSchema);
