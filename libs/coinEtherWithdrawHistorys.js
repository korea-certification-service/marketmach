var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var coinEtherWithdrawHistorysSchema = require('../models/coinEtherWithdrawHistorys');

module.exports = mongoose.model('CoinEtherWithdrawHistorys', coinEtherWithdrawHistorysSchema);
