let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;
let PathDict = require('../values/PathDictionary');

module.exports.getBuyTickets = function(req, res, next) {
    res.render('pg-buy-tickets');
};

module.exports.postBuyTickets = function(req, res, next) {
    console.log('lxr', req.body);
    let buyInfo = req.body;
    buyInfo.scheduleId = 45;
    clientMessenger.send("/order", API_METHOD.POST, "orders", buyInfo)
        .then(result => {
            console.log('lxr', result);
            let orderInfo = {
                userId: result.order.user.userId,
                orderId: result.order.orderId
            };
            let url = "/pay-order/" + orderInfo.userId + "/" + orderInfo.orderId;
            return clientMessenger.send(url, API_METHOD.PUT, "orders", orderInfo);
        })
        .then(result => {
            console.log('lxr', result);
            res.redirect(PathDict.GET.USER_ORDERS);
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
};