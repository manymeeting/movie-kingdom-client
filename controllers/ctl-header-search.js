const DEFAULT_ZIPCODE = "95112"; // TODO get zipcode based on actual user location
var clientMessenger = require('../kafka/ClientMessenger');

module.exports.multiTypeSearch = function(req, res, next) {
	var searchType = req.query.searchType;
	switch(searchType) {
		case "MOVIE": 
			_searchMovie(req, res, next);
			return;
		case "ZIPCODE":
			_fetchSchedulesByZipCode(req, res, next);
			return;
		case "CITY":
			_searchCity(req, res, next);
			return;
	}
}

function _searchMovie(req, res, next) {
	var page = req.query.page ? req.query.page : 0;
	var searchValue = req.query.searchValue;
	clientMessenger.sendGET("/search-movies/"+ searchValue + "?page=" + page, "movies")
		.then(result => {
			console.log(result);
			res.render('pg-movie-list', {
				"title": 'Search Result', 
				"movies": result.content,
				"searchValue": searchValue,
				"searchType": "MOVIE"
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});

}

function _fetchSchedulesByZipCode(req, res, next) {
	var page = req.query.page ? req.query.page : 0;
	var searchValue = req.query.searchValue ? req.query.searchValue : DEFAULT_ZIPCODE;
	clientMessenger.sendGET("/schedules-zipcdoe/"+ searchValue + "?page=" + page, "schedules")
		.then(result => {
			console.log(result);
			res.render('pg-hall-list', {
				"title": 'Search Result', 
				"halls": result.content,
				"searchValue": searchValue,
				"searchType": "ZIPCODE",
				"locationValue": searchValue
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
}

function _searchCity(req, res, next) {
	// var page = req.query.page ? req.query.page : 0;
	// var searchValue = req.query.searchValue;
	// clientMessenger.sendGET("/search-cities/"+ searchValue + "?page=" + page, "cities")
	// 	.then(result => {
	// 		console.log(result);
	// 		res.render('pg-hall-list', {
	// 			"title": 'Search Result', 
	// 			"halls": result.content,
	// 			"searchValue": searchValue,
	// 			"searchType": "ZIPCODE",
	// 			"locationValue": searchValue
	// 		});
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		res.status(400).send();
	// 	});
}


