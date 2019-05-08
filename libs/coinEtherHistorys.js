var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var coinEtherHistorysSchema = require('../models/coinEtherHistorys');

module.exports = mongoose.model('CoinEtherHistorys', coinEtherHistorysSchema);
