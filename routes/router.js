var express = require('express');
var router = express.Router();
var PathDict = require('../values/PathDictionary');

var ctlMoviesHalls = require('../controllers/ctl-movies-halls');
var ctlPortal = require('../controllers/ctl-portal');

let param = require('./utils/ejs-parameter');
let items = param.items;
let records = param.records;
let movieOp = param.movieInfo;

router.get(PathDict.GET.ROOT, function(req, res, next) {
    res.redirect(PathDict.GET.LOGIN);
});

router.get('/', function(req, res, next) {
	res.redirect('/login');
});
router.get(PathDict.GET.SIGN_UP, function(req, res, next) {
    res.render('pg-portal', { page: 'SIGN_UP', title: 'Sign Up' });
});

router.get(PathDict.GET.LOGIN, ctlPortal.getLogin);
router.get(PathDict.GET.LOGOUT, ctlPortal.getLogout);
router.get(PathDict.GET.PROFILE, function(req, res, next) {
    res.render('pg-profile', { items: items, option: ''});
});
router.get(PathDict.GET.EDIT_PROFILE, function(req, res, next) {
    res.render('pg-profile', {items: items, option: 'edit'});
});

router.get(PathDict.GET.MOVIE_LIST, ctlMoviesHalls.movieList);
router.get(PathDict.GET.HALL_LIST, function(req, res, next) {
    res.render('pg-hall-list', { title: 'Movie Halls' });
});

router.get(PathDict.GET.BUY_TICKETS, function(req, res, next) {
    res.render('pg-buy-tickets');
});
router.get(PathDict.GET.PURCHASE_LIST, function(req, res, next) {
    res.render('pg-purchaselist', { records: records });
});

router.post(PathDict.POST.LOGIN, ctlPortal.postLogin);
router.post(PathDict.POST.SIGN_UP, ctlPortal.postSignUp);

router.get(PathDict.GET.ADD_MOVIE, function(req, res, next) {
    res.render('pg-add-movie', { items: movieOp });
});

router.get(PathDict.GET.ADD_HALL, function(req, res, next) {
    res.render('pg-add-hall');
});

router.get(PathDict.GET.NO_ACCESS, function(req, res, next) {
    res.render('pg-no-access');
});
module.exports = router;
