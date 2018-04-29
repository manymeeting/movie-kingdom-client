var clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;

module.exports.hallDetails = function(req, res, next) {
	// get hall basic info and schedules
	var hallID = req.query.id;
	var page = req.query.page ? req.query.page : 0;
	var hallMovies = [];
	var hallBasicInfo = {};
	clientMessenger.send("/analytics/theater-revenue/" + hallID, API_METHOD.GET, "analytics")
		.then((result) => {
			hallBasicInfo = result.theater;
			return clientMessenger.send("/schedules-theater/" + hallID, API_METHOD.GET, "schedules");
		})
		.then(result => {
			console.log(result);
			res.render('pg-hall-details', {
				"title": 'Hall Details', 
				"hallBasicInfo": hallBasicInfo,
				"hallMovies": result.content
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
	
}


