var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cn_region1Schema = new Schema({
    id: String,
    name : String,
});

module.exports = cn_region1Schema;
