var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var authPhoneSchema = require('../models/authPhones');

module.exports = mongoose.model('AuthPhones', authPhoneSchema);
