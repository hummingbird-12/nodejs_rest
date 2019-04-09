"use strict";

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
require('dotenv').config();

require('./db');

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/oauth2');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_key',
  secret: 'blahblah',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set,
// then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_key && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

var tempUserRouter = undefined;
app.use('/login', loginRouter);
app.use('/redirectOAuth', authRouter);
app.use('/users', usersRouter);

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  console.log("Checking session...");

  if (req.session.user && req.cookies.user_key) {
    console.log("Welcome!");
    res.redirect('/users');
  } else {
    console.log("Please log-in");
    next();
  }
};

app.use('/', sessionChecker, (req, res) => {
  res.redirect('/login');
});

// route for user logout
app.use('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_key) {
    res.clearCookie('user_key');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app,
  tempUserRouter
};
