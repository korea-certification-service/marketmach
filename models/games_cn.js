var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cn_region1 = require('./cn_region1');

var games_cnSchema = new Schema({
    game_id: String,
    game_name : String,
    region1 : [cn_region1]
});

module.exports = games_cnSchema;
