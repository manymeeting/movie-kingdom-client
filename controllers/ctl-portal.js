var clientMessenger = require('../messengers/ClientMessenger');

module.exports.login = function(req, res, next){
	var params = {
		"username": req.body.username,
		"password": req.body.password
	};
	// get all movies
	clientMessenger.sendPOST("/login", "users", params)
		.then(result => {
			console.log(result);
			//TODO save to session
			res.redirect('/movies');
		})
		.catch(err => {
			console.log(err);
			res.status(400);
			res.render('pg-portal', {
				"page": "LOGIN",
				"title": "Login",
				"error": err
			});
			
		});
	
}

module.exports.signUp = function(req, res, next){
	var params = {
		"email": req.body.email,
		"firstName": req.body.firstName,
		"lastName": req.body.lastName,
		"password": req.body.password,
		"username": req.body.username
	};
	// get all movies
	clientMessenger.sendPOST("/user", "users", params)
		.then(result => {
			console.log(result);
			res.redirect('/login');
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
	
}