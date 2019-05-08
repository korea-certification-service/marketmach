var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currencySchema = new Schema({
    type: String,
    data: Object,               // 데이터
    regDate: String
});

module.exports = currencySchema;
