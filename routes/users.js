"use strict";

const express = require('express');
const router = new express.Router();

const User = require('../models/user');

router.route('/')
  .get(User.getUsers)       // [GET] all users
  .post(User.createUser);   // [POST] new user

router.route('/:id')
  .get(User.getUserById)    // [GET] single user by id
  .put(User.updateUser)     // [PUT] update existing user
  .delete(User.deleteUser); // [DELETE] remove user

module.exports = router;
