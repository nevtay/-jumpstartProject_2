const jwt = require('jsonwebtoken');
const { jwtKeySecret } = require('../config/retrieveJWTSecret');
const protectRoute = (req, res, next) => {
  try {
    // console.log(req);
    if (!req.cookies.loginToken) {
      throw new Error('Access forbidden!');
    }
    req.user = jwt.verify(req.cookies.loginToken, jwtKeySecret());
    next();
  } catch (err) {
    // console.log(err);
    err.statusCode = 401;
    next(err);
  }
};

module.exports = { protectRoute };
