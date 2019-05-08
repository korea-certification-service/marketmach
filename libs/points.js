var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var pointsSchema = require('../models/points');

module.exports = mongoose.model('Points', pointsSchema);
