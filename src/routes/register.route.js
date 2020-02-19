const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {emailValidation} = require('../utils/validation')

router.get('/', async (req, res) => {
  res
      .send('path to /register is working')
      .status(200);
});

router.post('/', async (req, res, next) => {
  // check if email already exists
  const emailAlreadyExists = await User.findOne({email: req.body.email});
  if (emailAlreadyExists) {
    res
        .send('Email already exists - please try another email address.');
  }
  const usernameAlreadyExists = await User.findOne({username: req.body.username});
  if (usernameAlreadyExists) {
    res
        .send('Username already exists - please try another username.');
  }

  const {error} = emailValidation(req.body)
  if (error) {
    console.log(error.details);
    res.status(400);
    res.send(error.details[0].message);
  }

  // hashing the password
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword !== '' ? hashedPassword : '',
  });
  try {
    const savedUser = await newUser.save();
    res
        .status(201)
        .json(savedUser);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
});

module.exports = router;
