const express = require('express');
// eslint-disable-next-line no-unused-vars
const app = express();
const userRoute = require('./routes/users.route');
const registerRoute = require('./routes/register.route');
const middlewares = require('./middlewares/middlewares');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}

require('dotenv').config();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({
    '0': 'GET /users',
    '1': 'GET /users/:username',
    '3': 'POST /users/login',
    '4': 'PATCH /users/:username',
    '5': 'PATCH /users/',
    '6': 'POST /users/posthough',
    '7': 'DELETE /users/:username/tweets',
    '8': 'DELETE /users',
  });
});
app.use('/users', userRoute);
app.use('/register', registerRoute);
// logout
app.post('/logout', (req, res) => {
  res.clearCookie('loginToken').send('You are now logged out!');
});

app.use(middlewares.defaultErrorHandler);

module.exports = app;
