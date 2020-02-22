// imports and configs
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://testuser:abc123abc@cluster0-pek3w.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('connected to db!');
});
