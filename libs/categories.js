var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var categoriesSchema = require('../models/categories');

module.exports = mongoose.model('Categories', categoriesSchema);
