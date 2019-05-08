var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var coinsSchema = require('../models/coins');

module.exports = mongoose.model('Coins', coinsSchema);
