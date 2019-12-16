function formatDate (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes(),
        secounds = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.toString().length < 2) hour = '0' + hour;
    if (minutes.toString().length < 2) minutes = '0' + minutes;
    if (secounds.toString().length < 2) secounds = '0' + secounds;

    let getDate = [year, month, day].join('/');
    let getTime = [hour, minutes, secounds].join(':');
    return getDate + " " + getTime;
}

function formatDate2 (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes(),
        secounds = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.toString().length < 2) hour = '0' + hour;
    if (minutes.toString().length < 2) minutes = '0' + minutes;
    if (secounds.toString().length < 2) secounds = '0' + secounds;

    let getDate = [year, month, day].join('');
    let getTime = [hour, minutes, secounds].join('');
    return getDate + getTime;
}

function getUnixTime(date) {
    var d = new Date(date);
    return d.getTime() / 1000;
}

function dateDiff(_date1, _date2) {
    var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
    var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);
 
    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
 
    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));
 
    return diff;
}

function checkAdult (start_date, to_date) {
    var s_d = new Date(start_date);
    var e_d = new Date(to_date);
    
    var s_year = s_d.getFullYear();
    var e_year = e_d.getFullYear();
    
    var diff = e_year - s_year; 
    //console.log(s_year, e_year, diff);
    return diff;
}

function getEnvLocale(env) {
    env = env || process.env;

    return env;
    // return env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}

function calculateDate (date, interval_type, interval) {
    var d = new Date(date),
        month = (interval_type == "M" ? '' + (d.getMonth() + 1 + interval) :  '' + (d.getMonth() + 1)),
        day = (interval_type == "D" ? '' + (d.getDate() + interval) :  '' + d.getDate()),
        year = d.getFullYear() + (interval_type == "Y" ? interval : ""),
        hour = d.getHours() + (interval_type == "h" ? interval : ""),
        minutes = d.getMinutes() + (interval_type == "m" ? interval : ""),
        secounds = d.getSeconds() + (interval_type == "s" ? interval : "");

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.toString().length < 2) hour = '0' + hour;
    if (minutes.toString().length < 2) minutes = '0' + minutes;
    if (secounds.toString().length < 2) secounds = '0' + secounds;

    let getDate = [year, month, day].join('/');
    let getTime = [hour, minutes, secounds].join(':');
    return getDate + ' ' + getTime;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function makeNumber() {
    var text = "";
    var possible = "0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function makeToken()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function isNull(value) {
    if(value == "") {
        return false;
    }
    return true;
}

function checkStrNum(value) {
    let idReg = /^[A-Za-z0-9]{4,12}$/g;
    if( !idReg.test( value ) ) {
        return false;
    }
    return true;
}

function checkPassword(value) {
    let idReg = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    if( !idReg.test( value ) ) {
        return false;
    }
    return true;
}

function checkEmail(value) {
    let idReg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if( !idReg.test( value ) ) {
        return false;
    }
    return true;
}

function initParam(req, dbconfig) {
    let param = {
        itemId: req.query.itemId,
        userId: req.session.userId,
        userTag:req.session.userTag,
        coinId: req.session.coinId,
        pointId: req.session.pointId,
        userName: req.session.userName,
        authPhone: req.session.authPhone,
        kyc: req.session.kyc,
        usePoint:dbconfig.usePoint,
        useBlockchain:dbconfig.useBlockchain,
        country:req.session.country,
        callbackUrl: dbconfig.ontology.callbackUrl,
        category: req.query.category,
        game_name: req.query.game_name, 
        game_server: req.query.game_server,
        trade_type: req.query.trade_type, 
        type: req.query.type == undefined ? req.params.type : req.query.type, 
        title: req.query.title, 
        status: req.query.status,
        id: req.params.id,
        pageIdx: req.query.pageIdx,
        communityId: req.params.communityId,
        category: req.query.category,
        category1: req.query.category1, 
        category2: req.query.category2,
        item_title: req.query.item_title,
        bitberry_token: req.session.bitberry_token,
        btc_fee: dbconfig.fee.coin.btc.deposit,
        ether_fee: dbconfig.fee.coin.ether.deposit,
        mach_fee: dbconfig.fee.coin.mach.deposit,
        ont_fee: dbconfig.fee.coin.ont.deposit,
        ong_fee: dbconfig.fee.coin.ong.deposit,
        toAddress:dbconfig.ontology.address,
        fromAddress: req.session.ontId == undefined ? "" : req.session.ontId.replace('did:ont:',''),
        fee: dbconfig.fee.point.deposit,
        fee_withdraw: dbconfig.fee.point.withdraw,
        happyMoneyFee: dbconfig.fee.happymoney.deposit,
        noticeId: req.query.noticeId,
        eventId: req.params.eventId,
        oppositionId: req.params.oppositionId,
        personalId: req.params.personalId,
        productId: req.params.productId,
        contractAddress_finalTransaction: dbconfig.ontology.contractAddress_finalTransaction
    }
    return param;
}

function initVtrRoomParam(country, itemId, userTag, buyerTag, sellerTag, chatbot_vtr_url, roomToken) {
    let param = {
        country: country,
        itemId: itemId,
        userTag: userTag,
        buyerTag: buyerTag,
        sellerTag: sellerTag,
        chatbot_vtr_url: chatbot_vtr_url,
        roomToken: roomToken
    }
    return param;
}

exports.formatDate = formatDate;
exports.formatDate2 = formatDate2;
exports.getEnvLocale = getEnvLocale;
exports.numberWithCommas = numberWithCommas;
exports.makeToken = makeToken;
exports.calculateDate = calculateDate;
exports.isNull = isNull;
exports.checkStrNum = checkStrNum;
exports.checkPassword = checkPassword;
exports.checkEmail = checkEmail;
exports.checkAdult = checkAdult;
exports.makeNumber = makeNumber;
exports.dateDiff = dateDiff;
exports.getUnixTime = getUnixTime;
exports.initParam = initParam;
exports.initVtrRoomParam = initVtrRoomParam;