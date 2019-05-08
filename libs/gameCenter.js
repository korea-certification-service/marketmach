var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var gameCenterSchema = require('../models/gameCenter');

module.exports = mongoose.model('GameCenter', gameCenterSchema);
