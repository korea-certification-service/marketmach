var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var vtrTempsSchema = require('../models/vtrTemps');

module.exports = mongoose.model('VtrTemps', vtrTempsSchema);
