var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var OppositionSchema = require('../models/oppositions');

module.exports = mongoose.model('Oppositions', OppositionSchema);
