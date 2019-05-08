var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var games_cnSchema = require('../models/games_cn');

module.exports = mongoose.model('Games_cn', games_cnSchema);
