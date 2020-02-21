const jwt = require('jsonwebtoken');
const { jwtKeySecret } = require('../config/retrieveJWTSecret');
const protectRoute = (req, res, next) => {
  try {
    // console.log(req);
    if (!req.headers.cookie) {
      throw new Error('Please login to continue.');
    }
    req.user = jwt.verify(req.headers.logintoken, jwtKeySecret());
    next();
  } catch (err) {
    // console.log(err);
    err.statusCode = 401;
    next(err);
  }
};

module.exports = { protectRoute };
