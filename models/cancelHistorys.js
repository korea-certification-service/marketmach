var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vtr = require('./vtrs');
var Item = require('./items');
var PointTrade = require('./pointTrades');

var cancelHistorysSchema = new Schema({
    vtr: Vtr,
    pointTrade:PointTrade,
    item: Item,
    from_userId: String,
    to_userId: String,
    refund: Boolean,
    status: String,
    regDate: String
});

module.exports = cancelHistorysSchema;
