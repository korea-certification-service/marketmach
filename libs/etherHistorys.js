var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var etherHistorysSchema = require('../models/etherHistorys');

module.exports = mongoose.model('Etherhistorys', etherHistorysSchema);
