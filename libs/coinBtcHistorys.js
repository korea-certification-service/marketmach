var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var coinBtcHistorysSchema = require('../models/coinBtcHistorys');

module.exports = mongoose.model('CoinBtcHistorys', coinBtcHistorysSchema);
