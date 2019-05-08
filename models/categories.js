var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
   category1 : String,
   category2 : [String],
});

module.exports = categoriesSchema;
