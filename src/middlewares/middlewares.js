// generic error handler
const defaultErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500);
  // console.log(err);
  if (err.statusCode) {
    res.send({ error: err.message }.error);
  } else {
    res.send({ error: 'Internal server error' });
  }
};

module.exports = {
  defaultErrorHandler
};
