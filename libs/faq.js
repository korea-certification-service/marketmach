var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var FaqSchema = require('../models/faq');

module.exports = mongoose.model('Faq', FaqSchema);
