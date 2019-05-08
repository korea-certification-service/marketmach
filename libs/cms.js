var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cmsSchema = require('../models/cms');

module.exports = mongoose.model('Cms', cmsSchema);