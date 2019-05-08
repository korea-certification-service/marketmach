var i18n=require('i18n');
var path = require('path');
const iplocate = require("node-iplocate");
const dbconfig = require('../config/dbconfig');

i18n.configure({
    locales:['bitweb_ko','bitweb_en','bitweb_jp','bitweb_ch'],
    directory: path.join(__dirname,'..','/public/language'),
    defaultLocale:'bitweb_ko',
    cookie:'lang',
    objectNotation:true
});

module.exports=function(req,res,next){
    i18n.init(req,res);
    res.locale.__=res.__;

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let testIp = "13.115.84.169" //JP
    // iplocate(ip).then(function(results) {
        let countryCode = dbconfig.country;
        console.log("countryCode: " + countryCode);
        
        if (countryCode == null) i18n.setLocale('bitweb_ko');
        if (countryCode == "KR") i18n.setLocale('bitweb_ko');
        if (countryCode == "EN") i18n.setLocale('bitweb_en');
        if (countryCode == "CN") i18n.setLocale('bitweb_ch');
        if (countryCode == "JP") i18n.setLocale('bitweb_jp');

        console.log('getLocale =>', i18n.getLocale())
        return next();
    // });
};
