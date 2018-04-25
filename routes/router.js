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

let records = [
    {
        movie: 'Ready Player One',
        theatre: 'Century 20',
        totalPrice: '24',
        numOfTickets: '2'
    },
    {
        movie: 'Infinity War',
        theatre: 'Redwood City X20',
        totalPrice: '36',
        numOfTickets: '3'
    }
];
router.get('/', function(req, res, next) {
	res.redirect('/login');
});
router.get('/signup', function(req, res, next) {
    res.render('pg-portal', { page: 'SIGN_UP', title: 'Sign Up' });
});
router.get('/login', ctlPortal.getLogin);
router.get('/logout', ctlPortal.getLogout);
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
router.get('/purchaselist', function(req, res, next) {
    res.render('purchaselist', { records: records });
});

router.post('/login', ctlPortal.postLogin, ctlPortal.getLogin);
router.post('/signup', ctlPortal.postSignUp);
module.exports = router;
