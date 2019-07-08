var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machgamesSchema = new Schema({
    gameNameKr : String,
    gameNameEn : String,
    coinName : String,
    titleImgUrl: String, 
    iconImgUrl: String,
    regDate: String
});

module.exports = machgamesSchema;
