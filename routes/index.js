var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
    res.render('account-header', { page: 'sign up' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('account-header', { page: 'log in' });
});

module.exports = router;
