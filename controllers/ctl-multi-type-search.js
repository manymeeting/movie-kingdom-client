const DEFAULT_ZIPCODE = "92825"; // TODO get zipcode based on actual user location
var clientMessenger = require('../kafka/ClientMessenger');
var queryString = require('query-string');
let API_METHOD = require('../values/constants').API_METHOD;
const priceFilterDict = {
	"0" : {
		// all
	},
	"1" : {
		minPrice: 0,
		maxPrice: 20
	},
	"2" : {
		minPrice: 21,
		maxPrice: 50
	},
	"3" : {
		minPrice: 51
		// no max limit
	} 
};
const ratingFilterDict = {
	"0" : {
		// all
	},
	"1" : {
		minStars: 1
	},
	"2" : {
		minStars: 2
	},
	"3" : {
		minStars: 3
	},
	"4" : {
		minStars: 4
	},
	"5" : {
		minStars: 5
	}
};

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
	var priceFilter = req.query.priceFilter ? req.query.priceFilter : "0";
	var ratingFilter = req.query.ratingFilter ? req.query.ratingFilter : "0";

	var queryStr = queryString.stringify({
		page: page,
		minPrice: priceFilterDict[priceFilter].minPrice,
		maxPrice: priceFilterDict[priceFilter].maxPrice,
		minStars: ratingFilterDict[ratingFilter].minStars,
		maxStars: ratingFilterDict[ratingFilter].maxStars
	});

	clientMessenger.send("/schedules-zipcdoe/"+ searchValue + "?" + queryStr, API_METHOD.GET, "schedules")
		.then(result => {
			console.log(result);
			res.render('pg-hall-list', {
				"title": 'Search Result', 
				"halls": result.content,
				"searchValue": searchValue,
				"searchType": "ZIPCODE",
				"priceFilter": priceFilter,
				"ratingFilter": ratingFilter,
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
	var searchValue = req.query.searchValue;
	var cityName = req.query.cityName ? req.query.cityName : `CITY WITH ID ${searchValue}` ;
	var priceFilter = req.query.priceFilter ? req.query.priceFilter : "0";
	var ratingFilter = req.query.ratingFilter ? req.query.ratingFilter : "0";

	var queryStr = queryString.stringify({
		page: page,
		minPrice: priceFilterDict[priceFilter].minPrice,
		maxPrice: priceFilterDict[priceFilter].maxPrice,
		minStars: ratingFilterDict[ratingFilter].minStars,
		maxStars: ratingFilterDict[ratingFilter].maxStars
	});

	clientMessenger.send("/schedules-city/"+ searchValue + "?" + queryStr, API_METHOD.GET, "schedules")
		.then(result => {
			console.log(result);
			res.render('pg-hall-list', {
				"title": 'Search Result', 
				"halls": result.content,
				"searchValue": searchValue,
				"searchType": "CITY_ID",
				"priceFilter": priceFilter,
				"ratingFilter": ratingFilter,
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


