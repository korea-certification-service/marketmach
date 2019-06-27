var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameCoinHistorysSchema = new Schema({
    userId: String,
    gameCenterId:String,
    service: String, 
    type: String,                //deposit, withdraw
    exchangeType: String,        //mach, gameCoin
    fromCurrencyCode: String,
    fromPrice: Number,
    toCurrencyCode: String,
    toPrice: Number,
    rate: Number,
    fee: Number,
    regDate: String
});

module.exports = GameCoinHistorysSchema;
