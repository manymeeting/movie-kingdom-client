var clientMessenger = require('../messengers/ClientMessenger');

module.exports.getLogout = function(req, res, next){
	delete req.session.user;
	res.redirect('/login');
}

module.exports.getLogin = function(req, res, next){
	res.render('pg-portal', { page: 'LOGIN', title: 'Login', error: req.MK.error});
}

module.exports.postLogin = function(req, res, next){
	var params = {
		"username": req.body.username,
		"password": req.body.password
	};
	// get all movies
	clientMessenger.sendPOST("/login", "users", params)
		.then(result => {
			console.log(result);
			// persist user to session
			req.session.user = result.user;
			res.redirect('/movies');
		})
		.catch(err => {
			console.error(err);
			res.status(400);
			req.session.MKFlash.error = err;
			next();
		});
	
}

module.exports.postSignUp = function(req, res, next){
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