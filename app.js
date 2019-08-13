var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var language = require('./utils/language');

var indexRouter = require('./routes/index');
var sellRouter = require('./routes/sells');
var buyRouter = require('./routes/buys');
var etcSellRouter = require('./routes/etc-sells');
var etcBuyRouter = require('./routes/etc-buys');
var otcBuyRouter = require('./routes/otc-buys');
var otcSellRouter = require('./routes/otc-sells');
var usersRouter = require('./routes/users');
var ethersRouter = require('./routes/ethers');
var vtrsRouter = require('./routes/vtrs');
var tradePointRouter = require('./routes/pointTrades');
var gamesRouter = require('./routes/games');
var itemsRouter = require('./routes/items');
var coinsRouter = require('./routes/coins');
var coinHistorysRouter = require('./routes/coinHistorys');
var pointsRouter = require('./routes/points');
var pointHistorysRouter = require('./routes/pointHistorys');
var accountsRouter=require('./routes/accounts');
var notificationsRouter = require('./routes/notifications');
var myPageRouter=require('./routes/myPages');
var chartRouter = require('./routes/charts');
var smsRouter = require('./routes/sms');
var agreementRouter = require('./routes/agreements');
var faqRouter = require('./routes/faq');
var countryCodeRouter = require('./routes/countryCodes');
var batchRouter = require('./routes/batch');
var communityRouter = require('./routes/community');
var noticeRouter = require('./routes/notices');
var customerCenterRouter = require('./routes/customerCenter');
var eventsRouter = require('./routes/events');
var supportsRouter = require('./routes/supports');
var howtoRouter = require('./routes/howto');
var categoriesRouter = require('./routes/categories');
var oppositionRouter = require('./routes/oppositions');
var personalRouter = require('./routes/personals');
var gameCenterRouter = require('./routes/gameCenter');
var exchangeRouter = require('./routes/exchange');
var shoppingRouter = require('./routes/shopping');
var testRouter = require('./routes/test');
var gameStationRouter = require('./routes/gameStation');
var escrowRouter = require('./routes/escrows');
var kycRouter = require('./routes/kyc');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(language);

// app.use(passport.session());

app.use(session({
    secret: 'bitweb123', //Only enable https
    name: 'bitweb_sid',
    // store: new MongoStore({ url: DB_URI}), // connect-mongo session store
    proxy: false,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        //maxAge: 1000 * 60 * 60 // 쿠키 유효기간 하루 (24시간) * 30일 //현재 무기한
        expires: 1000 * 60 * 60 // 쿠키 유효기간 (1시간)
    }
}));

// app.use((req, res, next) => {
//     if (req.cookies.bitweb_sid && !req.session.id) {
//         res.clearCookie('bitweb_sid');
//     }
//     next();
// });

/**
 * 외부 라이브러리는 가급적 npm으로 install 한 후, app.use를 사용하여 라이브러리를 include한다.
 * 현재 사용중인 외부 라이브러리 : bootstrap, charts.js
 */

app.use("/language",express.static(__dirname+'/public/language'));
app.use("/css",express.static(__dirname+'/public/css'));
app.use("/javascript",express.static(__dirname+'/public/javascript'));
app.use("/js",express.static(__dirname+'/public/js'));
app.use("/img",express.static(__dirname+'/public/img'));

app.use("/chart",express.static(__dirname + '/node_modules/chart.js'));
// use bootstrap
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/bootstrap_css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// poper
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/select_css', express.static(__dirname + '/node_modules/bootstrap-select/dist/css'));
app.use('/select', express.static(__dirname + '/node_modules/bootstrap-select/dist/js'));

// material-icons
app.use('/material-icons', express.static(__dirname + '/node_modules/material-design-icons/iconfont'));

// use alert
app.use('/alert',express.static(__dirname+'/node_modules/sweetalert/dist'));
// use charts.js
app.use('/chart', express.static(__dirname + '/node_modules/charts.js/dist'));

