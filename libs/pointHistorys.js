var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var pointHistorysSchema = require('../models/pointHistorys');

module.exports = mongoose.model('PointHistorys', pointHistorysSchema);
