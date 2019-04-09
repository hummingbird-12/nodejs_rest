"use strict";

const express = require('express');
const router = new express.Router();

let login_github = 'https://github.com/login/oauth/authorize?client_id=';
login_github += process.env.GITHUB_CLIENT_ID;


/* GET home page. */
router.route('/')
  .get( function(req, res, next) {
    res.render('login', { link: login_github });
  });

module.exports = router;
