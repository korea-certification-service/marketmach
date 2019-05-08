var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var coinMachHistorysSchema = require('../models/coinMachHistorys');

module.exports = mongoose.model('CoinMachHistorys', coinMachHistorysSchema);
