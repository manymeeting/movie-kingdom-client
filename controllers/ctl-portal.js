var clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;
let PathDict = require('../values/PathDictionary');

module.exports.getLogout = function(req, res, next){
	delete req.session.user;
	res.redirect(PathDict.GET.LOGIN);
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
	clientMessenger.send("/login", API_METHOD.POST, "users", params)
		.then(result => {
			console.log(result.user);
			// persist user to session
			req.session.user = result.user;
			res.redirect(PathDict.GET.MOVIE_LIST);
		})
		.catch(err => {
			console.error(err);
			res.status(400);
			req.session.MKFlash.error = err;
			res.redirect(PathDict.GET.LOGIN);
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
	clientMessenger.send("/user", API_METHOD.POST, "users", params)
		.then(result => {
			console.log(result);
			res.redirect(PathDict.GET.LOGIN);
		})
		.catch(err => {
			console.log(err);
			res.status(400).send();
		});
	
}