var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ethersSchema = require('../models/ethers');

module.exports = mongoose.model('Ethers', ethersSchema);
