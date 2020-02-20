const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtKeySecret } = require('../config/retrieveJWTSecret');
const { protectRoute } = require('../middlewares/auth');

// create JWT token function
const createJWTToken = (myId, myUserName) => {
  const today = new Date();
  const exp = new Date(today);

  const secret = jwtKeySecret();
  exp.setDate(today.getDate() + 60);

  const payload = {
    id: myId,
    username: myUserName,
    exp: parseInt(exp.getTime() / 1000)
  };
  const token = jwt.sign(payload, secret);
  return token;
};
// GET user by name
router.get('/:username', async (req, res, next) => {
  const USER_DOES_NOT_EXIST = `Uh oh - user "${req.params.username}" doesn't exist!`;
  const filteredUser = String(req.params.username);
  try {
    const userExists = await User.findOne(
      { username: filteredUser },
      '-_id -__v -password'
    );
    if (userExists === null) {
      throw new Error(USER_DOES_NOT_EXIST);
    }
    res.status(200).send(userExists);
  } catch (err) {
    if (err.message === USER_DOES_NOT_EXIST) {
      err.statusCode = 404;
    }
    next(err);
  }
});

// POST login validation
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // check if username exists
    const userExists = await User.findOne({ username });
    if (userExists === null) {
      throw new Error('Invalid username');
    }

    // check if password exists
    const validPassword = await bcrypt.compare(password, userExists.password);
    console.log(validPassword);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    // create token with JWT
    const loginToken = createJWTToken(userExists._id, userExists.username);
    const oneDay = 24 * 60 * 60 * 1000;
    const expiresInOneDay = new Date(Date.now() + oneDay);

    res.cookie('loginToken', loginToken, {
      expires: expiresInOneDay,
      httpOnly: true
    });

    console.log('token: ', loginToken);
    res.send('login success!');
  } catch (error) {
    console.log(error);
    if (
      error.message === 'Invalid username' ||
      error.message === 'Invalid password'
    ) {
      error.statusCode = 400;
    }
    next(error);
  }
});

// logout
router.post('/logout', (req, res) => {
  res.clearCookie('loginToken').send('You are now logged out!');
});

// default GET
router.get('/', protectRoute, async (req, res, next) => {
  try {
    console.log(req);
    const user = await User.findOne(
      { username: req.user.username },
      '-__v -_id -password'
    );
    if (user === null) {
      res.status(200).send('Please login to see content.');
    }
    res.status(200).send(user);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
});

// POST logout
// router.post('/logout', (req, res) => {
//   res.clearCookie('token').send('Log out successful');
// });

module.exports = router;

/*
test credentials
{
	"username": "myusername",
	"email": "myusername@gmail.com",
	"password": "mypassword"
}
*/
