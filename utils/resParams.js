const resParams = {
    userId: req.session.userId, coinId: req.session.coinId,userTag:req.session.userTag,
    pointId: req.session.pointId,
    category: req.query.category, game_name: req.query.game_name, game_server: req.query.game_server
    , trade_type: req.query.trade_type, type: req.query.type, title: req.query.title, status:req.query.status,
    usePoint:dbconfig.usePoint,
    authPhone: req.session.authPhone,
    useBlockchain:dbconfig.useBlockchain
}

module.exports = resParams;