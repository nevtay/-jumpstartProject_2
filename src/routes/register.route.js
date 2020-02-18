const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res
      .send('path to /register is working')
      .status(200);
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res
        .status(201)
        .json(savedUser);
  } catch (err) {
    err.message = err.message
        .split(' ')
        .filter((word) => word.includes('`'))
        .map((word) => {
          console.log(word);
            word.startsWith('`') ? word = word.slice(1, word.length - 1) : word;
            return `${word} is invalid.`;
        })
        .join(' ');
    err.statusCode = 400;
    next(err);
  }
});

module.exports = router;
