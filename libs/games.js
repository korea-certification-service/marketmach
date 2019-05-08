var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var gamesSchema = require('../models/games');

module.exports = mongoose.model('Games', gamesSchema);
