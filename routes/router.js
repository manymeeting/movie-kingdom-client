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
let ctlMovie = require('../controllers/ctl-add-edit-movie');
let ctlHall = require('../controllers/ctl-add-edit-hall');
let ctlDashBoard = require('../controllers/ctl-dashboard');
let ctlLogs = require('../controllers/ctl-logs');

router.get(PathDict.GET.ROOT, function(req, res, next) {
    res.redirect(PathDict.GET.LOGIN);
});

router.get('/', function(req, res, next) {
	res.redirect('/login');
});
router.get(PathDict.GET.SIGN_UP, function(req, res, next) {
    res.render('pg-portal', { page: 'SIGN_UP', title: 'Sign Up', error: req.MK.error});
});
//account
router.get(PathDict.GET.LOGIN, ctlPortal.getLogin);
router.get(PathDict.GET.LOGOUT, ctlPortal.getLogout);
router.post(PathDict.POST.LOGIN, ctlPortal.postLogin);
router.post(PathDict.POST.SIGN_UP, ctlPortal.postSignUp);

//profile
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
router.post(PathDict.POST.MOVIE_DETAILS_POST_REVIEW, ctlMovies.postReviewOnMovie);
router.get(PathDict.GET.MOVIE_DETAILS_ORDERS, ctlOrders.ordersOnMovieDetails);
router.get(PathDict.GET.MULTI_TYPE_SEARCH, ctlMultiTypeSearch.multiTypeSearch);
router.get(PathDict.GET.HALL_DETAILS, ctlHalls.hallDetails);
router.get(PathDict.GET.ADMIN_DASHBOARD, ctlDashBoard.renderDashBoard);

//logger
router.post(PathDict.POST.LOGGER_PATH, ctlLogs.postClickLog);
router.get(PathDict.GET.SUM_CLICK_BY_PATH, ctlLogs.sumCountByPath);
router.get(PathDict.GET.TOP_TEN_MOVIE_REVENUES, ctlDashBoard.topMovieRevenues);
router.get(PathDict.GET.TOP_TEN_HALL_REVENUES, ctlDashBoard.topHallRevenues);
router.get(PathDict.GET.TOP_TEN_CITY_REVENUES, ctlDashBoard.topCityRevenues);

//buy tickets
router.get(PathDict.GET.BUY_TICKETS, ctlBuyTickets.getBuyTickets);
router.post(PathDict.GET.BUY_TICKETS, ctlBuyTickets.postBuyTickets);

//movie
router.get(PathDict.GET.ADD_MOVIE, ctlMovie.getAddMovie);
router.get(PathDict.GET.EDIT_MOVIE, ctlMovie.getEditMovie);
router.post(PathDict.POST.ADD_MOVIE, ctlMovie.postAddMovie);
router.post(PathDict.POST.EDIT_MOVIE, ctlMovie.postEditMovie);

//schedule
router.get(PathDict.GET.ADD_SCHEDULE, ctlSchedule.getAddSchedule);
router.get(PathDict.GET.EDIT_SCHEDULE, ctlSchedule.getEditSchedule);
router.post(PathDict.POST.ADD_SCHEDULE, ctlSchedule.postAddSchedule);
router.post(PathDict.POST.EDIT_SCHEDULE, ctlSchedule.postEditSchedule);

//hall
router.get(PathDict.GET.ADD_HALL, ctlHall.getAddHall);
router.get(PathDict.GET.EDIT_HALL, ctlHall.getEditHall);
router.post(PathDict.POST.ADD_HALL, ctlHall.postAddHall);
router.post(PathDict.POST.EDIT_HALL, ctlHall.postEditHall);

router.get(PathDict.GET.SUCCESS, function(req, res, next) {
	res.render('pg-success');	
});

router.get(PathDict.GET.NO_ACCESS, function(req, res, next) {
    res.render('pg-no-access');
});


module.exports = router;
