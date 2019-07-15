var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var GameCenterExchangeHistorySchema = require('../models/gameCenterExchangeHistory');

module.exports = mongoose.model('GameCenterExchangeHistory', GameCenterExchangeHistorySchema);
