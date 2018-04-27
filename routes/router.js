var express = require('express');
var router = express.Router();
var PathDict = require('../values/PathDictionary');

var ctlMoviesHalls = require('../controllers/ctl-movies-halls');
var ctlPortal = require('../controllers/ctl-portal');
var Roles = require('../values/AccessControlCodes').Roles;


let param = require('../values/ejs-parameter');
let profileFormFields = param.profileFormFields;
let records = param.records;
let scheduleFormFields = param.scheduleFormFields;
let hallFormFields = param.hallFormFields;
let movieFormFields = param.movieFormFields;

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
    res.render('pg-profile', { profileFormFields: profileFormFields, option: '', role: '0' });
});
router.get(PathDict.GET.EDIT_PROFILE, function(req, res, next) {
    let user = req.session.user || {};
    let role = user.role ? user.role : 0;
    res.render('pg-profile', { profileFormFields: profileFormFields, option: 'edit', role: role });
});

router.get(PathDict.GET.MOVIE_LIST, ctlMoviesHalls.movieList);
router.get(PathDict.GET.HALL_LIST, function(req, res, next) {
    res.render('pg-hall-list', { title: 'Movie Halls' });
});

router.get(PathDict.GET.MOVIE_DETAILS, ctlMoviesHalls.movieDetails);
router.get(PathDict.GET.MOVIE_DETAILS_SCHEDULES, ctlMoviesHalls.schedulesOnMovie);
router.get(PathDict.GET.MOVIE_DETAILS_REVIEWS, ctlMoviesHalls.reviewsOnMovie);

router.get(PathDict.GET.BUY_TICKETS, function(req, res, next) {
    res.render('pg-buy-tickets');
});
router.get(PathDict.GET.PURCHASE_LIST, function(req, res, next) {
    res.render('pg-purchaselist', { records: records });
});

router.post(PathDict.POST.LOGIN, ctlPortal.postLogin);
router.post(PathDict.POST.SIGN_UP, ctlPortal.postSignUp);

router.get(PathDict.GET.ADD_MOVIE, function(req, res, next) {
    res.render('pg-add-edit-movie', { movieFormFields: movieFormFields, movie_option: 'Add' });
});

router.get(PathDict.GET.EDIT_MOVIE, function(req, res, next) {
    res.render('pg-add-edit-movie', { movieFormFields: movieFormFields, movie_option: 'Edit' });
});

router.get(PathDict.GET.ADD_SCHEDULE, function(req, res, next) {
    res.render('pg-add-edit-schedule', { scheduleFormFields: scheduleFormFields, schedule_option: 'Add' });
});

router.get(PathDict.GET.EDIT_SCHEDULE, function(req, res, next) {
    res.render('pg-add-edit-schedule', { scheduleFormFields: scheduleFormFields, schedule_option: 'Edit' });
});

router.get(PathDict.GET.ADD_HALL, function(req, res, next) {
    res.render('pg-add-edit-hall', { hallFormFields: hallFormFields, hall_option: 'Add' });
});

router.get(PathDict.GET.EDIT_HALL, function(req, res, next) {
    res.render('pg-add-edit-hall', { hallFormFields: hallFormFields, hall_option: 'Edit' });
});

router.get(PathDict.GET.NO_ACCESS, function(req, res, next) {
    res.render('pg-no-access');
});
module.exports = router;
