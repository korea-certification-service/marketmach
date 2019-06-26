var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var machgamesSchema = require('../models/machgames');

module.exports = mongoose.model('Machgames', machgamesSchema);
