var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/login');
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
    res.render('pg-portal', { page: 'SIGN_UP' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('pg-portal', { page: 'LOGIN' });
});

module.exports = router;
