let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;
let PathDict = require('../values/PathDictionary');

module.exports.getAddMovie = function(req, res, next) {
    res.render('pg-add-edit-movie', { movie_option: 'Add', movie: {} });
}

module.exports.getEditMovie = function(req, res, next) {
    let movieId = 20;
    clientMessenger.send(`/movie/${movieId}`, API_METHOD.GET, "movies")
        .then(result => {
            res.render('pg-add-edit-movie', { movie_option: 'Edit', movie: result.movie });
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
}

module.exports.postAddMovie = function(req, res, next) {
    console.log('lxr', req.body);
}

module.exports.postEditMovie = function(req, res, next) {
    console.log('lxr', req.body);
}