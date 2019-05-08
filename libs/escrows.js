var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var escrowsSchema = require('../models/escrows');

module.exports = mongoose.model('Escrows', escrowsSchema);
