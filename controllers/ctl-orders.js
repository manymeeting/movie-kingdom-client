var clientMessenger = require('../kafka/ClientMessenger');
var queryString = require('query-string');
let API_METHOD = require('../values/constants').API_METHOD;

module.exports.userOrderList = function(req, res, next) {
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

module.exports.adminOrderList = function(req, res, next) {
	var queryStr = queryString.stringify(req.query);
	
	clientMessenger.send("/orders?"+ queryStr , API_METHOD.GET, "orders")
		.then(result => {
			console.log(result);
			res.render('pg-admin-order-list', {
				"title": 'Admin Orders',
				"orders": result.content
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
}


module.exports.ordersOnMovieDetails = function(req, res, next) {
	var page = req.query.page ? req.query.page : 0;
	var movieID = req.query.id;
	var movie = {};
	var movieAnalytics = {};
	clientMessenger.send("/analytics/movie-revenue/" + movieID, API_METHOD.GET, "analytics")
		.then(result => {
			movieAnalytics = result.movie;
		})
		.then(() => {
			return clientMessenger.send("/movie/" + movieID, API_METHOD.GET, "movies");
		})
		.then(result => {
			movie = result.movie;
		})
		.then(() => {
			return clientMessenger.send("/orders?movieId="+ movieID , API_METHOD.GET, "orders")
		})
		.then(result => {
			console.log(result);
			res.render('movie-dt-orders', {
				"title": 'Movie Orders',
				"movie": movie,
				"movieAnalytics": movieAnalytics,
				"movieOrders": result.content
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});	
}