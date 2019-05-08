var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var agreementsSchema = require('../models/agreements');

module.exports = mongoose.model('Agreements', agreementsSchema);
