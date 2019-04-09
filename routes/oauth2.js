"use strict";

const express = require('express');
const router = new express.Router();

// let { tempUserRouter } = require('../app');
// const loginRouter = require('./login');
// const usersRouter = require('./users');

const credential_github = {
  client: {
    id: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET
  },
  auth: {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
    authorizePath: "/login/oauth/authorize"
  }
};

const oauth2 = require('simple-oauth2').create(credential_github);

router.route("/")
  .get(async function(req, res, next) {
    const code = req.query.code;
    const options = {
      code: code,
      redirecURI: "localhost:3000/users"
    };
    console.log("Authorization code:", code);

    try {
      const result = await oauth2.authorizationCode.getToken(options);

      const token = oauth2.accessToken.create(result);
      console.log("Access token:", token);

      req.session.user = token;

      // res.redirect('/users');
      res.redirect("http://localhost:3000/users");
    } catch(error) {
      console.error("Error while fetching access token.", error.message);
      return res.status(500).json('Authentication Failed!');
    }
  });

module.exports = router;
