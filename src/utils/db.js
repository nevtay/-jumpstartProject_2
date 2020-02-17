// imports and configs
const mongoose = require('mongoose');
require('dotenv').config();

// WHITELIST >>> CURRENT <<< IP ADDRESS
mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useCreateIndex: true, // for creating index with unique
    },
    () => console.log('connected to db!'),
);
