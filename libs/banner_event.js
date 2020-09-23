var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var banner_eventSchema = require('../models/banner_eventSchema');

module.exports = mongoose.model('banner_event', banner_eventSchema);
