var clientMessenger = require('../kafka/ClientMessenger');
let PathDict = require('../values/PathDictionary');
let API_METHOD = require('../values/constants').API_METHOD;

module.exports.renderDashBoard = function(req, res, next) {
	res.render('pg-admin-dashboard');	
}

module.exports.topMovieRevenues = function(req, res, next) {
	clientMessenger.send("/analytics/top10-movie-revenue", API_METHOD.GET, "analytics")
		.then((result) => {
			console.log(result.content);
			res.json(result.content);
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});	
}

module.exports.topHallRevenues = function(req, res, next) {
	clientMessenger.send("/analytics/top10-theater-revenue", API_METHOD.GET, "analytics")
		.then((result) => {
			console.log(result.content);
			res.json(result.content);
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});	
}