var clientMessenger = require('../messengers/ClientMessenger');

module.exports.movieList = function(req, res, next){
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