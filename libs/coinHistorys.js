var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var coinHistorysSchema = require('../models/coinHistorys');

module.exports = mongoose.model('CoinHistorys', coinHistorysSchema);