// use font-awesome
app.use('/font-awesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/css')); // redirect CSS font-awesome
app.use('/webfonts', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/webfonts')); // redirect CSS font-awesome

app.use('/blockchain', express.static(__dirname + '/blockchain')); // redirect JS jQuery

// roboto
app.use("/robots.txt",express.static(__dirname+'/public/static/robots.txt'));

//language
app.get('/KR',function(req,res){
    //res.cookie('lang','bitweb_ko');
    res.redirect('https://ko.marketmach.com');
});
app.get('/CN',function(req,res){
    //res.cookie('lang','bitweb_ch');
    res.redirect('https://cn.marketmach.com');
});

//front page
app.use('/', indexRouter);
app.use('/sells', sellRouter);
app.use('/etc-sells', etcSellRouter);
app.use('/etc-buys', etcBuyRouter);
app.use('/otc-buys', otcBuyRouter);
app.use('/otc-sells', otcSellRouter);
app.use('/buys', buyRouter);
app.use('/sample', indexRouter);
app.use('/accounts', accountsRouter);
app.use('/myPages', myPageRouter);
app.use('/agreements',agreementRouter);
app.use('/faq',faqRouter);
app.use('/community',communityRouter);
app.use('/notices',noticeRouter);
app.use('/customerCenter', customerCenterRouter);
app.use('/supports', supportsRouter);
app.use('/howto', howtoRouter);
app.use('/shopping', shoppingRouter); // btoc shopping
app.use('/test', testRouter); // only test module
app.use('/gameStation', gameStationRouter); // only test module


//backend API
let version = "/v1";
app.use(version + '/users', usersRouter);
app.use(version + '/ethers', ethersRouter);
app.use(version + '/vtrs', vtrsRouter);
app.use(version + '/tradePoints', tradePointRouter);
app.use(version + '/games', gamesRouter);
app.use(version + '/items', itemsRouter);
app.use(version + '/coins', coinsRouter);
app.use(version + '/coins/historys', coinHistorysRouter);
app.use(version + '/points', pointsRouter);
app.use(version + '/point/historys', pointHistorysRouter);
app.use(version + '/notifications/email', notificationsRouter);
app.use(version + '/charts', chartRouter);
app.use(version + '/sms/', smsRouter);
app.use(version + '/faq',faqRouter);
app.use(version + '/countryCodes',countryCodeRouter);
app.use(version + '/batches',batchRouter);
app.use(version + '/community',communityRouter);
app.use(version + '/notices',noticeRouter);
app.use(version + '/customerCenter',customerCenterRouter);
app.use(version + '/events', eventsRouter);
app.use(version + '/categories', categoriesRouter);
app.use(version + '/opposition', oppositionRouter);
app.use(version + '/personal', personalRouter);
app.use(version + '/gameCenter', gameCenterRouter);
app.use(version + '/exchange', exchangeRouter);
app.use(version + '/escrows', escrowRouter);
app.use(version + '/kycs', kycRouter);

let v2IndexRouter = require('./routes/v2/index');
let v2ItemRouter = require('./routes/v2/items');

let version2 = '/v2';
app.use(version2 + '/', v2IndexRouter);
app.use(version2 + '/items', v2ItemRouter);

let dbconfig = require('./config/dbconfig');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    // render the error page
    res.status(err.status || 500);

    if (err.status === 404) {
    } else {
    }

    if(dbconfig.country == "KR" || dbconfig.country == "POINT") {
        res.render('v2/error/error', {
            userId: req.session.userId,
            coinId: req.session.coinId,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            authPhone: req.session.authPhone,
            title: 'Error'});
    } else {
        res.render('v2_en/error/error', {
            userId: req.session.userId,
            coinId: req.session.coinId,
            usePoint:dbconfig.usePoint,
            useBlockchain:dbconfig.useBlockchain,
            authPhone: req.session.authPhone,
            title: 'Error'});
    }
});

// let bitcore_lib = require('./utils/bitcore_lib');
// bitcore_lib.send();

module.exports = app;
