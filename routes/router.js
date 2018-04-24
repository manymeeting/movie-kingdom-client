var express = require('express');
var router = express.Router();

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

/* GET profile page. */
router.get('/profile', function(req, res, next) {
    let items = [
        'User ID',
        'First Name',
        'Last Name',
        'Address',
        'City',
        'State',
        'Zip Code',
        'Phone Number',
        'Email'
    ];
    res.render('profile', { items: items, option: ''});
});

/* GET profile page. */
router.get('/profile/edit', function(req, res, next) {
    let items = [
        'User ID',
        'First Name',
        'Last Name',
        'Address',
        'City',
        'State',
        'Zip Code',
        'Phone Number',
        'Email'
    ];
    res.render('profile', { items: items, option: 'edit'});
});

/* GET movies page. */
router.get('/movies', function(req, res, next) {
    res.render('pg-movie-list', { title: 'Movies' });
});
/* GET movies page. */
router.get('/halls', function(req, res, next) {
    res.render('pg-hall-list', { title: 'Movie Halls' });
});

module.exports = router;
