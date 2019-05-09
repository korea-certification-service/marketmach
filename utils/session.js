var sessionChecker = (req, res, next) => {
    console.log('sessionID =>', req.sessionID);
    console.log('session.userTag =>', req.session.userTag);
    console.log("session.active =>",req.session.active);
    console.log('session.userId =>', req.session.userId);

    if (req.session.userTag) {

        //로그인한 경우
        if(req.session.active===false){
            //이메일인증 안한 경우
            //res.redirect("/emailAuth");
            next();
        }else{
            //이메일 인증 한 경우
            //res.redirect("/myPages/myInfo");
            res.redirect('/main');
        }
    }else {
        //로그인 안한 경우
        if(req.originalUrl != undefined) {
            req.session.originUrl = req.originalUrl;
        }
        next();
    }
};
var sessionChecker2 = (req, res, next) => {
    console.log('sessionID =>', req.sessionID);
    console.log('session.userTag =>', req.session.userTag);
    console.log("session.active =>",req.session.active);
    console.log('session.userId =>', req.session.userId);

    if (req.session.userTag) {
        //로그인한 경우
        if(req.session.active===false){
            //이메일인증 안한 경우
            //res.redirect("/emailAuth");
            next();
        }else{
            //이메일 인증 한 경우
            next();
        }
    }else {
        //로그인 안한 경우
        if(req.originalUrl != undefined) {
            req.session.originUrl = req.originalUrl;
        }
        //res.redirect("/login");
        res.render('v2/login/login', {title: 'Bitweb Main'});
        // if(req.cookies.orange__F == undefined) {
        //     res.render('login/login', {title: 'Bitweb Main'});
        // } else {
        //     next();
        // }
    }
};

var sessionChecker3 = (req, res, next) => {
    console.log('sessionID =>', req.sessionID);
    console.log('session.userTag =>', req.session.userTag);
    console.log("session.active =>",req.session.active);
    console.log('session.userId =>', req.session.userId);

    if (req.session.userTag) {
        //로그인 한 경우
        next();
    }else {
        //로그인 안한 경우
        res.redirect("/chatbot/login");
    }
};

var adultChecker = (req, res, next) => {
    console.log('sessionID =>', req.sessionID);
    console.log('session.userTag =>', req.session.userTag);
    console.log("session.active =>",req.session.active);
    console.log('session.userId =>', req.session.userId);

    if (req.session.userTag) {
        //로그인한 경우
        if(req.session.active===false){
            //이메일인증 안한 경우
            //res.redirect("/emailAuth");
            next();
        } else if(req.session.teenager==true&&req.session.country=="KR"){
            //성인인증 안한 경우
            //res.redirect("/adults");
            next();
        } else if(req.session.teenager == false){
            res.redirect('/main');
        } else{
            //이메일 인증 한 경우
            next();
        }
    }else {
        //로그인 안한 경우
        if(req.originalUrl != undefined) {
            req.session.originUrl = req.originalUrl;
        }
        //res.redirect("/login");
        res.render('v2/login/login', {title: 'Bitweb Main'});
        // if(req.cookies.orange__F == undefined) {
        //     res.render('login/login', {title: 'Bitweb Main'});
        // } else {
        //     next();
        // }
    }
};
var emailAuthChecker = (req, res, next) => {
    console.log('sessionID =>', req.sessionID);
    console.log('session.userTag =>', req.session.userTag);
    console.log("session.active =>",req.session.active);
    console.log('session.userId =>', req.session.userId);

    if (req.session.userTag) {
        //로그인한 경우
        if(req.session.active===false){
            //이메일인증 안한 경우
            next();
        }else{
            //이메일 인증 한 경우
            res.redirect("/myPages/myInfo");
        }
    }else {
        //로그인 안한 경우
        res.redirect("/login");
        // if(req.cookies.orange__F == undefined) {
        //     res.redirect("/login");
        // } else {
        //     next();
        // }

    }
};
var registerSuccessChecker = (req, res, next) => {
    console.log('sessionID =>', req.sessionID);
    console.log('session.userTag =>', req.session.userTag);
    console.log("session.active =>",req.session.active);
    console.log('session.userId =>', req.session.userId);

    if (req.session.userTag) {
        //로그인한 경우
        next()
    }else {
        //로그인 안한 경우
        res.redirect("/login");
    }
};

var originUrlYn = (req, res, next) => {
    if (req.session.originUrl == undefined) {
        next();
    } else {
        res.redirect(req.session.originUrl);
    }
};

exports.sessionChecker=sessionChecker;
exports.sessionChecker2=sessionChecker2;
exports.sessionChecker3 = sessionChecker3;
exports.adultChecker=adultChecker;
exports.emailAuthChecker=emailAuthChecker;
exports.registerSuccessChecker=registerSuccessChecker;
exports.originUrlYn = originUrlYn;