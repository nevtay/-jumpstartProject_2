const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
    max: 140,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  joinDate: {
    type: Date,
    Default: Date.now,
  },
  aboutUser: {
    type: String,
    max: 500,
  },
  thoughtsArray: [thoughtSchema],
});

module.exports = mongoose.model('User', UserSchema);
