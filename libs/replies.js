var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ReplySchema = require('../models/replies');

module.exports = mongoose.model('Reply', ReplySchema);
