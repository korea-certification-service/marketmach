var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var EventSchema = require('../models/events');

module.exports = mongoose.model('Event', EventSchema);
