const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res
      .status(200)
      .send('Path to /user is working');
});

router.get('/:username', async (req, res, next) => {
  const USER_DOES_NOT_EXIST = 'User doesn\'t exist!';
  const filteredUser = String(req.params.username);
  try {
    const userExists = await User.findOne({username: filteredUser}, '-_id -__v -password');
    if (userExists === null) {
      throw new Error(USER_DOES_NOT_EXIST);
    }
    res
        .status(200)
        .send(userExists);
  } catch (err) {
    if (err.message === USER_DOES_NOT_EXIST) {
      err.statusCode = 404;
    }
    next(err);
  }
});

router.post('/register', async (req, res) => {
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
    res
        .send(error.message);
  }

  router.use((err, req, res, next) => {
    if (err.message === 'ValidationError') {
      err.statusCode = 400;
    }
    next(err);
  });
});


module.exports = router
;
