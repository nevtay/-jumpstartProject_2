const express = require('express');
// eslint-disable-next-line no-unused-vars
const app = express();
const userRoute = require('./routes/users.route');
const registerRoute = require('./routes/register.route');
const middlewares = require('./middlewares/middlewares');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoute);
app.use('/register', registerRoute);
app.get('/', (req, res) => {
  res.status(200).json({
    '0': 'GET /users',
    '1': 'GET /users/:username',
    '2': 'GET /users/:username',
    '3': 'POST /users/login',
    '4': 'PATCH /users/:username',
    '5': 'DELETE /users/:username',
    '6': 'POST /users/:username/tweets',
    '7': 'DELETE /users/:username/tweets'
  });
});

app.use(middlewares.defaultErrorHandler);

module.exports = app;
