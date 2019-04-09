"use strict";

const express = require('express');
const router = new express.Router();

// URL for GitHub application
let login_github = 'https://github.com/login/oauth/authorize?client_id=';
login_github += process.env.GITHUB_CLIENT_ID;

// [GET] log-in page
router.route('/')
  .get( function(req, res, next) {
    res.render('login', { link: login_github });
  });

module.exports = router;
