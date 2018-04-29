let PathDict = require('../values/PathDictionary');
let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;

module.exports.getAddSchedule = function(req, res, next) {
    //must get movieID first
    let movieId = 20;
    clientMessenger.send(`/movie-format/${movieId}`, API_METHOD.GET, "movies")
        .then(result => {
            console.log(result);
            res.render('pg-add-edit-schedule', { schedule_option: 'Add', formats: result.formats });
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
}

module.exports.getEditSchedule = function(req, res, next) {
    let movieId = 20;
    clientMessenger.send(`/movie-format/${movieId}`, API_METHOD.GET, "movies")
        .then(result => {
            console.log(result);
            res.render('pg-add-edit-schedule', { schedule_option: 'Edit', formats: result.formats });
        })
        .catch(err => {
            console.error(err);
            res.status(400);
            req.session.MKFlash.error = err;
        });
}

module.exports.postAddSchedule = function (req, res, next) {
    console.log('lxr', req.body);
    res.redirect(PathDict.GET.MOVIE_LIST);
}

module.exports.postEditSchedule = function (req, res, next) {
    console.log('lxr', req.body);
    res.redirect(PathDict.GET.MOVIE_LIST);
}