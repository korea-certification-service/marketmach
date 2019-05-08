var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var CommunitySchema = require('../models/communities');

module.exports = mongoose.model('Community', CommunitySchema);
