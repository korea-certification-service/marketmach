var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var BusinessContactSchema = require('../models/businessContects');

module.exports = mongoose.model('BusinessContacts', BusinessContactSchema);
