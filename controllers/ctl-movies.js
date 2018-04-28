var clientMessenger = require('../kafka/ClientMessenger');

module.exports.movieList = function(req, res, next) {
	// get all movies and genres
	var page = req.query.page ? req.query.page : 0;
	var genres = [];
	clientMessenger.sendGET("/genres", "movies")
		.then((result) => {
			genres = result.content;
			return clientMessenger.sendGET("/movies?page=" + page, "movies");
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
	clientMessenger.sendGET("/genres", "movies")
		.then((result) => {
			genres = result.content;
			return clientMessenger.sendGET("/movies?page=" + page + "&genreId=" + genreId, "movies");
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