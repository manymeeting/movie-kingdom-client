var express = require('express');
var router = express.Router();
var PathDict = require('../values/PathDictionary');

var ctlMovies = require('../controllers/ctl-movies');
var ctlPortal = require('../controllers/ctl-portal');
var ctlMultiTypeSearch = require('../controllers/ctl-multi-type-search');
var Roles = require('../values/AccessControlCodes').Roles;
let ctlProfile = require('../controllers/ctl-profile');

let param = require('../values/ejs-parameter');
let records = param.records;
let scheduleFormFields = param.scheduleFormFields;

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
    res.render('pg-profile', { proflie_option: ''});
});
router.get(PathDict.GET.EDIT_PROFILE, function(req, res, next) {
    res.render('pg-profile', { proflie_option: 'edit'});
});

router.post(PathDict.GET.EDIT_PROFILE, ctlProfile.postEditProfile);

router.get(PathDict.GET.MOVIE_LIST, ctlMovies.movieList);
router.get(PathDict.GET.HALL_LIST, function(req, res, next) {
    res.render('pg-hall-list', { title: 'Movie Halls' });
});

router.get(PathDict.GET.MOVIE_BY_GENRE, ctlMovies.searchByGenre);
router.get(PathDict.GET.MOVIE_DETAILS, ctlMovies.movieDetails);
router.get(PathDict.GET.MOVIE_DETAILS_SCHEDULES, ctlMovies.schedulesOnMovie);
router.get(PathDict.GET.MOVIE_DETAILS_REVIEWS, ctlMovies.reviewsOnMovie);
router.get(PathDict.GET.MOVIE_DETAILS_POST_REVIEW, ctlMovies.reviewFormOnMovie);
router.get(PathDict.GET.MULTI_TYPE_SEARCH, ctlMultiTypeSearch.multiTypeSearch);

router.get(PathDict.GET.BUY_TICKETS, function(req, res, next) {
    res.render('pg-buy-tickets');
});
router.get(PathDict.GET.PURCHASE_LIST, function(req, res, next) {
    res.render('pg-purchaselist', { records: records });
});

router.post(PathDict.POST.LOGIN, ctlPortal.postLogin);
router.post(PathDict.POST.SIGN_UP, ctlPortal.postSignUp);

router.get(PathDict.GET.ADD_MOVIE, function(req, res, next) {
    res.render('pg-add-edit-movie', { movie_option: 'Add' });
});

router.get(PathDict.GET.EDIT_MOVIE, function(req, res, next) {
    res.render('pg-add-edit-movie', { movie_option: 'Edit' });
});

router.get(PathDict.GET.ADD_SCHEDULE, function(req, res, next) {
    res.render('pg-add-edit-schedule', { scheduleFormFields: scheduleFormFields, schedule_option: 'Add' });
});

router.get(PathDict.GET.EDIT_SCHEDULE, function(req, res, next) {
    res.render('pg-add-edit-schedule', { scheduleFormFields: scheduleFormFields, schedule_option: 'Edit' });
});

router.get(PathDict.GET.ADD_HALL, function(req, res, next) {
    res.render('pg-add-edit-hall', { hall_option: 'Add' });
});

router.get(PathDict.GET.EDIT_HALL, function(req, res, next) {
    res.render('pg-add-edit-hall', { hall_option: 'Edit' });
});

router.get(PathDict.GET.NO_ACCESS, function(req, res, next) {
    res.render('pg-no-access');
});
module.exports = router;
