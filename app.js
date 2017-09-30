var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');
var mongoose = require('mongoose');



require('./config/db.config');
require('./config/passport.config').setup(passport);
var corsConfig = require('./config/cors.config');

var authRoutes = require('./routes/auth.route');
var bandsRoutes = require('./routes/bands.route');
var alarmsRoutes = require('./routes/alarms.route');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsConfig))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'SuperSecret',
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 2419200000 }
}));
app.use(passport.initialize());
app.use(passport.session());

const apiPrefix = '/api'
app.use(`${apiPrefix}`, authRoutes);
app.use(`${apiPrefix}/bands`, bandsRoutes);
app.use(`${apiPrefix}/alarms`, alarmsRoutes);


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
  res.json({message: err.message});
});

module.exports = app;
