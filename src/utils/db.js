// imports and configs
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// WHITELIST >>> CURRENT <<< IP ADDRESS
mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: false,
      useUnifiedTopology: false,
    },
    () => console.log('connected to db!'),
);
