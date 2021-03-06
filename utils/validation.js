const util = require('../utils/util');
const BitwebResponse = require('../utils/BitwebResponse');
const dbconfig = require('../config/dbconfig');

var userValidate = (req, res, next) => {
    let body = req. body;
    let valid = true;
    let msg = "valid";
    let country = dbconfig.country;

    if(valid != util.isNull(body.userTag)) {
        valid = util.isNull(body.userTag);        
        msg = "아이디를 입력해주세요.";
        if(country == "EN") {
            msg = "Please enter the ID.";
        }
        return _resultValidate(valid, msg, res, next);
    }

    if(valid != util.isNull(body.userName)) {
        valid = util.isNull(body.userName);
        msg = "이름을 입력해주세요.";
        if(country == "EN") {
            msg = "Please enter the name.";
        }
        return _resultValidate(valid, msg, res, next);
    }

    if(valid != util.checkStrNum(body.userTag)) {
        valid = util.checkStrNum(body.userTag);
        msg = "아이디는 4~12자, 영문/숫자/영문+숫자로 조합하여 사용하세요.";
        if(country == "EN") {
            msg = "Please enter 4 ~ 12 characters in english, numeric, english+numeric.";
        }
        return _resultValidate(valid, msg, res, next);
    }

    if(valid != util.isNull(body.password)) {
        valid = util.isNull(body.password);
        msg = "비밀번호를 입력해주세요.";
        if(country == "EN") {
            msg = "Please enter the password.";
        }
        return _resultValidate(valid, msg, res, next);
    }

    if(valid != util.checkPassword(body.password)) {
        valid = util.checkPassword(body.password);
        msg = "비밀번호는 6~20자의 영문+숫자 or 특수문자를 사용해 주세요.";
        if(country == "EN") {
            msg = "Please enter 6~20 characters in english+numeric or special characters.";
        }
        return _resultValidate(valid, msg, res, next);
    }

    if(valid != util.isNull(body.email)) {
        valid = util.isNull(body.email);
        msg = "이메일을 입력해주세요.";
        if(country == "EN") {
            msg = "Please enter the E-mail.";
        }
        return _resultValidate(valid, msg, res, next);
    }

    if(valid != util.checkEmail(body.email)) {
        valid = util.checkEmail(body.email);
        msg = "이메일 형식에 맞춰 입력해주세요.(예:example@marketmach.com)";
        if(country == "EN") {
            msg = "Please fill in your E-mail format. (example@marketmach.com)";
        }
        return _resultValidate(valid, msg, res, next);
    }

    next();
};

function _resultValidate(value, msg, res, next) {
    let bitwebResponse = new BitwebResponse();

    let result = {
        "result": value,
        "msg": msg
    };

    bitwebResponse.code = 200;
    bitwebResponse.data = result;
    res.status(200).send(bitwebResponse.create())
}

exports.userValidate = userValidate;