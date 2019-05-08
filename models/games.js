var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema({
   game_name : String,
   servers : [String],
});

module.exports = gamesSchema;
