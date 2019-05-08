var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var PersonalsSchema = require('../models/personals');

module.exports = mongoose.model('Personals', PersonalsSchema);
