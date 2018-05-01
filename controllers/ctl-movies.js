var clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;
const DEFAULT_ZIPCODE = "92825"; // TODO get zipcode based on actual user location

module.exports.movieList = function(req, res, next) {
	// get all movies and genres
	var page = req.query.page ? req.query.page : 0;
	var genres = [];
	clientMessenger.send("/genres", API_METHOD.GET, "movies")
		.then((result) => {
			genres = result.content;
			return clientMessenger.send("/movies?page=" + page, API_METHOD.GET, "movies");
		})
		.then(result => {
			console.log(result);
			res.render('pg-movie-list', {
				"title": 'Movies', 
				"genres": genres,
				"movies": result.content
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
	
}

module.exports.searchByGenre = function(req, res, next) {
	var page = req.query.page ? req.query.page : 0;
	var genreId = req.query.genreId;
	var genres = [];
	clientMessenger.send("/genres", API_METHOD.GET, "movies")
		.then((result) => {
			genres = result.content;
			return clientMessenger.send("/movies?page=" + page + "&genreId=" + genreId, API_METHOD.GET, "movies");
		})
		.then(result => {
			console.log(result);
			res.render('pg-movie-list', {
				"title": 'Movies', 
				"genres": genres,
				"selectedGenreId": genreId,
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
	var movieAnalytics = {};
	clientMessenger.send("/analytics/movie-revenue/" + movieID, API_METHOD.GET, "analytics")
		.then(result => {
			movieAnalytics = result.movie;
		})
		.then(()=>{
			return clientMessenger.send("/movie/" + movieID, API_METHOD.GET, "movies");
		})
		.then((result) => {
			console.log(result);
			res.render('pg-movie-details', {
				"title": 'Movies Details', 
				"movieAnalytics": movieAnalytics,
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
	var page = req.query.page ? req.query.page : 0;
	var movie = {};

	clientMessenger.send("/movie/" + movieID, API_METHOD.GET, "movies")
		.then(result => {
			console.log(result);
			movie = result.movie;	
		})
		.then(()=> {
			return clientMessenger.send(`/schedules-zipcdoe/${DEFAULT_ZIPCODE}/${movieID}?page=${page}`, API_METHOD.GET, "schedules");
		})
		.then(result => {
			res.render('movie-dt-schedules', {
				"title": 'Movies Schedules', 
				"movie": movie,
				"halls": result.content
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
	clientMessenger.send("/movie/" + movieID, API_METHOD.GET, "movies")
		.then(result => {
			console.log(result);
			movie = result.movie;
		})
		.then(() => {
			return clientMessenger.send("/movie-reviews/?movieId=" + movieID, API_METHOD.GET, "reviews");
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
	clientMessenger.send("/movie/" + movieID, API_METHOD.GET, "movies")
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
