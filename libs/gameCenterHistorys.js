var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var GameCenterHistorySchema = require('../models/gameCenterHistorys');

module.exports = mongoose.model('GameCenterHistory', GameCenterHistorySchema);
