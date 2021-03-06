var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coinHistorysSchema = new Schema({
    extType: String,
    coinId: String,
    category: String,          
    status: String,
    currencyCode: String,
    price: Number,
    amountCurrency: String,
    amount: Number,
    mach: Number,
    fee: Number,
    memo: String,
    regDate: String,
    game: String
});


module.exports = coinHistorysSchema;
