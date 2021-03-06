var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var FlashDataHandler = require('./interceptors/FlashDataHandler');
var AuthValidation = require('./interceptors/AuthValidation');
var router = require('./routes/router');
var PathDict = require('./values/PathDictionary');
var Roles = require('./values/AccessControlCodes').Roles;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'Cmpe273',
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new MongoStore({
		url: config.mongoDBConfig.connectionStr,
		ttl: 24 * 60 * 60 // = 1 day
	})
}));

// set data and functions for templates 
app.locals.PathDict = PathDict;
app.locals.Roles = Roles;
app.use(function(req, res, next) {
  res.locals.userInfo = req.session.user ? req.session.user : {};
  next();
});

app.use('/', FlashDataHandler);
app.use('/', AuthValidation);
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pg-error');
});

module.exports = app;
