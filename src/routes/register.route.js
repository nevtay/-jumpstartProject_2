const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

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

  // hashing the password
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    res
        .json(savedUser)
        .status(201);
  } catch (err) {
    const errMsg = await err.message
        .split(' ')
        .filter((word) => word.includes('`'))
        .map((word) => {
        word.startsWith('`') ? word = word.slice(1, word.length - 1) : word;
        return `${word} is invalid.`;
        })
        .join(' ');
    err.msg = errMsg;
    err.statusCode = 400;
    next(err);
  }
});

module.exports = router;
