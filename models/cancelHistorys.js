var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vtr = require('./vtrs');
var Item = require('./items');

var cancelHistorysSchema = new Schema({
    vtr: Vtr,
    item: Item,
    from_userId: String,
    to_userId: String,
    refund: Boolean,
    status: String,
    regDate: String
});

module.exports = cancelHistorysSchema;
