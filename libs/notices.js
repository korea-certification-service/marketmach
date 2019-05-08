var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var NoticeSchema = require('../models/notices');

module.exports = mongoose.model('Notices', NoticeSchema);
