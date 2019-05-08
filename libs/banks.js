var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var banksSchema = require('../models/banks');

module.exports = mongoose.model('Banks', banksSchema);
