"use strict";

const express = require('express');
const router = express.Router();

let login_github = 'https://github.com/login/oauth/authorize?client_id=';
login_github += process.env.GITHUB_CLIENT_ID;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { link: login_github });
});

module.exports = router;
