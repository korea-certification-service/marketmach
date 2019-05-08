var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var coinMachWithdrawHistorysSchema = require('../models/coinMachWithdrawHistorys');

module.exports = mongoose.model('CoinMachWithdrawHistorys', coinMachWithdrawHistorysSchema);
