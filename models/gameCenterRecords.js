var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameCenterRecordsSchema = new Schema({
    gameCenterId: String,
    service: String,
    lastStageLevel: Number,
    isLastStage: Boolean,
    userRecordInfo:[],
    deviceId: String
});

module.exports = gameCenterRecordsSchema;
