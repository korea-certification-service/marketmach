var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pointHistorysSchema = new Schema({
    extType: String,
    pointId: String,
    category: String,          
    status: String,
    currencyCode: String,
    amountCurrency: String,
    amount: Number,
    point: Number,
    fee: Number,
    regDate: String  
});

module.exports = pointHistorysSchema;
