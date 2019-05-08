var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var withdrawUsersSchema = require('../models/withdrawUsers');

module.exports = mongoose.model('WithdrawUsers', withdrawUsersSchema);
