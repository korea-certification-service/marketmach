var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ethersSchema = new Schema({
    address: String,                    //user block chain address
    token_address_contract: String,     //bitweb block chain address
    total_coin: Number,                 //total user coin
    bonus: Number,                      // 보너스
    total_mach: Number,                 // 유저가 구매할 총 DAOIS
    historys: [String]                  // etherHistoryId List
});

module.exports = ethersSchema;
