var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var occupancyPhoneSchema = require('../models/occupancyPhones');

module.exports = mongoose.model('OccupancyPhones', occupancyPhoneSchema);
