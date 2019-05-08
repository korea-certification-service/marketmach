var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var banksSchema = new Schema({
    bank: String,               // 은행 이름
    bank_account: String,       // 은행 계좌
    point: String,
});

module.exports = banksSchema;
