var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var etherHistorysSchema = new Schema({
    etherId: String,
    coin: Number,                   // 구입한 ETH
    status: Boolean,                // false:거래완료 이전, true:거래완료
    regDate: String,                // instance가 만들어 졌을때 시간
    completeDate: String,            // 거래완료 되었을때 시간
    bonus: Number,                  // 보너스
    mach: Number                   // 받을 MACH
});

module.exports = etherHistorysSchema;
