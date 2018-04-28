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
	var page = req.query.page ? req.query.page : 0;
	var searchValue = req.query.searchValue;
	
	var result = {
		  "content": [
		    {
		      "cityId": 7,
		      "cityName": "Carlsbad",
		      "state": "CA"
		    },
		    {
		      "cityId": 20,
		      "cityName": "Lancaster",
		      "state": "CA"
		    },
		    {
		      "cityId": 53,
		      "cityName": "Santa Monica",
		      "state": "CA"
		    }
		  ],
		  "totalPages": 1,
		  "totalElements": 3,
		  "last": true,
		  "numberOfElements": 3,
		  "sort": null,
		  "first": true,
		  "size": 20,
		  "number": 0
		};
	res.render('pg-city-list', {
				"title": 'Search Result', 
				"subTitle": "Search Result For: " + searchValue,
				"cities": result.content,
				"searchValue": searchValue,
				"searchType": "CITY",
				"locationValue": searchValue
			});
	// clientMessenger.sendGET("/search-cities/"+ searchValue + "?page=" + page, "cities")
	// 	.then(result => {
	// 		res.render('pg-city-list', {
	// 			"title": 'Search Result', 
	// 			"subTitle": "Search Result For: " + searchValue,
	// 			"cities": result.content,
	// 			"searchValue": searchValue,
	// 			"searchType": "CITY",
	// 			"locationValue": searchValue
	// 		});
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		res.status(400).send();
	// 	});
}


