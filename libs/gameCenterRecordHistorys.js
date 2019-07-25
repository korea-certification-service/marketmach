var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var gameCenterRecordHistorysSchema = require('../models/gameCenterRecordHistorys');

module.exports = mongoose.model('GameCenterRecordHistorys', gameCenterRecordHistorysSchema);
