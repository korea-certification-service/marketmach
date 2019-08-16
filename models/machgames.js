var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machgamesSchema = new Schema({
    gameNameKr : String,
    gameNameEn : String,
    coinName : String,
    titleImgUrl: String, 
    iconImgUrl: String,
    regDate: String,
    mach_rate: Number,
    gamecoin_rate: Number,
    issueAmount: Number
});

module.exports = machgamesSchema;
