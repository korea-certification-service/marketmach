var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var gameCenterRecordsSchema = require('../models/gameCenterRecords');

module.exports = mongoose.model('GameCenterRecord', gameCenterRecordsSchema);
