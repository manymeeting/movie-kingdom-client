
module.exports.getAddMovie = function(req, res, next) {
    res.render('pg-add-edit-movie', { movie_option: 'Add' });
}

module.exports.getEditMovie = function(req, res, next) {
    res.render('pg-add-edit-movie', { movie_option: 'Edit' });
}

module.exports.postAddMovie = function(req, res, next) {
    console.log('lxr', req.body);
}

module.exports.postEditMovie = function(req, res, next) {
    console.log('lxr', req.body);
}