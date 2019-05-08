var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReplySchema = new Schema({
    communityId: String,
    replyId: String,
    content: String,
    regDate: String,
    reporter: String,
    recommandCount: Number,
    nottobeCount: Number
});

module.exports = ReplySchema;
