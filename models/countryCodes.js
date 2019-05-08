var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countryCodesSchema = new Schema({
    country_kr: String,
    country_en: String,
    country_code: String
});

module.exports = countryCodesSchema;
