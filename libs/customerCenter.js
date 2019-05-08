var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var CustomerCenterSchema = require('../models/customerCenter');

module.exports = mongoose.model('CustomerCenter', CustomerCenterSchema);
