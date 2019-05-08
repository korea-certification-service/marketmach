var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var coundryCodesSchema = require('../models/countryCodes');

module.exports = mongoose.model('Countrycodes', coundryCodesSchema);
