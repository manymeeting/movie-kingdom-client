var express = require('express');
var router = express.Router();

var ctlMoviesHalls = require('../controllers/ctl-movies-halls');
var ctlPortal = require('../controllers/ctl-portal');

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

router.get('/', function(req, res, next) {
	res.redirect('/login');
});

router.get('/signup', function(req, res, next) {
    res.render('pg-portal', { page: 'SIGN_UP', title: 'Sign Up' });
});

router.get('/login', function(req, res, next) {
    res.render('pg-portal', { page: 'LOGIN', title: 'Login' });
});


router.get('/logout', function(req, res, next) {
    res.render('pg-portal', { page: 'LOGIN', title: 'Login' });
});

router.get('/profile', function(req, res, next) {
    res.render('profile', { items: items, option: ''});
});

router.get('/profile/edit', function(req, res, next) {
    res.render('profile', { items: items, option: 'edit'});
});

router.get('/movies', ctlMoviesHalls.movieList);


router.get('/halls', function(req, res, next) {
    res.render('pg-hall-list', { title: 'Movie Halls' });
});

router.get('/buytickets', function(req, res, next) {
    res.render('buy-tickets');
});

router.post('/login', ctlPortal.login);
router.post('/signup', ctlPortal.signUp);
module.exports = router;
