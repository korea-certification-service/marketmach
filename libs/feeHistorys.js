var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var feeHistorysSchema = require('../models/feeHistorys');

module.exports = mongoose.model('FeeHistorys', feeHistorysSchema);
