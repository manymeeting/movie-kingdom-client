let PathDict = require('../values/PathDictionary');
let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;

module.exports.getAddSchedule = function(req, res, next) {
    res.render('pg-add-edit-schedule', { schedule_option: 'Add' });
}

module.exports.getEditSchedule = function(req, res, next) {
    res.render('pg-add-edit-schedule', { schedule_option: 'Edit' });
}

module.exports.postAddSchedule = function (req, res, next) {
    console.log('lxr', req.body);
    res.redirect(PathDict.GET.MOVIE_LIST);
}

module.exports.postEditSchedule = function (req, res, next) {
    console.log('lxr', req.body);
    res.redirect(PathDict.GET.MOVIE_LIST);
}