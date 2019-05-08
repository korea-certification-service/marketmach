var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vtr = require('./vtrs');

var escrowsSchema = new Schema({
    type: String, //deposit/withdraw/cancel
    itemId: String,
    vtr: Vtr,
    mach: Number, 
    reqUser: String,
    regDate: String
});

module.exports = escrowsSchema;
