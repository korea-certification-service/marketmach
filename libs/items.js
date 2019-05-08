var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var itemsSchema = require('../models/items');

module.exports = mongoose.model('Items', itemsSchema);
