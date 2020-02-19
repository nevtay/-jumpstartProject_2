// imports and configs
const mongoose = require('mongoose');
require('dotenv').config();

const mongoOptions = {
  useNewUrlParser: true, // prevent deprecation warnings
  useUnifiedTopology: true,
  useFindAndModify: false, // For find one and update
  useCreateIndex: true, // for creating index with unique
};

mongoose.connect(
    process.env.DB_CONNECT,
    mongoOptions,
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', () => {
  console.log('connected to db!');
});
