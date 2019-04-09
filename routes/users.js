"use strict";

const express = require('express');
const router = new express.Router();

const User = require('../models/user');

/* GET users listing. */
router.route('/')
  .get(User.getUsers)
  .post(User.createUser);

router.route('/:id')
  .get(User.getUserById)
  .put(User.updateUser)
  .delete(User.deleteUser);

module.exports = router;
