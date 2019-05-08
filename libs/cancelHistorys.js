var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cancelHistorysSchema = require('../models/cancelHistorys');

module.exports = mongoose.model('CancelHistorys', cancelHistorysSchema);