// imports and configs
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true, // prevent deprecation warnings
  useUnifiedTopology: true,
  useFindAndModify: false, // For find one and update
  useCreateIndex: true // for creating index with unique
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('connected to db!');
});
