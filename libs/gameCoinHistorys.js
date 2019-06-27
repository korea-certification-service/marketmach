var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var GameCoinHistorysSchema = require('../models/gameCoinHistorys');

module.exports = mongoose.model('GameCoinHistorys', GameCoinHistorysSchema);
