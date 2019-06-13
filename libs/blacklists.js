var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var blacklistsSchema = require('../models/blacklists');

module.exports = mongoose.model('blacklists', blacklistsSchema);
