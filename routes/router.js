var express = require('express');
var router = express.Router();

var ctlMoviesHalls = require('../controllers/ctl-movies-halls');

let items = [
    'First Name',
    'Last Name',
    'Address',
    'City',
    'State',
    'Zip Code',
    'Phone Number',
    'Email'
];

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/login');
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
    res.render('pg-portal', { page: 'SIGN_UP', title: 'Sign Up' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('pg-portal', { page: 'LOGIN', title: 'Login' });
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
    res.render('pg-portal', { page: 'LOGIN', title: 'Login' });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
    res.render('profile', { items: items, option: ''});
});

/* GET profile edit component. */
router.get('/profile/edit', function(req, res, next) {
    res.render('profile', { items: items, option: 'edit'});
});

/* GET movies page. */
router.get('/movies', ctlMoviesHalls.movieList);
/* GET movies page. */
router.get('/halls', function(req, res, next) {
    res.render('pg-hall-list', { title: 'Movie Halls' });
});

/* GET buy ticket page. */
router.get('/buytickets', function(req, res, next) {
    res.render('buy-tickets');
});

module.exports = router;
