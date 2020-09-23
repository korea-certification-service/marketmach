var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var banner_eventSchema = require('../models/banner_event');

module.exports = mongoose.model('banner_event', banner_eventSchema, 'banner_event');
