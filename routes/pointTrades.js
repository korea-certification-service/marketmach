var express = require('express');
var router = express.Router();
var controllerTradePoints = require('../controllers/pointTrades')
var BitwebResponse = require('../utils/BitwebResponse')

router.get('/:tradePointId', function (req, res, next) {
    // res.send('respond with a resource');

    var bitwebResponse = new BitwebResponse();
    if (req.params.tradePointId != null) {
        controllerTradePoints.get(req)
            .then(result => {
                bitwebResponse.code = 200;
                bitwebResponse.data = result;
                res.status(200).send(bitwebResponse.create())
            }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }
});

router.get('/user/:userId', function(req, res, next) {
    let pageIdx = req.query.pageIdx;
    let perPage = req.query.perPage;
    let userId = req.params.userId;
    let country = req.session.country;

    let data = {};
    data['userId'] = userId;
    data['country'] = country;
    if (pageIdx != undefined) data['pageIdx'] = parseInt(pageIdx);
    if (perPage != undefined) data['perPage'] = parseInt(perPage);

    var bitwebResponse = new BitwebResponse();
   if(req.params.userId != null) {
       controllerTradePoints.getItemIdsByUserId(data)
           .then(tradePoints => {
               let itemIds = [];
               for(var i in tradePoints) {
                   itemIds.push(tradePoints[i].item._id);
               }
               console.log("itemIds : ", itemIds);
               var controllerItems = require('../controllers/items')

               controllerItems.getItemsByIds(country, itemIds)
                   .then(result => {
                       bitwebResponse.code = 200;
                       bitwebResponse.data = result;
                       res.status(200).send(bitwebResponse.create())
                   }).catch((err) => {
                   console.error('err=>', err)
                   bitwebResponse.code = 500;
                   bitwebResponse.message = err;
                   res.status(500).send(bitwebResponse.create())
               })
           }).catch((err) => {
           console.error('err=>', err)
           bitwebResponse.code = 500;
           bitwebResponse.message = err;
           res.status(500).send(bitwebResponse.create())
       })
   }
});

router.post('/', function (req, res, next) {

    //from_userId = 5bd29ff159ceaf6c52424fef
    //to_userId = 5bd2a05459ceaf6c52424ff0
    //itemId = 5bd2a0c6ab4cf21524d6f734
    let sampleJson =
        {
            "itemId": "1234",
            "pointId": "from_userId의 point ID",
            "trade": "buy/sell",
            "from_userId": "1234", // 아이템 판매자
            "to_userId": "5678", // 아이템 구매자
            "point": 1000
        }

    if (req.body.itemId != null) {
        let data = {}
        let itemId = req.body.itemId;
        let country = req.session.country;

        var bitwebResponse = new BitwebResponse();
        let controllerItems = require('../controllers/items');
        let controllUsers = require('../controllers/users');

        if(req.body.trade == "sell") {
            controllUsers.getByUserTag(country, req.body.from_userId)
                .then(user => {
                    req.body.pointId = user.pointId;
                    req.body.from_userId = user._id;
                    req.body.to_userId = req.session.userId;

                    controllUsers.getById(country, req.body.to_userId)
                        .then(to_user => {
                            let bitwebPoints = require('../controllers/points');
                            let pointId = to_user._doc.pointId;
                            bitwebPoints.getByPointId(country, pointId)
                                .then(points => {
                                    controllerItems.getByItemId(country, itemId, "", "")
                                        .then(item => {
                                            let user_point = points.total_point;
                                            let point = item._doc.point;
                                            user_point = user_point - point;
                                            let point_json = {"total_point": user_point}
                                            bitwebPoints.updateTotalPoint(country, pointId, point_json)
                                                .then(() => {
                                                    delete req.body['itemId'];
                                                    req.body['item'] = item;
                                                    let status = 2; //point 거래 중

                                                    controllerTradePoints.create(req, itemId)
                                                        .then(result => {
                                                            bitwebResponse.code = 200;
                                                            bitwebResponse.data = result;
                                                            res.status(200).send(bitwebResponse.create())
                                                        }).catch((err) => {
                                                        console.error('err=>', err)
                                                        bitwebResponse.code = 500;
                                                        bitwebResponse.message = err;
                                                        res.status(500).send(bitwebResponse.create())
                                                    })
                                                })
                                        })
                                })
                        })
                })
        } else {
            controllUsers.getById(country, req.session.userId)
                .then((fromUser) => {
                    req.body.from_userId = req.session.userId;
                    req.body.pointId = fromUser.pointId;

                    controllUsers.getByUserTag(country, req.body.to_userId)
                        .then(user => {
                            req.body.to_userId = user._id;
                            let bitwebPoints = require('../controllers/points');
                            let pointId = user._doc.pointId;
                            bitwebPoints.getByPointId(country, pointId)
                                .then(points => {
                                    controllerItems.getByItemId(country, itemId, "", "")
                                        .then(item => {
                                            let user_point = points.total_point;
                                            let point = item._doc.point;
                                            user_point = user_point - point;
                                            let point_json = {"total_point": user_point}
                                                bitwebPoints.updateTotalPoint(country, pointId, point_json)
                                                .then(() => {
                                                    delete req.body['itemId'];
                                                    req.body['item'] = item;
                                                    let status = 2; //point 거래 중

                                                    controllerTradePoints.create(req, itemId)
                                                        .then(result => {
                                                            bitwebResponse.code = 200;
                                                            bitwebResponse.data = result;
                                                            res.status(200).send(bitwebResponse.create())
                                                        }).catch((err) => {
                                                        console.error('err=>', err)
                                                        bitwebResponse.code = 500;
                                                        bitwebResponse.message = err;
                                                        res.status(500).send(bitwebResponse.create())
                                                    })
                                                })
                                        });
                                })
                        })
                })
        }
    }
});

router.put('/:tradePointId/trade/:tradeType', function (req, res, next) {

    // "vtrId": "5bc9a10c8f8b950ffe068dfa"
    let sampleJson =
        {
            "status": true
        }

    var bitwebResponse = new BitwebResponse();
    if (req.params.tradePointId != null) {

        controllerTradePoints.updateStatus(req)
            .then((result) => {
                let data = {}
                bitwebResponse.code = 200;
                bitwebResponse.data = result;
                res.status(200).send(bitwebResponse.create())
            }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }
})


router.delete('/:tradePointId/:tradeType', function (req, res, next) {

    var bitwebResponse = new BitwebResponse();
    if (req.params.tradePointId != null) {
        controllerTradePoints.remove(req)
            .then(result => {
                bitwebResponse.code = 200;
                bitwebResponse.data = result;
                res.status(200).send(bitwebResponse.create())
            }).catch((err) => {
            console.error('err=>', err)
            bitwebResponse.code = 500;
            bitwebResponse.message = err;
            res.status(500).send(bitwebResponse.create())
        })
    }
})

module.exports = router;
