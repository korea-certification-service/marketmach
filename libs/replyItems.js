var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ReplyItemsSchema = require('../models/replyItems');

module.exports = mongoose.model('ReplyItems', ReplyItemsSchema);
