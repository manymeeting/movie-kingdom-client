


module.exports.getBuyTickets = function(req, res, next) {
    res.render('pg-buy-tickets');
};

module.exports.postBuyTickets = function(req, res, next) {
    console.log('lxr', 'post buy t');
    res.redirect('/purchases');
};