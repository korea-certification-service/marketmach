var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var vtrsSchema = require('../models/vtrs');

module.exports = mongoose.model('Vtrs', vtrsSchema);
