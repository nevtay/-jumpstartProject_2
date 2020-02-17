const express = require('express');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res
      .json({
        '0': 'GET /users',
        '1': 'GET /users/:username',
        '2': 'GET /users/:username',
        '3': 'POST /users/login',
        '4': 'PATCH /users/:username',
        '5': 'DELETE /users/:username',
        '6': 'POST /users/:username/tweets',
        '7': 'DELETE /users/:username/tweets',
      });
});


module.exports = app;
