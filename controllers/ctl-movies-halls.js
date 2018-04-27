var clientMessenger = require('../kafka/ClientMessenger');

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