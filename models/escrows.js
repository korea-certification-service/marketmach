var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vtr = require('./vtrs');
var PointTrade = require('./pointTrades');

var escrowsSchema = new Schema({
    type: String, //deposit/withdraw/cancel
    itemId: String,
    vtr: Vtr,
    pointTrade: PointTrade,
    mach: Number, 
    point: Number,
    reqUser: String,
    regDate: String
});

module.exports = escrowsSchema;
