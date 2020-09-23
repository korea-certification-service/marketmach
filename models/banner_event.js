var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var banner_eventSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    banner_name: String,
    banner_desc: String,
    banner_img_pc: String,
    banner_img_mob: String,
    link: String,
    view_yn: String
});

module.exports = banner_eventSchema;
