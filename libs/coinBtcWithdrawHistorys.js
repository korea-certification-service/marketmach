var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var coinBtcWithdrawHistorysSchema = require('../models/coinBtcWithdrawHistorys');

module.exports = mongoose.model('CoinBtcWithdrawHistorys', coinBtcWithdrawHistorysSchema);
