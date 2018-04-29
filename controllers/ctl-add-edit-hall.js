let clientMessenger = require('../kafka/ClientMessenger');
let API_METHOD = require('../values/constants').API_METHOD;
let PathDict = require('../values/PathDictionary');

module.exports.getAddHall = function(req, res, next) {
    res.render('pg-add-edit-hall', { hall_option: 'Add' });
}

module.exports.getEditHall = function(req, res, next) {
    res.render('pg-add-edit-hall', { hall_option: 'Edit' });
}

module.exports.postAddHall = function(req, res, next) {
    console.log('lxr', req.body);
}

module.exports.postEditHall = function(req, res, next) {
    console.log('lxr', req.body);
}