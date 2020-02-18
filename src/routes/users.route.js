const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res
      .status(200)
      .send('Path to /user is working');
});

router.get('/:username', async (req, res, next) => {
  const USER_DOES_NOT_EXIST = 'Uh oh - User doesn\'t exist!';
  const filteredUser = String(req.params.username);
  try {
    const userExists = await User.findOne(
        {username: filteredUser}, '-_id -__v -password',
    );
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


module.exports = router
;
