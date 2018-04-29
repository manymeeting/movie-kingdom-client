var express = require('express');
var router = express.Router();
var PathDict = require('../values/PathDictionary');

var ctlMovies = require('../controllers/ctl-movies');
var ctlOrders = require('../controllers/ctl-orders');
var ctlHalls = require('../controllers/ctl-halls');
var ctlPortal = require('../controllers/ctl-portal');
var ctlMultiTypeSearch = require('../controllers/ctl-multi-type-search');
let ctlBuyTickets = require('../controllers/ctl-buy-tickets');
let ctlProfile = require('../controllers/ctl-profile');
let ctlSchedule = require('../controllers/ctl-schedule');

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

router.get(PathDict.GET.PROFILE, ctlProfile.getProfile);
router.get(PathDict.GET.EDIT_PROFILE, ctlProfile.getEditProfile);
router.post(PathDict.GET.EDIT_PROFILE, ctlProfile.postEditProfile);
router.post(PathDict.GET.PROFILE, ctlProfile.deleteProfile);

router.get(PathDict.GET.MOVIE_LIST, ctlMovies.movieList);
router.get(PathDict.GET.HALL_LIST, function(req, res, next) {
    res.render('pg-hall-list', { title: 'Movie Halls' });
});

router.get(PathDict.GET.USER_ORDERS, ctlOrders.userOrderList);
router.get(PathDict.GET.ADMIN_ORDERS, ctlOrders.adminOrderList);
router.get(PathDict.GET.MOVIE_BY_GENRE, ctlMovies.searchByGenre);
router.get(PathDict.GET.MOVIE_DETAILS, ctlMovies.movieDetails);
router.get(PathDict.GET.MOVIE_DETAILS_SCHEDULES, ctlMovies.schedulesOnMovie);
router.get(PathDict.GET.MOVIE_DETAILS_REVIEWS, ctlMovies.reviewsOnMovie);
router.get(PathDict.GET.MOVIE_DETAILS_POST_REVIEW, ctlMovies.reviewFormOnMovie);
router.get(PathDict.GET.MULTI_TYPE_SEARCH, ctlMultiTypeSearch.multiTypeSearch);
router.get(PathDict.GET.HALL_DETAILS, ctlHalls.hallDetails);

router.get(PathDict.GET.BUY_TICKETS, ctlBuyTickets.getBuyTickets);
router.post(PathDict.GET.BUY_TICKETS, ctlBuyTickets.postBuyTickets);

router.post(PathDict.POST.LOGIN, ctlPortal.postLogin);
router.post(PathDict.POST.SIGN_UP, ctlPortal.postSignUp);

router.get(PathDict.GET.ADD_MOVIE, function(req, res, next) {
    res.render('pg-add-edit-movie', { movie_option: 'Add' });
});

router.get(PathDict.GET.EDIT_MOVIE, function(req, res, next) {
    res.render('pg-add-edit-movie', { movie_option: 'Edit' });
});

router.get(PathDict.GET.ADD_SCHEDULE, ctlSchedule.getAddSchedule);
router.get(PathDict.GET.EDIT_SCHEDULE, ctlSchedule.getEditSchedule);
router.post(PathDict.POST.ADD_SCHEDULE, ctlSchedule.postAddSchedule);
router.post(PathDict.POST.EDIT_SCHEDULE, ctlSchedule.postEditSchedule);

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
