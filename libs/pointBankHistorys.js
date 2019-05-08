var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var pointBankHistorysSchema = require('../models/pointBankHistorys');

module.exports = mongoose.model('PointBankHistorys', pointBankHistorysSchema);
