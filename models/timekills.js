var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timekillsSchema = new Schema({
    product: String,
    userTag: String,
    countryCode: String,
    phone: String,
    currencyType: String,
    amount: Number,
    price: Number,
    total_price: Number,
    postcode: String,
    address: String,
    regDate: String
});

module.exports = timekillsSchema;
