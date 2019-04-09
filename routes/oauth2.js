"use strict";

const express = require('express');
const router = new express.Router();

// details for GitHub OAuth API
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

// initialize 'simple-oauth2' module
const oauth2 = require('simple-oauth2').create(credential_github);

/* [GET] attempt fetching access token */
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

      // extract token
      const token = oauth2.accessToken.create(result);
      console.log("Access token:", token);

      // add token to session (just temporary...)
      req.session.user = token;

      // redirect to main page
      res.redirect("http://localhost:3000/users");
    } catch(error) {
      console.error("Error while fetching access token.", error.message);
      return res.status(500).json('Authentication Failed!');
    }
  });

module.exports = router;
