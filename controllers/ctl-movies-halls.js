var clientMessenger = require('../messengers/ClientMessenger');

module.exports.movieList = function(req, res, next){
	// get all movies
	clientMessenger.sendGET("/movie/2", "movies")
		.then(result => {
			console.log(result);
			res.render('pg-movie-list', { title: 'Movies' });
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
	
}