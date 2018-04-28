const DEFAULT_ZIPCODE = "95112"; // TODO get zipcode based on actual user location
var clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;

module.exports.multiTypeSearch = function(req, res, next) {
	var searchType = req.query.searchType;
	switch(searchType) {
		case "MOVIE": 
			_searchMovieByName(req, res, next);
			return;
		case "ZIPCODE":
			_fetchSchedulesByZipCode(req, res, next);
			return;
		case "CITY":
			_searchCity(req, res, next);
			return;
		case "CITY_ID":
			_fetchSchedulesByCityID(req, res, next);
	}
}

function _searchMovieByName(req, res, next) {
	var page = req.query.page ? req.query.page : 0;
	var searchValue = req.query.searchValue;
	var genres = [];
	clientMessenger.send("/genres", API_METHOD.GET, "movies")
		.then((result) => {
			genres = result.content;
			return clientMessenger.send("/search-movies/"+ searchValue + "?page=" + page, API_METHOD.GET, "movies")
		})
		.then(result => {
			console.log(result);
			res.render('pg-movie-list', {
				"title": 'Search Result',
				"genres": genres,
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
	clientMessenger.send("/schedules-zipcdoe/"+ searchValue + "?page=" + page, API_METHOD.GET, "schedules")
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

function _fetchSchedulesByCityID(req, res, next){
	var page = req.query.page ? req.query.page : 0;
	var searchValue = req.query.searchValue ? req.query.searchValue : DEFAULT_ZIPCODE;
	var cityName = req.query.cityName ? req.query.cityName : "";;
	clientMessenger.send("/schedules-city/"+ searchValue + "?page=" + page, API_METHOD.GET, "schedules")
		.then(result => {
			console.log(result);
			res.render('pg-hall-list', {
				"title": 'Search Result', 
				"halls": result.content,
				"searchValue": cityName, // show city name instead of ID
				"searchType": "CITY", // label as city
				"locationValue": cityName
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
	
	clientMessenger.send("/search-cities/"+ searchValue + "?page=" + page, API_METHOD.GET, "theaters")
		.then(result => {
			res.render('pg-city-list', {
				"title": 'Search Result', 
				"subTitle": "Search Result For: " + searchValue,
				"cities": result.content,
				"searchValue": searchValue,
				"searchType": "CITY",
				"locationValue": searchValue
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
}


