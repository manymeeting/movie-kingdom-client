var clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;

module.exports.userOrderList = function(req, res, next) {
	// get all movies and genres
	var page = req.query.page ? req.query.page : 0;

	// TODO use userid in session only, for security
	var userId = req.query.userId ? req.query.userId : req.session.user.userId;
	clientMessenger.send("/orders?userId="+ userId , API_METHOD.GET, "orders")
		.then(result => {
			console.log(result);
			res.render('pg-user-order-list', {
				"title": 'Orders',
				"orders": result.content
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
	
}