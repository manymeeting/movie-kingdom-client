var clientMessenger = require('../kafka/ClientMessenger');
const ZIPCODE = "92825"; // TODO get zipcode based on actual user location

module.exports.movieList = function(req, res, next) {
	// get all movies
	var page = req.query.page ? req.query.page : 0;
	clientMessenger.sendGET("/movies?page=" + page, "movies")
		.then(result => {
			console.log(result);
			res.render('pg-movie-list', {
				"title": 'Movies', 
				"movies": result.content
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
	
}

module.exports.movieDetails = function(req, res, next) {
	var movieID = req.query.id;

	clientMessenger.sendGET("/movie/" + movieID, "movies")
		.then(result => {
			console.log(result);
			res.render('pg-movie-details', {
				"title": 'Movies Details', 
				"movie": result.movie
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});

}

module.exports.schedulesOnMovie = function(req, res, next) {
	var movieID = req.query.id;

	// TODO: fetch schedule data
	clientMessenger.sendGET("/movie/" + movieID, "movies")
		.then(result => {
			console.log(result);
			res.render('movie-dt-schedules', {
				"title": 'Movies Schedules', 
				"movie": result.movie
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});

}

module.exports.reviewsOnMovie = function(req, res, next) {
	var movieID = req.query.id;
	var movie = {};
	var reviews = [];
	clientMessenger.sendGET("/movie/" + movieID, "movies")
		.then(result => {
			console.log(result);
			movie = result.movie;
		})
		.then(() => {
			return clientMessenger.sendGET("/movie-reviews/?movieId=" + movieID, "reviews");
		})
		.then(result => {
			reviews = result.content;
			res.render('movie-dt-reviews', {
				"title": 'Movies Reviews', 
				"movie": movie,
				"reviews": reviews
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
}

module.exports.reviewFormOnMovie = function(req, res, next) {
	var movieID = req.query.id;
	clientMessenger.sendGET("/movie/" + movieID, "movies")
		.then(result => {
			console.log(result);
			res.render('movie-dt-post-review', {
				"title": 'Post Review', 
				"movie": result.movie
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
}

module.exports.searchMoviesSchedules = function(req, res, next) {
	var searchType = req.query.searchType;
	switch(searchType) {
		case "MOVIE": 
			_searchMovie(req, res, next);
			return;
		case "ZIPCODE":
			_fetchSchedulesByZipCode(req, res, next);
			return;
		case "CITY":
			_fetchSchedulesByCity(req, res, next);
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
	var searchValue = req.query.searchValue;
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

function _fetchSchedulesByCity(req, res, next) {

}


