var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var tradePointsSchema = require('../models/pointTrades');

module.exports = mongoose.model('PointTrades', tradePointsSchema);
