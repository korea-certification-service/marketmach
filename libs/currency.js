var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var currencySchema = require('../models/currency');

module.exports = mongoose.model('Currency', currencySchema);
